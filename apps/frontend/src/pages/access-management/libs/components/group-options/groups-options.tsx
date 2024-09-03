import { TableOptions } from "~/libs/components/components.js";

type Properties = {
	onEdit: () => void;
};

const GroupOptions = ({ onEdit }: Properties): React.ReactElement => {
	return (
		<TableOptions>
			<button onClick={onEdit}>Edit</button>
		</TableOptions>
	);
};

export { GroupOptions };
