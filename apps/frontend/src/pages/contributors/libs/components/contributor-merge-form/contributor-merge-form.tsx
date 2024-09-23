import { Button, Icon, Input, Select } from "~/libs/components/components.js";
import { useAppForm, useCallback, useMemo } from "~/libs/hooks/hooks.js";
import {
	type ContributorGetAllItemResponseDto,
	type ContributorMergeRequestDto,
	contributorMergeValidationSchema,
} from "~/modules/contributors/contributors.js";

import { getContributorOptions } from "./libs/helpers/helpers.js";
import styles from "./styles.module.css";

type Properties = {
	allContributors: ContributorGetAllItemResponseDto[];
	currentContributor: ContributorGetAllItemResponseDto;
	onSubmit: (payload: ContributorMergeRequestDto) => void;
};

const ContributorMergeForm = ({
	allContributors,
	currentContributor,
	onSubmit,
}: Properties): JSX.Element => {
	const { gitEmails, id, name } = currentContributor;

	const otherContributors: ContributorGetAllItemResponseDto[] =
		allContributors.filter((contributor) => contributor.id !== id);

	const gitEmailsString = gitEmails.map((email) => email.email).join(", ");
	const currentContributorInfo = `${name} (${gitEmailsString})`;

	const { control, errors, handleSubmit } = useAppForm<{
		currentContributor: string;
		selectedContributorId: number;
	}>({
		defaultValues: {
			currentContributor: currentContributorInfo,
		},
		validationSchema: contributorMergeValidationSchema,
	});

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit((formData) => {
				const payload: ContributorMergeRequestDto = {
					selectedContributorId: formData.selectedContributorId,
				};
				onSubmit(payload);
			})(event_);
		},
		[handleSubmit, onSubmit],
	);

	const contributorOptions = useMemo(
		() => getContributorOptions(otherContributors),
		[otherContributors],
	);

	return (
		<form className={styles["form-wrapper"]} onSubmit={handleFormSubmit}>
			<Input
				control={control}
				errors={errors}
				isDisabled
				isReadOnly
				label="Current contributor"
				name="currentContributor"
			/>
			<Select
				control={control}
				label="Contributor to merge with"
				name="selectedContributorId"
				options={contributorOptions}
				placeholder="Choose contributor"
			/>
			<div className={styles["warn-message"]}>
				<Icon height={16} name="warning" width={16} />
				<span className={styles["warn-message-text"]}>
					The selected contributor will be deleted. This action can be undone
					later using the split functionality.
				</span>
			</div>
			<div className={styles["button-wrapper"]}>
				<Button label="Merge" type="submit" />
			</div>
		</form>
	);
};

export { ContributorMergeForm };
