import { Button, Input } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useCallback,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { actions as authActions } from "~/modules/auth/auth.js";
import {
	type UserAuthResponseDto,
	type UserPatchResponseDto,
	actions as usersActions,
} from "~/modules/users/users.js";

import styles from "./styles.module.css";

type Properties = {
	defaultValues: UserAuthResponseDto;
	userId: number;
};

const EditUserForm = ({ defaultValues, userId }: Properties): JSX.Element => {
	const dispatch = useAppDispatch();
	// if not to run users `loadAll`, dataStatus works properly
	const { dataStatus } = useAppSelector(({ users }) => users);

	const { control, errors, handleSubmit, isDirty } =
		useAppForm<UserAuthResponseDto>({
			defaultValues,
		});

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit((formData: UserPatchResponseDto) => {
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

	// it didn't work
	useEffect(() => {
		if (dataStatus === DataStatus.FULFILLED) {
			void dispatch(authActions.getAuthenticatedUser());
		}
	}, [dispatch, dataStatus]);

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
