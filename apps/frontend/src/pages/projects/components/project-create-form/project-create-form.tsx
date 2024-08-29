import { Button, Input } from "~/libs/components/components.js";
import { useAppForm, useCallback } from "~/libs/hooks/hooks.js";
import {
	type ProjectCreateRequestDto,
	projectCreateValidationSchema,
} from "~/modules/projects/projects.js";

import {
	DEFAULT_PROJECT_CREATE_PAYLOAD,
	DESCRIPTION_ROWS_COUNT,
} from "./libs/constants/constants.js";
import styles from "./styles.module.css";

type Properties = {
	onSubmit: (payload: ProjectCreateRequestDto) => void;
};

const ProjectCreateForm = ({ onSubmit }: Properties): JSX.Element => {
	const { control, errors, handleSubmit } = useAppForm<ProjectCreateRequestDto>(
		{
			defaultValues: DEFAULT_PROJECT_CREATE_PAYLOAD,
			validationSchema: projectCreateValidationSchema,
		},
	);

	const handleFormSubmit = useCallback(
		(event: React.BaseSyntheticEvent): void => {
			void handleSubmit((formData: ProjectCreateRequestDto) => {
				onSubmit(formData);
			})(event);
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
				rows={DESCRIPTION_ROWS_COUNT}
			/>
			<div className={styles["button-wrapper"]}>
				<Button label="Create" type="submit" />
			</div>
		</form>
	);
};

export { ProjectCreateForm };
