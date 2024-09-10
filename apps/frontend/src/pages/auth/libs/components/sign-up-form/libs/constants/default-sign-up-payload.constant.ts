import { type UserSignUpRequestDto } from "~/modules/users/users.js";

const DEFAULT_SIGN_UP_PAYLOAD: UserSignUpRequestDto = {
	email: "",
	name: "",
	password: "",
};

export { DEFAULT_SIGN_UP_PAYLOAD };
