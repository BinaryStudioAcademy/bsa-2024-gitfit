import {
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "~/modules/users/libs/types/types.js";
import { type UserService } from "~/modules/users/user.service.js";

import { type TokenService } from "../../libs/modules/token/token.service.js";

class AuthService {
	private tokenService: TokenService;
	private userService: UserService;

	public constructor(userService: UserService, tokenService: TokenService) {
		this.userService = userService;
		this.tokenService = tokenService;
	}

	public async signUp(
		userRequestDto: UserSignUpRequestDto,
	): Promise<UserSignUpResponseDto> {
		// TODO: should be changed after sign-up implementation
		const user = await this.userService.create(userRequestDto);
		// TODO: add token creation to the sign-in method
		const token = await this.tokenService.createToken({ userId: user.id });

		return { token, user };
	}
}

export { AuthService };
