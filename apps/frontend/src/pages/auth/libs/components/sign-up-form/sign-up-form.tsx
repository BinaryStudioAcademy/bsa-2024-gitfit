import {
	Button,
	IconButton,
	Input,
	Link,
} from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { useAppForm, useCallback, useState } from "~/libs/hooks/hooks.js";
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

	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit((formData: UserSignUpRequestDto) => {
				onSubmit(formData);
			})(event_);
		},
		[handleSubmit, onSubmit],
	);

	const handleTogglePasswordVisibility = useCallback(() => {
		setIsPasswordVisible((previousState) => !previousState);
	}, []);

	return (
		<form
			className={styles["form-wrapper"]}
			noValidate
			onSubmit={handleFormSubmit}
		>
			<p className={styles["form-text"]}>
				Have an account? <Link to={AppRoute.SIGN_IN}>Log in</Link>
			</p>
			<Input
				autoComplete="given-name"
				control={control}
				errors={errors}
				label="Name"
				name="name"
				type="text"
			/>
			<Input
				autoComplete="username"
				control={control}
				errors={errors}
				label="Email"
				name="email"
				type="email"
			/>
			<div className={styles["password-container"]}>
				<Input
					autoComplete="one-time-code"
					control={control}
					errors={errors}
					label="Password"
					name="password"
					rightIcon={
						<IconButton
							iconName={isPasswordVisible ? "strikedEye" : "eye"}
							label={isPasswordVisible ? "Hide password" : "Show password"}
							onClick={handleTogglePasswordVisibility}
						/>
					}
					type={isPasswordVisible ? "text" : "password"}
				/>
			</div>
			<Button label="Create Account" type="submit" />
		</form>
	);
};

export { SignUpForm };
