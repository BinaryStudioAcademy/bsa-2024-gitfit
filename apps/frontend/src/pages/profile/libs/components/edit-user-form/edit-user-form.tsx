import { Button, Input } from "~/libs/components/components.js";
import { useAppDispatch, useAppForm, useCallback } from "~/libs/hooks/hooks.js";
import {
	type UserAuthResponseDto,
	type UserPatchRequestDto,
	userPatchValidationSchema,
	actions as usersActions,
} from "~/modules/users/users.js";

import styles from "./styles.module.css";

type Properties = {
	user: UserAuthResponseDto;
};

const EditUserForm = ({ user }: Properties): JSX.Element => {
	const { email, id: userId, name } = user;
	const dispatch = useAppDispatch();

	const { control, errors, handleSubmit, isDirty } =
		useAppForm<UserAuthResponseDto>({
			defaultValues: {
				email,
				name,
			},
			validationSchema: userPatchValidationSchema,
		});

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit((formData: UserPatchRequestDto) => {
				void dispatch(
					usersActions.updateProfile({
						id: userId,
						payload: formData,
					}),
				);
			})(event_);
		},
		[dispatch, handleSubmit, userId],
	);

	return (
		<form className={styles["form-wrapper"]} onSubmit={handleFormSubmit}>
			<div className={styles["inputs-wrapper"]}>
				<Input
					autoComplete="username"
					control={control}
					errors={errors}
					label="Name"
					name="name"
				/>

				<Input
					autoComplete="email"
					control={control}
					errors={errors}
					isDisabled
					label="Email"
					name="email"
				/>
			</div>

			<div className={styles["button-wrapper"]}>
				<Button isDisabled={!isDirty} label="Update Profile" type="submit" />
			</div>
		</form>
	);
};

export { EditUserForm };
