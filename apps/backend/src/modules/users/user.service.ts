import { UserError } from "~/libs/exceptions/exceptions.js";
import { type BaseEncryption } from "~/libs/modules/encryption/encryption.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Service } from "~/libs/types/types.js";
import {
	type UserGetAllResponseDto,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "~/modules/users/libs/types/types.js";
import { UserEntity } from "~/modules/users/user.entity.js";
import { type UserRepository } from "~/modules/users/user.repository.js";

import { ExceptionMessage } from "./libs/enums/enums.js";

class UserService implements Service {
	private encryption: BaseEncryption;
	private userRepository: UserRepository;

	public constructor(
		userRepository: UserRepository,
		encryption: BaseEncryption,
	) {
		this.userRepository = userRepository;
		this.encryption = encryption;
	}

	public async create(
		payload: UserSignUpRequestDto,
	): Promise<UserSignUpResponseDto> {
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

	public find(): ReturnType<Service["find"]> {
		return Promise.resolve(null);
	}

	public async findAll(): Promise<UserGetAllResponseDto> {
		const items = await this.userRepository.findAll();

		return {
			items: items.map((item) => item.toObject()),
		};
	}

	public update(): ReturnType<Service["update"]> {
		return Promise.resolve(null);
	}
}

export { UserService };
