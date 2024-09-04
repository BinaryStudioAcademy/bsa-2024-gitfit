import { PAGE_INDEX_OFFSET } from "~/libs/constants/constants.js";
import { ExceptionMessage } from "~/libs/enums/enums.js";
import { type Encryption } from "~/libs/modules/encryption/encryption.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import {
	type PaginationQueryParameters,
	type Service,
} from "~/libs/types/types.js";

import { UserError } from "./libs/exceptions/exceptions.js";
import {
	type UserAuthResponseDto,
	type UserGetAllResponseDto,
	type UserGetPermissionItemResponseDto,
	type UserPatchRequestDto,
	type UserPatchResponseDto,
	type UserSignUpRequestDto,
} from "./libs/types/types.js";
import { UserEntity } from "./user.entity.js";
import { type UserRepository } from "./user.repository.js";

class UserService implements Service {
	private encryption: Encryption;
	private userRepository: UserRepository;

	public constructor(userRepository: UserRepository, encryption: Encryption) {
		this.userRepository = userRepository;
		this.encryption = encryption;
	}

	public async create(
		payload: UserSignUpRequestDto,
	): Promise<UserAuthResponseDto> {
		const { email, name, password } = payload;
		const existingUser = await this.userRepository.findByEmail(email);

		if (existingUser) {
			throw new UserError({
				message: ExceptionMessage.EMAIL_USED,
				status: HTTPCode.CONFLICT,
			});
		}

		const { encryptedData: passwordHash, salt: passwordSalt } =
			await this.encryption.encrypt(password);

		const item = await this.userRepository.create(
			UserEntity.initializeNew({
				email,
				name,
				passwordHash,
				passwordSalt,
			}),
		);

		return item.toObject();
	}

	public delete(): ReturnType<Service["delete"]> {
		return Promise.resolve(true);
	}

	public async find(id: number): Promise<UserAuthResponseDto> {
		const item = await this.userRepository.find(id);

		if (!item) {
			throw new UserError({
				message: ExceptionMessage.USER_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return item.toObject();
	}

	public async findAll(
		parameters: PaginationQueryParameters,
	): Promise<UserGetAllResponseDto> {
		const users = await this.userRepository.findAll({
			page: parameters.page - PAGE_INDEX_OFFSET,
			pageSize: parameters.pageSize,
		});

		return {
			items: users.items.map((item) => item.toObject()),
			totalItems: users.totalItems,
		};
	}

	public async getByEmail(email: string): Promise<UserEntity> {
		const item = await this.userRepository.findByEmail(email);

		if (!item) {
			throw new UserError({
				message: ExceptionMessage.USER_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return item;
	}

	public async getPermissionsByUserId(
		userId: number,
	): Promise<UserGetPermissionItemResponseDto[]> {
		return await this.userRepository.getPermissionsByUserId(userId);
	}

	public async patch(
		userId: number,
		userInfo: UserPatchRequestDto,
	): Promise<UserPatchResponseDto> {
		const user = await this.userRepository.find(userId);

		if (!user) {
			throw new UserError({
				message: ExceptionMessage.USER_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const updatedUser = await this.userRepository.patch(userId, userInfo);

		return updatedUser.toObject();
	}

	public update(): ReturnType<Service["update"]> {
		return Promise.resolve();
	}
}

export { UserService };
