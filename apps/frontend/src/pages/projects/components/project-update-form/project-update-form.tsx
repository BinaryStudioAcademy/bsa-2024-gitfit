import { Button, Input } from "~/libs/components/components.js";
import { useAppForm, useCallback } from "~/libs/hooks/hooks.js";
import {
	type ProjectGetAllItemResponseDto,
	type ProjectPatchRequestDto,
	projectPatchValidationSchema,
} from "~/modules/projects/projects.js";

import styles from "./styles.module.css";

type Properties = {
	onSubmit: (id: number, payload: ProjectPatchRequestDto) => void;
	project: ProjectGetAllItemResponseDto;
};

const ProjectUpdateForm = ({ onSubmit, project }: Properties): JSX.Element => {
	const { description, id, name } = project;

	const { control, errors, handleSubmit } = useAppForm<ProjectPatchRequestDto>({
		defaultValues: { description, name },
		validationSchema: projectPatchValidationSchema,
	});

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit((formData: ProjectPatchRequestDto) => {
				onSubmit(id, formData);
			})(event_);
		},
		[handleSubmit, id, onSubmit],
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
				label="Description"
				name="description"
				rowsCount={4}
			/>
			<div className={styles["button-wrapper"]}>
				<Button label="Update" type="submit" />
			</div>
		</form>
	);
};

export { ProjectUpdateForm };
