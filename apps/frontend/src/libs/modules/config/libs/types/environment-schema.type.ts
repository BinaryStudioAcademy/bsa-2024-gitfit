import { type AppEnvironment } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

type EnvironmentSchema = {
	API: {
		ORIGIN_URL: string;
	};
	APP: {
		ENVIRONMENT: ValueOf<typeof AppEnvironment>;
	};
};

export { type EnvironmentSchema };
