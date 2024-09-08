import { Button, Input } from "~/libs/components/components.js";
import { useAppForm, useCallback, useState } from "~/libs/hooks/hooks.js";
import {
	type ProjectCreateRequestDto,
	projectCreateValidationSchema,
} from "~/modules/projects/projects.js";

import { DEFAULT_PROJECT_CREATE_PAYLOAD } from "./libs/constants/constants.js";
import {
	ProjectValidationMessage,
	ProjectValidationRule,
} from "./libs/enums/enums.js";
import styles from "./styles.module.css";

type Properties = {
	onSubmit: (payload: ProjectCreateRequestDto) => void;
};

const ProjectCreateForm = ({ onSubmit }: Properties): JSX.Element => {
	const { control, errors, handleSubmit, watch } =
		useAppForm<ProjectCreateRequestDto>({
			defaultValues: DEFAULT_PROJECT_CREATE_PAYLOAD,
			validationSchema: projectCreateValidationSchema,
		});

	const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

	const descriptionValue = watch("description", "");
	const charCount = descriptionValue.length;

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			setIsSubmitted(true);
			void handleSubmit((formData: ProjectCreateRequestDto) => {
				onSubmit(formData);
				setIsSubmitted(false);
			})(event_);
		},
		[handleSubmit, onSubmit],
	);

	return (
		<form className={styles["form-wrapper"]} onSubmit={handleFormSubmit}>
			<Input
				autoComplete="given-name"
				control={control}
				errors={errors}
				label="Name"
				name="name"
			/>
			<Input
				control={control}
				errors={errors}
				label="Description"
				name="description"
				rowsCount={4}
			/>
			{charCount <= ProjectValidationRule.DESCRIPTION_MAXIMUM_LENGTH && (
				<span className={styles["char-counter"]}>
					{charCount}/{ProjectValidationRule.DESCRIPTION_MAXIMUM_LENGTH}
				</span>
			)}
			{charCount > ProjectValidationRule.DESCRIPTION_MAXIMUM_LENGTH &&
				!isSubmitted && (
					<span className={styles["input-error"]}>
						{ProjectValidationMessage.DESCRIPTION_TOO_LONG}
					</span>
				)}
			<div className={styles["button-wrapper"]}>
				<Button label="Create" type="submit" />
			</div>
		</form>
	);
};

export { ProjectCreateForm };
