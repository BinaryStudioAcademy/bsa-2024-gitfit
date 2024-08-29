import { Button, Input } from "~/libs/components/components.js";
import { areObjectsEqual } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppForm,
	useCallback,
	useEffect,
	useState,
} from "~/libs/hooks/hooks.js";
import {
	type UserInfoResponseDto,
	actions as usersActions,
} from "~/modules/users/users.js";

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
			void handleSubmit((formData: UserInfoResponseDto) => {
				void dispatch(
					usersActions.updateUser({
						id: userId,
						userPayload: formData,
					}),
				);
			})(event_);
		},
		[dispatch, handleSubmit, userId],
	);

	useEffect(() => {
		const isEqual = areObjectsEqual(watchedValues, defaultValues);
		setIsChanged(!isEqual);
	}, [watchedValues, defaultValues]);

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
				autoComplete="email"
				control={control}
				disabled
				errors={errors}
				label="Email"
				name="email"
			/>

			<Button disabled={!isChanged} label="Update Profile" type="submit" />
		</form>
	);
};

export { EditUserForm };
