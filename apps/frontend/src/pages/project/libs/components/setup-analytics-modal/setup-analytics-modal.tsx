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
	useEffect,
	useMemo,
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

	const { dataStatus } = useAppSelector(({ projectApiKeys }) => projectApiKeys);
	const { authenticatedUser } = useAppSelector(({ auth }) => auth);

	const hasProjectApiKey = project.apiKey !== null;
	const hasAuthenticatedUser = authenticatedUser !== null;

	const isGenerateButtonDisabled = dataStatus === DataStatus.PENDING;
	const isCopyButtonDisabled =
		!hasProjectApiKey || dataStatus === DataStatus.PENDING;

	const script = useMemo<string>(
		() =>
			hasProjectApiKey && hasAuthenticatedUser
				? `npx @git-fit/analytics@latest track ${project.apiKey as string} ${String(authenticatedUser.id)} <project-path>`
				: "",
		[hasProjectApiKey, hasAuthenticatedUser, project, authenticatedUser],
	);

	const { control, errors, handleSubmit, handleValueSet } = useAppForm({
		defaultValues: {
			apiKey: project.apiKey ?? "",
			projectId: project.id,
			script,
		},
	});

	const handleGenerateSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit(({ projectId }) => {
				void dispatch(projectApiKeyActions.create({ projectId }));
			})(event_);
		},
		[handleSubmit, dispatch],
	);

	const handleCopyToClipboard = useCallback(
		(input: string) => {
			void dispatch(projectApiKeyActions.copyToClipboard(input));
		},
		[dispatch],
	);

	const handleCopyAPIKeyClick = useCallback(() => {
		handleCopyToClipboard(project.apiKey as string);
	}, [handleCopyToClipboard, project]);

	const handleCopyScriptClick = useCallback(() => {
		handleCopyToClipboard(script);
	}, [handleCopyToClipboard, script]);

	useEffect(() => {
		handleValueSet("apiKey", project.apiKey ?? "");
	}, [handleValueSet, project.apiKey]);

	useEffect(() => {
		handleValueSet("script", script);
	}, [handleValueSet, script]);

	return (
		<Modal isOpened={isOpened} onClose={onClose} title="Setup Analytics">
			<div className={styles["content"]}>
				<div>
					<span className={styles["subtitle"]}>Overview</span>
					<p className={styles["text"]}>
						This script operates continuously in the background, collecting
						statistics and updating analytics data every 3 hours.
					</p>
				</div>

				<form
					className={styles["api-key-container"]}
					onSubmit={handleGenerateSubmit}
				>
					<Input
						control={control}
						errors={errors}
						isReadOnly
						label="API key"
						name="apiKey"
						placeholder="No API key"
						rightIcon={
							<IconButton
								iconName="clipboard"
								isDisabled={isCopyButtonDisabled}
								label="Copy API key"
								onClick={handleCopyAPIKeyClick}
							/>
						}
					/>
					<div className={styles["button-wrapper"]}>
						<Button
							isDisabled={isGenerateButtonDisabled}
							label={hasProjectApiKey ? "Regenerate" : "Generate"}
							type="submit"
						/>
					</div>
				</form>

				<div>
					<span className={styles["subtitle"]}>Prerequisites</span>
					<ul className={styles["text"]}>
						<li>
							<span className={styles["list-item-title"]}>Git</span>: Ensure Git
							is installed for repository management.
						</li>
						<li>
							<span className={styles["list-item-title"]}>Node.js 20</span>: The
							script requires Node.js 20 to be installed on your machine.
						</li>
					</ul>
				</div>

				<div>
					<span className={styles["subtitle"]}>Installation Steps</span>
					<ol className={styles["text"]}>
						<li className={styles["list-item"]}>
							<span className={styles["list-item-title"]}>
								Clone your project repository.
							</span>
							<p className={styles["list-item-text"]}>
								Use Git to clone your project repository to your local machine.
							</p>
						</li>

						<li className={styles["list-item"]}>
							<span className={styles["list-item-title"]}>
								Prepare the script.
							</span>
							<p className={styles["list-item-text"]}>
								Copy the command below and modify with your local
								repository&apos;s path:
							</p>
							<Input
								control={control}
								errors={errors}
								isLabelHidden
								isReadOnly
								label="Script"
								name="script"
								placeholder="Need to generate API key"
								rightIcon={
									<IconButton
										iconName="clipboard"
										isDisabled={isCopyButtonDisabled}
										label="Copy script"
										onClick={handleCopyScriptClick}
									/>
								}
							/>
						</li>

						<li className={styles["list-item"]}>
							<span className={styles["list-item-title"]}>
								Execute the script.
							</span>
							<p className={styles["list-item-text"]}>
								Open your terminal or console, paste and run the modified
								script.
							</p>
						</li>
					</ol>
				</div>
			</div>
		</Modal>
	);
};

export { SetupAnalyticsModal };
