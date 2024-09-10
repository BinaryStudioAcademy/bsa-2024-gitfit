import { Button, Modal } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useCallback,
} from "~/libs/hooks/hooks.js";
import { actions as projectApiKeyActions } from "~/modules/project-api-keys/project-api-keys.js";
import { type ProjectGetAllItemResponseDto } from "~/modules/projects/projects.js";

import { Output } from "../components.js";
import styles from "./styles.module.css";

type Properties = {
	isOpened: boolean;
	onClose: () => void;
	project: ProjectGetAllItemResponseDto;
};

const SetupAnalyticsModal = ({
	isOpened,
	onClose,
	project,
}: Properties): JSX.Element => {
	const dispatch = useAppDispatch();
	const { handleSubmit } = useAppForm({
		defaultValues: {
			projectId: project.id,
		},
	});
	const { dataStatus } = useAppSelector(({ projectApiKeys }) => projectApiKeys);

	const hasProjectApiKey = project.apiKey !== null;
	const isGenerateButtonDisabled =
		hasProjectApiKey || dataStatus === DataStatus.PENDING;

	const handleGenerateSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit((formData: { projectId: number }) => {
				void dispatch(projectApiKeyActions.create(formData));
			})(event_);
		},
		[handleSubmit, dispatch],
	);

	return (
		<Modal isOpened={isOpened} onClose={onClose} title="Setup Analytics">
			<div className={styles["content"]}>
				<form
					className={styles["api-key-container"]}
					onSubmit={handleGenerateSubmit}
				>
					<div className={styles["api-key-output"]}>
						<Output
							label="API Key"
							placeholder="No API key"
							value={project.apiKey}
						/>
					</div>
					<div className={styles["button-wrapper"]}>
						<Button
							isDisabled={isGenerateButtonDisabled}
							label="Generate"
							type="submit"
						/>
					</div>
				</form>
			</div>
		</Modal>
	);
};

export { SetupAnalyticsModal };
