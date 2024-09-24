import { Button, Checkbox, Input } from "~/libs/components/components.js";
import {
	useAppForm,
	useCallback,
	useEffect,
	useFormWatch,
} from "~/libs/hooks/hooks.js";
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
	const { gitEmails, hiddenAt, name, projects } = contributor;

	const isHidden = Boolean(hiddenAt);

	const gitEmailsString = gitEmails.map((email) => email.email).join(", ");
	const projectsString = projects.map((project) => project.name).join(", ");

	const { control, errors, handleSubmit, handleValueSet } = useAppForm<{
		gitEmails: string;
		hiddenAt: null | string;
		isHidden: boolean;
		name: string;
		projects: string;
	}>({
		defaultValues: {
			gitEmails: gitEmailsString,
			hiddenAt,
			isHidden,
			name,
			projects: projectsString,
		},
		validationSchema: contributorPatchValidationSchema,
	});

	const isHiddenValue = useFormWatch({
		control,
		name: "isHidden",
	});

	useEffect(() => {
		handleValueSet("isHidden", isHidden);
	}, [isHidden, handleValueSet]);

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit((formData: { isHidden: boolean; name: string }) => {
				const hiddenAtValue = isHiddenValue ? new Date().toISOString() : null;

				const payload: ContributorPatchRequestDto = {
					hiddenAt: hiddenAtValue,
					name: formData.name,
				};

				onSubmit(payload);
			})(event_);
		},
		[handleSubmit, isHiddenValue, onSubmit],
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
			<div className={styles["checkbox-wrapper"]}>
				<label className={styles["checkbox-label"]} htmlFor="isHidden">
					<Checkbox
						control={control}
						errors={errors}
						id="isHidden"
						name="isHidden"
					/>
					<span>Do Not Track</span>
				</label>
				<p className={styles["checkbox-description"]}>
					If this option is checked, the contributor will be hidden from the
					analytics and projects list.
				</p>
			</div>
			<div className={styles["button-wrapper"]}>
				<Button label="Update" type="submit" />
			</div>
		</form>
	);
};

export { ContributorUpdateForm };
