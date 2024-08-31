import { Button, Input } from "~/libs/components/components.js";
import { useAppDispatch, useAppForm, useCallback } from "~/libs/hooks/hooks.js";
import {
	actions as projectActions,
	type ProjectGetAllItemResponseDto,
	type ProjectUpdateRequestDto,
	projectUpdateValidationSchema,
} from "~/modules/projects/projects.js";

import styles from "./styles.module.css";

type Properties = {
	project: ProjectGetAllItemResponseDto;
};

const ProjectUpdateForm = ({ project }: Properties): JSX.Element => {
	const dispatch = useAppDispatch();

	const { description, id, name } = project;

	const { control, errors, handleSubmit } = useAppForm<ProjectUpdateRequestDto>(
		{
			defaultValues: { description, name },
			validationSchema: projectUpdateValidationSchema,
		},
	);

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit((formData: ProjectUpdateRequestDto) => {
				void dispatch(projectActions.update({ id, payload: formData }));
			})(event_);
		},
		[handleSubmit],
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
