import { useNavigate } from "react-router-dom";

import {
	Button,
	Eye,
	Input,
	Link,
	StrikedEye,
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
	onSubmit: (payload: UserSignUpRequestDto) => Promise<void>;
};

const SignUpForm = ({ onSubmit }: Properties): JSX.Element => {
	const { control, errors, handleSubmit } = useAppForm<UserSignUpRequestDto>({
		defaultValues: DEFAULT_SIGN_UP_PAYLOAD,
		validationSchema: userSignUpValidationSchema,
	});

	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
	const navigate = useNavigate();

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit(async (formData: UserSignUpRequestDto) => {
				await onSubmit(formData);
				navigate(AppRoute.ROOT);
			})(event_);
		},
		[handleSubmit, onSubmit, navigate],
	);

	const handleTogglePasswordVisibility = useCallback(() => {
		setIsPasswordVisible((previousState) => !previousState);
	}, []);

	return (
		<section className={styles["auth-container"]}>
			<div className={styles["left-side"]}>
				<img alt="logo" className={styles["logo-wrapper"]} src="" />
			</div>
			<div className={styles["right-side"]}>
				<h3 className={styles["form-title"]}>Create an account</h3>
				<form className={styles["form-wrapper"]} onSubmit={handleFormSubmit}>
					<p className={styles["form-text"]}>
						Have an account? <Link to={AppRoute.SIGN_IN}>Log in</Link>
					</p>
					<Input
						control={control}
						errors={errors}
						label="Name"
						name="name"
						type="text"
					/>
					<Input
						control={control}
						errors={errors}
						label="Email"
						name="email"
						type="email"
					/>
					<div className={styles["password-container"]}>
						<Input
							control={control}
							errors={errors}
							label="Password"
							name="password"
							rightIcon={
								isPasswordVisible ? (
									<Eye
										className={styles["toggle-password-button"]}
										onClick={handleTogglePasswordVisibility}
									/>
								) : (
									<StrikedEye
										className={styles["toggle-password-button"]}
										onClick={handleTogglePasswordVisibility}
									/>
								)
							}
							type={isPasswordVisible ? "text" : "password"}
						/>
					</div>
					<Button label="Sign up" type="submit" />
				</form>
			</div>
		</section>
	);
};

export { SignUpForm };
