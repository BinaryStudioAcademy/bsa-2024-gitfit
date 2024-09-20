import { type PermissionKey as PermissionKeys } from "../enums/permission-key.enum.js";
import { type ValueOf } from "./value-of.type.js";

type PermissionKey = ValueOf<typeof PermissionKeys>;

type RequiredPermission = PermissionKey | PermissionKey[];

export { type RequiredPermission };
