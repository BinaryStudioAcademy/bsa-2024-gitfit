import { Button, Input } from "~/libs/components/components.js";
import { useAppForm, useCallback } from "~/libs/hooks/hooks.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { DEFAULT_USER_PAYLOAD } from "./libs/constants/constants.js";

type User = Omit<UserAuthResponseDto, "id">;

const EditUserForm = (): JSX.Element => {
	const { control, errors, handleSubmit } = useAppForm<User>({
		defaultValues: DEFAULT_USER_PAYLOAD,
	});

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit((formData: User) => {
				return formData;
			})(event_);
		},
		[handleSubmit],
	);

	return (
		<form onSubmit={handleFormSubmit}>
			<Input
				autoComplete="username"
				control={control}
				errors={errors}
				label="Name"
				name="name"
			/>

			<Input
				autoComplete="username"
				control={control}
				disabled
				errors={errors}
				label="Email"
				name="email"
			/>

			<Button label="Update Profile" type="submit" />
		</form>
	);
};

export { EditUserForm };
