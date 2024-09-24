import { Button, Input, Select } from "~/libs/components/components.js";
import { useAppForm, useCallback, useMemo } from "~/libs/hooks/hooks.js";
import {
	type ContributorGetAllItemResponseDto,
	type ContributorSplitRequestDto,
	contributorSplitValidationSchema,
} from "~/modules/contributors/contributors.js";

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

	const [firstEmail] = gitEmails;

	const { control, errors, handleSubmit } = useAppForm<{
		currentContributor: string;
		gitEmailId: number;
		newContributorName: string;
	}>({
		defaultValues: {
			currentContributor: currentContributorInfo,
			gitEmailId: firstEmail?.id as number,
			newContributorName: currentContributor.name,
		},
		validationSchema: contributorSplitValidationSchema,
	});

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit((formData) => {
				const payload: ContributorSplitRequestDto = {
					gitEmailId: formData.gitEmailId,
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
				label="Email to detach"
				name="gitEmailId"
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
				<Button label="Split" type="submit" />
			</div>
		</form>
	);
};

export { ContributorSplitForm };
