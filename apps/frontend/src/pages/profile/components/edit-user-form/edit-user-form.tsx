import { Button, Input } from "~/libs/components/components.js";
import { areObjectsEqual } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppForm,
	useCallback,
	useEffect,
	useState,
} from "~/libs/hooks/hooks.js";
import { actions as authActions } from "~/modules/auth/auth.js";
import {
	type UserInfoResponseDto,
	actions as usersActions,
} from "~/modules/users/users.js";

import styles from "./styles.module.css";

type Properties = {
	defaultValues: UserInfoResponseDto;
	userId: number;
};

const EditUserForm = ({ defaultValues, userId }: Properties): JSX.Element => {
	const dispatch = useAppDispatch();

	const { control, errors, handleSubmit, watch } =
		useAppForm<UserInfoResponseDto>({
			defaultValues,
		});

	const [isChanged, setIsChanged] = useState<boolean>(false);

	const watchedValues = watch();

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit(async (formData: UserInfoResponseDto) => {
				await dispatch(
					usersActions.updateProfile({
						id: userId,
						userPayload: formData,
					}),
				);

				void dispatch(authActions.getAuthenticatedUser());
			})(event_);
		},
		[dispatch, handleSubmit, userId],
	);

	useEffect(() => {
		const isEqual = areObjectsEqual(watchedValues, defaultValues);
		setIsChanged(!isEqual);
	}, [watchedValues, defaultValues]);

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
					disabled
					errors={errors}
					label="Email"
					name="email"
				/>
			</div>

			<Button
				className={styles["submit-button"] ?? ""}
				disabled={!isChanged}
				label="Update Profile"
				type="submit"
			/>
		</form>
	);
};

export { EditUserForm };
