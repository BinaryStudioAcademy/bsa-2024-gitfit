import { UserError } from "~/libs/exceptions/exceptions.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Token } from "~/libs/modules/token/token.js";
import {
	type UserAuthResponseDto,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "~/modules/users/libs/types/types.js";
import { type UserService } from "~/modules/users/user.service.js";

import { ExceptionMessage } from "../users/libs/enums/enums.js";

class AuthService {
	private tokenService: Token;
	private userService: UserService;

	public constructor(userService: UserService, tokenService: Token) {
		this.userService = userService;
		this.tokenService = tokenService;
	}

	public async getAuthenticatedUser(
		userId: number,
	): Promise<UserAuthResponseDto> {
		const user = await this.userService.find(userId);

		if (!user) {
			throw new UserError({
				message: ExceptionMessage.USER_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return user.toObject();
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
