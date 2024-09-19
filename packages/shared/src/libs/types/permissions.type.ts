import { type PermissionKey } from "../enums/enums.js";
import { type ValueOf } from "./types.js";

type Permissions = {
	alternative?: ValueOf<typeof PermissionKey>[];
	required?: ValueOf<typeof PermissionKey>[];
};

export { type Permissions };
