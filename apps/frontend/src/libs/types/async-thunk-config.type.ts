import { type store } from "~/libs/modules/store/store.js";

type AsyncThunkConfig = {
	dispatch: typeof store.instance.dispatch;
	extra: typeof store.extraArguments;
	state: ReturnType<typeof store.instance.getState>;
};

export { type AsyncThunkConfig };
