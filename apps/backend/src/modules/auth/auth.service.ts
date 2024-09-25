import { ExceptionMessage } from "~/libs/enums/enums.js";
import { type Encryption } from "~/libs/modules/encryption/encryption.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Token } from "~/libs/modules/token/token.js";
import {
	type UserAuthResponseDto,
	type UserSignInRequestDto,
	type UserSignInResponseDto,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "~/modules/users/libs/types/types.js";
import { type UserService } from "~/modules/users/user.service.js";

import { AuthError } from "./libs/exceptions/exceptions.js";

class AuthService {
	private encryptionService: Encryption;
	private tokenService: Token;
	private userService: UserService;

	public constructor(
		userService: UserService,
		tokenService: Token,
		encryptionService: Encryption,
	) {
		this.userService = userService;
		this.tokenService = tokenService;
		this.encryptionService = encryptionService;
	}

	public async getAuthenticatedUser(
		userId: number,
	): Promise<UserAuthResponseDto> {
		return await this.userService.find(userId);
	}

	public async signIn(
		userRequestDto: UserSignInRequestDto,
	): Promise<UserSignInResponseDto> {
		const userEntity = await this.userService.getByEmail(userRequestDto.email);
		const user = userEntity.toObject();

		const { passwordHash } = userEntity.toNewObject();

		const isPasswordCorrect = await this.encryptionService.compare(
			userRequestDto.password,
			passwordHash,
		);

		if (!isPasswordCorrect) {
			throw new AuthError({
				message: ExceptionMessage.INVALID_CREDENTIALS,
				status: HTTPCode.UNAUTHORIZED,
			});
		}

		const token = await this.tokenService.createToken({
			userId: user.id,
		});

		return {
			token,
			user,
		};
	}

	public async signUp(
		userRequestDto: UserSignUpRequestDto,
	): Promise<UserSignUpResponseDto> {
		const user = await this.userService.create(userRequestDto);
		const token = await this.tokenService.createToken({ userId: user.id });

		return { token, user };
	}
}

export { AuthService };
