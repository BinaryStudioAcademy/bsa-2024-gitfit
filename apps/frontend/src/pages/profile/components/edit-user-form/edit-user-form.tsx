import { Button, Input } from "~/libs/components/components.js";
import { compareObjects } from "~/libs/helpers/helpers.js";
import {
	useAppForm,
	useCallback,
	useEffect,
	useState,
} from "~/libs/hooks/hooks.js";
import { type UserData } from "~/modules/users/users.js";

type Properties = {
	defaultValues: UserData;
};

const EditUserForm = ({ defaultValues }: Properties): JSX.Element => {
	const { control, errors, handleSubmit, watch } = useAppForm<UserData>({
		defaultValues,
	});

	const [isChanged, setIsChanged] = useState<boolean>(false);

	const watchedValues = watch();

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit((formData: UserData) => {
				return formData;
			})(event_);
		},
		[handleSubmit],
	);

	useEffect(() => {
		const isEqual = compareObjects(watchedValues, defaultValues);
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
				autoComplete="username"
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
