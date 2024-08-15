import { Button, Input } from "~/libs/components/components.js";
import { useAppForm, useCallback } from "~/libs/hooks/hooks.js";
import {
	type UserSignUpRequestDto,
	userSignUpValidationSchema,
} from "~/modules/users/users.js";

import { DEFAULT_SIGN_UP_PAYLOAD } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

type Properties = {
	onSubmit: (payload: UserSignUpRequestDto) => void;
};

const SignUpForm = ({ onSubmit }: Properties): JSX.Element => {
	const { control, errors, handleSubmit } = useAppForm<UserSignUpRequestDto>({
		defaultValues: DEFAULT_SIGN_UP_PAYLOAD,
		validationSchema: userSignUpValidationSchema,
	});

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit(onSubmit)(event_);
		},
		[handleSubmit, onSubmit],
	);

	return (
		<>
			<h1>Sign Up</h1>
			<form className={styles["form"]} onSubmit={handleFormSubmit}>
				<Input
					control={control}
					errors={errors}
					label="Email"
					name="email"
					placeholder="email@example.com"
					type="text"
				/>
				<Input
					control={control}
					errors={errors}
					label="Password"
					name="password"
					placeholder="••••••••"
					type="text"
				/>
				<Button label="Sign up" type="submit" />
			</form>
		</>
	);
};

export { SignUpForm };
