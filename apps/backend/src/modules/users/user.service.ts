import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Service } from "~/libs/types/types.js";
import { UserEntity } from "~/modules/users/user.entity.js";
import { type UserRepository } from "~/modules/users/user.repository.js";

import { UserErrorMessage } from "./libs/enums/enums.js";
import { UserError } from "./libs/exceptions/exceptions.js";
import {
	type UserAuthResponseDto,
	type UserGetAllResponseDto,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "./libs/types/types.js";

class UserService implements Service {
	private userRepository: UserRepository;

	public constructor(userRepository: UserRepository) {
		this.userRepository = userRepository;
	}

	public async create(
		payload: UserSignUpRequestDto,
	): Promise<UserSignUpResponseDto> {
		const item = await this.userRepository.create(
			UserEntity.initializeNew({
				email: payload.email,
				passwordHash: "HASH", // TODO
				passwordSalt: "SALT", // TODO
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
				message: UserErrorMessage.USER_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return item.toObject();
	}

	public async findAll(): Promise<UserGetAllResponseDto> {
		const items = await this.userRepository.findAll();

		return {
			items: items.map((item) => item.toObject()),
		};
	}

	public async getByEmail(email: string): Promise<UserEntity> {
		const item = await this.userRepository.findByEmail(email);

		if (!item) {
			throw new UserError({
				message: UserErrorMessage.USER_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return item;
	}

	public update(): ReturnType<Service["update"]> {
		return Promise.resolve(null);
	}
}

export { UserService };
