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
	defaultValues: UserAuthResponseDto;
	userId: number;
};

const EditUserForm = ({ defaultValues, userId }: Properties): JSX.Element => {
	const dispatch = useAppDispatch();

	const { control, errors, handleSubmit, isDirty } =
		useAppForm<UserAuthResponseDto>({
			defaultValues,
			validationSchema: userPatchValidationSchema,
		});

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit((formData: UserPatchRequestDto) => {
				void dispatch(
					usersActions.updateProfile({
						id: userId,
						userPayload: formData,
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
