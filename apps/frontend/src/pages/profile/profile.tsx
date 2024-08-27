import { Header, Sidebar } from "~/libs/components/components.js";
import { SIDEBAR_ITEMS } from "~/libs/constants/constants.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";

const Profile = (): JSX.Element => {
	const authenticatedUser = useAppSelector(
		({ auth }) => auth.authenticatedUser,
	);

	return (
		<>
			<Header />

			<main style={{ display: "flex", flex: "1" }}>
				<Sidebar items={SIDEBAR_ITEMS} />

				<div style={{ display: "flex", flexDirection: "column" }}>
					Profile: {authenticatedUser?.name}
				</div>
			</main>
		</>
	);
};

export { Profile };
