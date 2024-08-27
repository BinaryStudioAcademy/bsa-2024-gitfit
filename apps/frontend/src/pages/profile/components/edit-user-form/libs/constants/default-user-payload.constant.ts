import { type UserAuthResponseDto } from "~/modules/users/users.js";

const DEFAULT_USER_PAYLOAD: Omit<UserAuthResponseDto, "id"> = {
	email: "",
	name: "",
};

export { DEFAULT_USER_PAYLOAD };
