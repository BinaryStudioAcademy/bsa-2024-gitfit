import { type UserRow } from "~/pages/access-management/libs/types/types.js";

const getRowId = (row: UserRow): number => row.id;

export { getRowId };
