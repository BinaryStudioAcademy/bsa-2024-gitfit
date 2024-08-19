import { NavLink } from "react-router-dom";

type Properties = {
	className?: string | undefined;
	href?: string | undefined;
	label: string;
	type?: "button" | "submit";
};

const Button = ({
	className = "",
	href,
	label,
	type = "button",
}: Properties): JSX.Element => {
	if (href) {
		return (
			<NavLink className={className} to={href}>
				{label}
			</NavLink>
		);
	}

	return (
		<button className={className} type={type}>
			{label}
		</button>
	);
};

export { Button };
