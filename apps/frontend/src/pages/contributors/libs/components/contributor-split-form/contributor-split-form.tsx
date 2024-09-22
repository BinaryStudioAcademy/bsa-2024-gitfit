import { Button, Input, Select } from "~/libs/components/components.js";
import { useAppForm, useCallback, useMemo } from "~/libs/hooks/hooks.js";
import {
	type ContributorGetAllItemResponseDto,
	type ContributorSplitRequestDto,
	contributorSplitValidationSchema,
} from "~/modules/contributors/contributors.js";

import { DEFAULT_CONTRIBUTOR_SPLIT_PAYLOAD } from "./libs/constants/constants.js";
import { getGitEmailOptions } from "./libs/helpers/helpers.js";
import styles from "./styles.module.css";

type Properties = {
	currentContributor: ContributorGetAllItemResponseDto;
	onSubmit: (payload: ContributorSplitRequestDto) => void;
};

const ContributorSplitForm = ({
	currentContributor,
	onSubmit,
}: Properties): JSX.Element => {
	const { gitEmails, name } = currentContributor;

	const gitEmailsString = gitEmails.map((email) => email.email).join(", ");
	const currentContributorInfo = `${name} (${gitEmailsString})`;

	const { control, errors, handleSubmit } = useAppForm<{
		currentContributor: string;
		emailId: number;
		newContributorName: string;
	}>({
		defaultValues: {
			currentContributor: currentContributorInfo,
			newContributorName: DEFAULT_CONTRIBUTOR_SPLIT_PAYLOAD.newContributorName,
		},
		validationSchema: contributorSplitValidationSchema,
	});

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit((formData) => {
				const payload: ContributorSplitRequestDto = {
					emailId: formData.emailId,
					newContributorName: formData.newContributorName,
				};
				onSubmit(payload);
			})(event_);
		},
		[handleSubmit, onSubmit],
	);

	const gitEmailOptions = useMemo(
		() => getGitEmailOptions(currentContributor),
		[currentContributor],
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
				errors={errors}
				label="Email to detach"
				name="emailId"
				options={gitEmailOptions}
				placeholder="Choose email"
			/>
			<Input
				control={control}
				errors={errors}
				label="New contributor name"
				name="newContributorName"
				placeholder="Contributor name"
			/>

			<div className={styles["button-wrapper"]}>
				<Button label="Merge" type="submit" />
			</div>
		</form>
	);
};

export { ContributorSplitForm };
