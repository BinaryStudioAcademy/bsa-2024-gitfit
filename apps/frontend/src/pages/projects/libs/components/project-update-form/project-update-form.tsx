import { Button, Input } from "~/libs/components/components.js";
import {
	useAppForm,
	useCallback,
	useEffect,
	useFormWatch,
} from "~/libs/hooks/hooks.js";
import {
	type ProjectGetByIdResponseDto,
	type ProjectPatchRequestDto,
	projectPatchValidationSchema,
	ProjectValidationRule,
} from "~/modules/projects/projects.js";

import styles from "./styles.module.css";

type Properties = {
	onSubmit: (payload: ProjectPatchRequestDto) => void;
	project: ProjectGetByIdResponseDto;
};

const ProjectUpdateForm = ({ onSubmit, project }: Properties): JSX.Element => {
	const { description, name } = project;

	const { control, errors, handleSubmit, handleTrigger } =
		useAppForm<ProjectPatchRequestDto>({
			defaultValues: { description, name },
			validationSchema: projectPatchValidationSchema,
		});

	const descriptionValue = useFormWatch({
		control,
		defaultValue: description,
		name: "description",
	});

	const isDescriptionCounterShown = !errors["description"]?.message;

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit((formData: ProjectPatchRequestDto) => {
				onSubmit(formData);
			})(event_);
		},
		[handleSubmit, onSubmit],
	);

	useEffect(() => {
		void handleTrigger("description");
	}, [descriptionValue, handleTrigger]);

	return (
		<form className={styles["form-wrapper"]} onSubmit={handleFormSubmit}>
			<Input
				autoComplete="name"
				control={control}
				errors={errors}
				label="Name"
				name="name"
			/>
			<div className={styles["description-wrapper"]}>
				<Input
					control={control}
					errors={errors}
					label="Description"
					name="description"
					rowsCount={4}
				/>
				{isDescriptionCounterShown && (
					<span className={styles["description-counter"]}>
						{descriptionValue.length}/
						{ProjectValidationRule.DESCRIPTION_MAXIMUM_LENGTH}
					</span>
				)}
			</div>
			<div className={styles["button-wrapper"]}>
				<Button label="Update" type="submit" />
			</div>
		</form>
	);
};

export { ProjectUpdateForm };
