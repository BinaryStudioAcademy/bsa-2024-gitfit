import { Line, LineChart } from "recharts";

import { type ChartData } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties = {
	data: ChartData;
};

const Chart = ({ data }: Properties): JSX.Element => {
	return (
		<LineChart data={data} height={40} width={120}>
			<Line className={styles["line"] as string} dataKey="y" dot={false} />
		</LineChart>
	);
};

export { Chart };
