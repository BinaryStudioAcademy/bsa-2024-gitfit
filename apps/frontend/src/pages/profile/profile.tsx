import { Loader, PageLayout } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/data-status.enum.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";

import { EditUserForm } from "./components/components.js";

const Profile = (): JSX.Element => {
	const { authenticatedUser, dataStatus } = useAppSelector(({ auth }) => auth);

	const isLoading =
		dataStatus === DataStatus.PENDING || dataStatus === DataStatus.IDLE;

	return (
		<PageLayout>
			<h1>Profile</h1>

			{isLoading ? (
				<div>
					<Loader />
				</div>
			) : (
				authenticatedUser && (
					<EditUserForm
						defaultValues={{
							email: authenticatedUser.email,
							name: authenticatedUser.name,
						}}
						userId={authenticatedUser.id}
					/>
				)
			)}
		</PageLayout>
	);
};

export { Profile };
