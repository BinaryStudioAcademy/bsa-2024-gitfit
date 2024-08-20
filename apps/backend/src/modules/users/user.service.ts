import { ApplicationError } from "~/libs/exceptions/exceptions.js";
import { type EncryptionService } from "~/libs/modules/encryption/encryption.js";
import { type Service } from "~/libs/types/types.js";
import { UserEntity } from "~/modules/users/user.entity.js";
import { type UserRepository } from "~/modules/users/user.repository.js";

import { UserServiceMessage } from "./libs/enums/user-service-message.enum.js";
import {
	type UserGetAllResponseDto,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "./libs/types/types.js";

class UserService implements Service {
	private encryptionService: EncryptionService;
	private userRepository: UserRepository;

	public constructor(
		userRepository: UserRepository,
		encryptionService: EncryptionService,
	) {
		this.userRepository = userRepository;
		this.encryptionService = encryptionService;
	}

	public async create(
		payload: UserSignUpRequestDto,
	): Promise<UserSignUpResponseDto> {
		const { email, name, password } = payload;
		const existingUser = await this.userRepository.find({ email });

		if (existingUser) {
			throw new ApplicationError({
				message: UserServiceMessage.EMAIL_USED,
			});
		}

		const passwordSalt = await this.encryptionService.generateSalt();
		const passwordHash = await this.encryptionService.hashPassword(
			password,
			passwordSalt,
		);

		const item = await this.userRepository.create(
			UserEntity.initializeNew({
				email,
				name,
				passwordHash,
				passwordSalt,
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
