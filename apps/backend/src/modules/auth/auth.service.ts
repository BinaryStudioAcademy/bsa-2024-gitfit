import {
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "~/modules/users/libs/types/types.js";
import { type UserService } from "~/modules/users/user.service.js";

import { type TokenService } from "./token/token.service.js";

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
		// the mock of the method. May be changed according to required sign-up flow
		const user = await this.userService.create(userRequestDto);
		// next line should be used to create token also in the sign-in method
		const token = await this.tokenService.createToken(user.id);

		return { token, user };
	}
}

export { AuthService };
