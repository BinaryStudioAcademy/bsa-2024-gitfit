type Properties = {
	label: string;
	type?: "button" | "submit";
};

const Button = ({ label, type = "button" }: Properties): JSX.Element => (
	<button type={type}>{label}</button>
);

export { Button };
