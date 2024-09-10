import { type UserSignInRequestDto } from "~/modules/users/users.js";

const DEFAULT_SIGN_IN_PAYLOAD: UserSignInRequestDto = {
	email: "",
	password: "",
};

export { DEFAULT_SIGN_IN_PAYLOAD };
