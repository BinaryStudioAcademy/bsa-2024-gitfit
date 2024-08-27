import { type UserAuthResponseDto } from "@git-fit/shared";

type UserData = Omit<UserAuthResponseDto, "id">;

export { type UserData };
