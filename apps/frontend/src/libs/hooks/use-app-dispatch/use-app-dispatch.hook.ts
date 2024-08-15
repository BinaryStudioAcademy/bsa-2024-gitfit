import { useDispatch } from "react-redux";

import { type store } from "~/libs/modules/store/store.js";

const useAppDispatch = useDispatch.withTypes<typeof store.instance.dispatch>();

export { useAppDispatch };
