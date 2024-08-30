import { Button, Input } from "~/libs/components/components.js";
import { EMPTY_LENGTH } from "~/libs/constants/constants.js";
import {
	useAppForm,
	useCallback,
	useFormWatch,
	useMemo,
} from "~/libs/hooks/hooks.js";
import {
	type ProjectCreateRequestDto,
	projectCreateValidationSchema,
} from "~/modules/projects/projects.js";

import { DEFAULT_PROJECT_CREATE_PAYLOAD } from "./libs/constants/constants.js";
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

	const { name: enteredName } = useFormWatch({ control });

	const isButtonDisabled = useMemo(
		() => enteredName?.length === EMPTY_LENGTH,
		[enteredName],
	);

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit((formData: ProjectCreateRequestDto) => {
				onSubmit(formData);
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
			<div className={styles["button-wrapper"]}>
				<Button isDisabled={isButtonDisabled} label="Create" type="submit" />
			</div>
		</form>
	);
};

export { ProjectCreateForm };
