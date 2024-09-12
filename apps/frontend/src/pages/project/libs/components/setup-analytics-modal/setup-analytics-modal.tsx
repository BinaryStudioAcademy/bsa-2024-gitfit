import {
	Button,
	IconButton,
	Input,
	Modal,
} from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useCallback,
} from "~/libs/hooks/hooks.js";
import { actions as projectApiKeyActions } from "~/modules/project-api-keys/project-api-keys.js";
import { type ProjectGetByIdResponseDto } from "~/modules/projects/projects.js";

import styles from "./styles.module.css";

type Properties = {
	isOpened: boolean;
	onClose: () => void;
	project: ProjectGetByIdResponseDto;
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
	const isCopyButtonDisabled =
		!hasProjectApiKey || dataStatus === DataStatus.PENDING;

	const handleGenerateSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit(({ projectId }) => {
				void dispatch(projectApiKeyActions.create({ projectId }));
			})(event_);
		},
		[handleSubmit, dispatch],
	);

	const handleCopyToClipboardClick = useCallback(() => {
		void dispatch(
			projectApiKeyActions.copyToClipboard(project.apiKey as string),
		);
	}, [dispatch, project.apiKey]);

	return (
		<Modal isOpened={isOpened} onClose={onClose} title="Setup Analytics">
			<div className={styles["content"]}>
				<form
					className={styles["api-key-container"]}
					onSubmit={handleGenerateSubmit}
				>
					<Input
						control={control}
						errors={errors}
						isDisabled={!hasProjectApiKey}
						isReadOnly={hasProjectApiKey}
						label="API key"
						name="apiKey"
						placeholder="No API key"
						rightIcon={
							<IconButton
								iconName="clipboard"
								isDisabled={isCopyButtonDisabled}
								label="Copy API key"
								onClick={handleCopyToClipboardClick}
							/>
						}
					/>
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
