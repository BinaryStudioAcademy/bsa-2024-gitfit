import { ApplicationError } from "~/libs/exceptions/exceptions.js";
import { type Encryption } from "~/libs/modules/encryption/encryption.module.js";
import { type Service } from "~/libs/types/types.js";
import { UserEntity } from "~/modules/users/user.entity.js";
import { type UserRepository } from "~/modules/users/user.repository.js";

import {
	type UserGetAllResponseDto,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "./libs/types/types.js";

class UserService implements Service {
	private encryption: Encryption;
	private userRepository: UserRepository;

	public constructor(userRepository: UserRepository, encryption: Encryption) {
		this.userRepository = userRepository;
		this.encryption = encryption;
	}

	public async create(
		payload: UserSignUpRequestDto,
	): Promise<UserSignUpResponseDto> {
		const existingUser = await this.userRepository.findByEmail(payload.email);

		if (existingUser) {
			throw new ApplicationError({
				message: "Email address is already in use.",
			});
		}

		const passwordHash = await this.encryption.hashPassword(payload.password);

		const item = await this.userRepository.create(
			UserEntity.initializeNew({
				email: payload.email,
				name: payload.name,
				passwordHash,
				passwordSalt: "", // bcrypt handles salt internally
			}),
		);

		return item.toSignUpResponseDto();
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
