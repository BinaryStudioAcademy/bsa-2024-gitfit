import { HTTPCode } from "~/libs/modules/http/http.js";
import {
	type UserSignInRequestDto,
	type UserSignInResponseDto,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "~/modules/users/libs/types/types.js";
import { type UserService } from "~/modules/users/user.service.js";

import { AuthErrorMessage } from "./libs/enums/enums.js";
import { AuthError } from "./libs/exceptions/exceptions.js";

class AuthService {
	private userService: UserService;

	public constructor(userService: UserService) {
		this.userService = userService;
	}

	public async signIn(
		userRequestDto: UserSignInRequestDto,
	): Promise<UserSignInResponseDto> {
		const user = await this.userService.getByEmail(userRequestDto.email);

		const { passwordHash } = user.toNewObject();

		// TODO: compare with encryption service
		const isPasswordCorrect = userRequestDto.password === passwordHash;

		if (!isPasswordCorrect) {
			throw new AuthError({
				message: AuthErrorMessage.WRONG_CREDENTIAL,
				status: HTTPCode.UNAUTHORIZED,
			});
		}

		return user.toObject();
	}

	public signUp(
		userRequestDto: UserSignUpRequestDto,
	): Promise<UserSignUpResponseDto> {
		return this.userService.create(userRequestDto);
	}
}

export { AuthService };
