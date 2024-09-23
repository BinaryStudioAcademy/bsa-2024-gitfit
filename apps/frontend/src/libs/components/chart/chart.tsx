import { Line, LineChart } from "recharts";

import { type ChartData } from "~/libs/types/types.js";

type Properties = {
	data: ChartData;
};

const Chart = ({ data }: Properties): JSX.Element => {
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

export { Chart };
