import { useCallback } from "~/libs/hooks/hooks.js";
import {
	type GroupCreateRequestDto,
	groupCreateValidationSchema,
} from "~/modules/groups/groups.js";

import { GroupForm } from "../group-form/group-form.js";
import { DEFAULT_GROUP_CREATE_PAYLOAD } from "./libs/constants/constants.js";

type Properties = {
	onSubmit: (payload: GroupCreateRequestDto) => void;
};

const GroupCreateForm = ({ onSubmit }: Properties): JSX.Element => {
	const handleFormSubmit = useCallback(
		(formData: GroupCreateRequestDto) => {
			onSubmit(formData);
		},
		[onSubmit],
	);

	return (
		<GroupForm
			defaultValues={DEFAULT_GROUP_CREATE_PAYLOAD}
			onSubmit={handleFormSubmit}
			submitLabel="Create"
			validationSchema={groupCreateValidationSchema}
		/>
	);
};

export { GroupCreateForm };
