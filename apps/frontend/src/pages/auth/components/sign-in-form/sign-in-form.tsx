import { Button } from "~/libs/components/components.js";

type Properties = {
	onSubmit: () => void;
};

const SignInForm: React.FC<Properties> = ({ onSubmit }) => (
	<>
		<h1>Sign In</h1>
		<form onSubmit={onSubmit}>
			<Button label="Sign in" />
		</form>
	</>
);

export { SignInForm };
