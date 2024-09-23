import { Button, Input } from "~/libs/components/components.js";
import { useAppForm, useCallback } from "~/libs/hooks/hooks.js";
import {
	type ContributorGetAllItemResponseDto,
	type ContributorPatchRequestDto,
	contributorPatchValidationSchema,
} from "~/modules/contributors/contributors.js";

import styles from "./styles.module.css";

type Properties = {
	contributor: ContributorGetAllItemResponseDto;
	onSubmit: (payload: ContributorPatchRequestDto) => void;
};

const ContributorUpdateForm = ({
	contributor,
	onSubmit,
}: Properties): JSX.Element => {
	const { gitEmails, name, projects } = contributor;

	const gitEmailsString = gitEmails.map((email) => email.email).join(", ");
	const projectsString = projects.map((project) => project.name).join(", ");

	const { control, errors, handleSubmit } = useAppForm<{
		gitEmails: string;
		name: string;
		projects: string;
	}>({
		defaultValues: {
			gitEmails: gitEmailsString,
			name,
			projects: projectsString,
		},
		validationSchema: contributorPatchValidationSchema,
	});

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit((formData: { name: string }) => {
				const payload: ContributorPatchRequestDto = { name: formData.name };
				onSubmit(payload);
			})(event_);
		},
		[handleSubmit, onSubmit],
	);

	return (
		<form className={styles["form-wrapper"]} onSubmit={handleFormSubmit}>
			<Input
				autoComplete="name"
				control={control}
				errors={errors}
				label="Name"
				name="name"
			/>
			<Input
				control={control}
				errors={errors}
				isDisabled
				label="Git Emails"
				name="gitEmails"
			/>
			<Input
				control={control}
				errors={errors}
				isDisabled
				label="Project"
				name="projects"
			/>
			<div className={styles["button-wrapper"]}>
				<Button label="Update" type="submit" />
			</div>
		</form>
	);
};

export { ContributorUpdateForm };
