type Properties = {
	label: string;
	type?: "button" | "submit";
};

const Button: React.FC<Properties> = ({
	label,
	type = "button",
}: Properties) => <button type={type}>{label}</button>;

export { Button };
