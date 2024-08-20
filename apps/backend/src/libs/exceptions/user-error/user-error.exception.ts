import { ApplicationError } from "@git-fit/shared";

class UserError extends ApplicationError {
	public constructor(message: string) {
		super({ message });
	}
}

export { UserError };
