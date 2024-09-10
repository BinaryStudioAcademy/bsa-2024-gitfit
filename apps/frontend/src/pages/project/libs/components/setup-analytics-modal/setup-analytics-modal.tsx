import { Button, Input, Modal } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useCallback,
} from "~/libs/hooks/hooks.js";
import { actions as projectApiKeyActions } from "~/modules/project-api-keys/project-api-keys.js";
import { type ProjectGetAllItemResponseDto } from "~/modules/projects/projects.js";

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
	const { control, errors, handleSubmit } = useAppForm({
		defaultValues: {
			apiKey: project.apiKey ?? "",
			projectId: project.id,
		},
	});
	const { dataStatus } = useAppSelector(({ projectApiKeys }) => projectApiKeys);

	const hasProjectApiKey = project.apiKey !== null;
	const isGenerateButtonDisabled =
		hasProjectApiKey || dataStatus === DataStatus.PENDING;

	const handleGenerateSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit(({ projectId }) => {
				void dispatch(projectApiKeyActions.create({ projectId }));
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
						<Input
							control={control}
							errors={errors}
							isDisabled
							label="API key"
							name="apiKey"
							placeholder="No API key"
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
