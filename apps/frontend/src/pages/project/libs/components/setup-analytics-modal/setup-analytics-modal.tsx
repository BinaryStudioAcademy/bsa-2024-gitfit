import {
	Button,
	Icon,
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
import { actions as scriptActions } from "~/modules/scripts/scripts.js";

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

	const { dataStatus, generateKeyDataStatus } = useAppSelector(
		({ projectApiKeys }) => projectApiKeys,
	);
	const { authenticatedUser } = useAppSelector(({ auth }) => auth);

	const hasProjectApiKey = project.apiKey !== null;
	const hasAuthenticatedUser = authenticatedUser !== null;

	const isKeyGenerated = generateKeyDataStatus === DataStatus.FULFILLED;

	const isGenerateButtonDisabled = dataStatus === DataStatus.PENDING;
	const isCopyButtonDisabled =
		!hasProjectApiKey || dataStatus === DataStatus.PENDING;

	const pm2StartupScript = "pm2 startup";

	const analyticsScriptConfiguration = useMemo<string>(() => {
		if (!hasProjectApiKey || !hasAuthenticatedUser) {
			return "";
		}

		const apiKey = project.apiKey as string;
		const userId = String(authenticatedUser.id);

		return `{
		"apiKey": "${apiKey}",
		"userId": ${userId},
		"repoPaths": [

		]
}`;
	}, [hasProjectApiKey, hasAuthenticatedUser, project, authenticatedUser]);

	const analyticsScript = useMemo<string>(() => {
		if (!hasProjectApiKey || !hasAuthenticatedUser) {
			return "";
		}

		return "npx @git-fit/analytics@latest track <config-path>";
	}, [hasProjectApiKey, hasAuthenticatedUser]);

	const { control, errors, handleSubmit, handleValueSet } = useAppForm({
		defaultValues: {
			analyticsScript,
			analyticsScriptConfiguration,
			apiKey: project.apiKey ?? "",
			pm2StartupScript,
			projectId: project.id,
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

	const handleCopyApiKeyToClipboard = useCallback(
		(input: string) => {
			void dispatch(projectApiKeyActions.copyToClipboard(input));
		},
		[dispatch],
	);

	const handleCopyScriptToClipboard = useCallback(
		(input: string) => {
			void dispatch(scriptActions.copyToClipboard(input));
		},
		[dispatch],
	);

	const handleCopyAPIKeyClick = useCallback(() => {
		handleCopyApiKeyToClipboard(project.apiKey as string);
	}, [handleCopyApiKeyToClipboard, project]);

	const handleCopyAnalyticsScriptConfigurationClick = useCallback(() => {
		handleCopyScriptToClipboard(analyticsScriptConfiguration);
	}, [handleCopyScriptToClipboard, analyticsScriptConfiguration]);

	const handleCopyAnalyticsScriptClick = useCallback(() => {
		handleCopyScriptToClipboard(analyticsScript);
	}, [handleCopyScriptToClipboard, analyticsScript]);

	const handleCopyStartupScriptClick = useCallback(() => {
		handleCopyScriptToClipboard(pm2StartupScript);
	}, [handleCopyScriptToClipboard, pm2StartupScript]);

	useEffect(() => {
		handleValueSet("apiKey", project.apiKey ?? "");
	}, [handleValueSet, project.apiKey]);

	useEffect(() => {
		handleValueSet("analyticsScript", analyticsScript);
	}, [handleValueSet, analyticsScript]);

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
						{...(isKeyGenerated
							? {
									leftIcon: (
										<div className={styles["generated-key-indicator"]}>
											<Icon height={20} name="check" width={20} />
										</div>
									),
								}
							: {})}
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
						<li>
							<span className={styles["list-item-title"]}>PM2 5.4</span>: The
							script requires PM2 5.4 to be installed on your machine.
						</li>
						<li>
							<span className={styles["list-item-title"]}>
								Unix-based system
							</span>
							: The script requires a Unix-based operating system (e.g., Linux
							or macOS) to run properly.
						</li>
					</ul>
				</div>

				<div>
					<span className={styles["subtitle"]}>Installation Steps</span>
					<ol className={styles["text"]}>
						<li className={styles["list-item"]}>
							<span className={styles["list-item-title"]}>
								Execute the configuration script.
							</span>
							<p className={styles["list-item-text"]}>
								Open your terminal or console, copy the following script, paste
								and run it.
							</p>
							<Input
								control={control}
								errors={errors}
								isLabelHidden
								isReadOnly
								label="pm2StartupScript"
								name="pm2StartupScript"
								placeholder="Need to generate API key"
								rightIcon={
									<IconButton
										iconName="clipboard"
										isDisabled={isCopyButtonDisabled}
										label="Copy script"
										onClick={handleCopyStartupScriptClick}
									/>
								}
							/>
							<span className={styles["list-item-text"]}>
								Then, modify the command output from this step with your
								system&apos;s values and execute it in terminal or console.
							</span>
						</li>
						<li className={styles["list-item"]}>
							<span className={styles["list-item-title"]}>
								Clone your project repositories.
							</span>
							<p className={styles["list-item-text"]}>
								Use Git to clone your project repositories to your local
								machine.
							</p>
						</li>

						<li className={styles["list-item"]}>
							<span className={styles["list-item-title"]}>
								Save the following configuration file to your local machine and
								add local paths to all of your repositories to it.
							</span>

							<Input
								control={control}
								errors={errors}
								isLabelHidden
								isReadOnly
								label="Analytics script configuration"
								name="analyticsScriptConfiguration"
								placeholder="Need to generate API key"
								rightIcon={
									<IconButton
										iconName="clipboard"
										isDisabled={isCopyButtonDisabled}
										label="Copy script configuration"
										onClick={handleCopyAnalyticsScriptConfigurationClick}
									/>
								}
								rowsCount={9}
							/>
						</li>

						<li className={styles["list-item"]}>
							<span className={styles["list-item-title"]}>
								Prepare the script.
							</span>
							<p className={styles["list-item-text"]}>
								Copy the command below and replace &lt;config-path&gt; with the
								path to your configuration file from the previous step.
							</p>
							<Input
								control={control}
								errors={errors}
								isLabelHidden
								isReadOnly
								label="Analytics script"
								name="analyticsScript"
								placeholder="Need to generate API key"
								rightIcon={
									<IconButton
										iconName="clipboard"
										isDisabled={isCopyButtonDisabled}
										label="Copy script"
										onClick={handleCopyAnalyticsScriptClick}
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
								script. Script will start and be saved to restart on reboot.
							</p>
						</li>
					</ol>
				</div>
			</div>
		</Modal>
	);
};

export { SetupAnalyticsModal };
