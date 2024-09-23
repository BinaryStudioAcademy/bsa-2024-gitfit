import { Line, LineChart } from "recharts";

import { type ActivityChartData } from "./libs/types/types.js";

type Properties = {
	data: ActivityChartData;
};

const ActivityChart = ({ data }: Properties): JSX.Element => {
	return (
		<LineChart data={data} height={40} width={120}>
			<Line
				dataKey="y"
				dot={false}
				stroke="var(--color-brand-primary)"
				strokeWidth={3}
			/>
		</LineChart>
	);
};

export { ActivityChart };
