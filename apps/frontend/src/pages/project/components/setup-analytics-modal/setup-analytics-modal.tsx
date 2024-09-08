import { Button, Modal } from "~/libs/components/components.js";
import { useAppDispatch, useCallback } from "~/libs/hooks/hooks.js";
import { type UserAuthResponseDto } from "~/modules/auth/auth.js";
import { actions as projectApiKeyActions } from "~/modules/project-api-keys/project-api-keys.js";
import { type ProjectGetAllItemResponseDto } from "~/modules/projects/projects.js";

import { Output } from "../components.js";
import styles from "./styles.module.css";

type Properties = {
	currentUser: UserAuthResponseDto;
	isOpened: boolean;
	onClose: () => void;
	project: ProjectGetAllItemResponseDto;
};

const SetupAnalyticsModal = ({
	currentUser,
	isOpened,
	onClose,
	project,
}: Properties): JSX.Element => {
	const dispatch = useAppDispatch();

	const hasProjectApiKey = project.apiKey !== null;

	const handleGenerateSubmit = useCallback(() => {
		void dispatch(
			projectApiKeyActions.create({
				projectId: project.id,
				userId: currentUser.id,
			}),
		);
	}, [dispatch, project, currentUser]);

	return (
		<Modal isOpened={isOpened} onClose={onClose} title="Setup Analytics">
			<div className={styles["content"]}>
				<div className={styles["api-key-container"]}>
					<Output
						label="API Key"
						placeholder="No API key"
						value={project.apiKey}
					/>
					<div className={styles["button-wrapper"]}>
						<Button
							isDisabled={hasProjectApiKey}
							label="Generate"
							onClick={handleGenerateSubmit}
						/>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export { SetupAnalyticsModal };
