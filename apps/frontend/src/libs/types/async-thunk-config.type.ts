import { type store } from "~/libs/modules/store/store.js";

import { type AsyncThunkRejectValue } from "./types.js";

type AsyncThunkConfig = {
	dispatch: typeof store.instance.dispatch;
	extra: typeof store.extraArguments;
	rejectValue: AsyncThunkRejectValue;
	state: ReturnType<typeof store.instance.getState>;
};

export { type AsyncThunkConfig };
