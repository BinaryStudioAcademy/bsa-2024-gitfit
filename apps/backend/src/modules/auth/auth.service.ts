import { ExceptionMessage } from "~/libs/enums/enums.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Token } from "~/libs/modules/token/token.js";
import {
	type UserSignInRequestDto,
	type UserSignInResponseDto,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "~/modules/users/libs/types/types.js";
import { type UserService } from "~/modules/users/user.service.js";

import { AuthError } from "./libs/exceptions/exceptions.js";

class AuthService {
	private tokenService: Token;
	private userService: UserService;

	public constructor(userService: UserService, tokenService: Token) {
		this.userService = userService;
		this.tokenService = tokenService;
	}

	public async signIn(
		userRequestDto: UserSignInRequestDto,
	): Promise<UserSignInResponseDto> {
		const user = await this.userService.getByEmail(userRequestDto.email);
		const userObject = user.toObject();

		const { passwordHash } = user.toNewObject();

		// TODO: compare with encryption service
		const isPasswordCorrect = userRequestDto.password === passwordHash;

		if (!isPasswordCorrect) {
			throw new AuthError({
				message: ExceptionMessage.INVALID_CREDENTIALS,
				status: HTTPCode.UNAUTHORIZED,
			});
		}

		const token = await this.tokenService.createToken({ userId: userObject.id });

		return {
			token,
			user: userObject,
		};
	}

	public async signUp(
		userRequestDto: UserSignUpRequestDto,
	): Promise<UserSignUpResponseDto> {
		// TODO: should be changed after sign-up implementation
		const user = await this.userService.create(userRequestDto);
		const token = await this.tokenService.createToken({ userId: user.id });

		return { token, user };
	}
}

export { AuthService };
