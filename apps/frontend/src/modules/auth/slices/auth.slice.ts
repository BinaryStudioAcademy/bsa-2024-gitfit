import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type PermissionGetAllItemResponseDto } from "~/modules/permissions/permissions.js";
import { type ProjectPermissionsGetAllItemResponseDto } from "~/modules/project-permissions/project-permissions.js";

import { type UserAuthResponseDto } from "../libs/types/types.js";
import { getAuthenticatedUser, logout, signIn, signUp } from "./actions.js";

type State = {
	authenticatedUser: null | UserAuthResponseDto;
	dataStatus: ValueOf<typeof DataStatus>;
	permissionedProjectsId: number[];
	projectUserPermissions: Record<
		number,
		ProjectPermissionsGetAllItemResponseDto[]
	>;
	userPermissions: PermissionGetAllItemResponseDto[];
};

const initialState: State = {
	authenticatedUser: null,
	dataStatus: DataStatus.IDLE,
	permissionedProjectsId: [],
	projectUserPermissions: {},
	userPermissions: [],
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(signIn.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(signIn.fulfilled, (state) => {
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(signIn.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(getAuthenticatedUser.fulfilled, (state) => {
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getAuthenticatedUser.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getAuthenticatedUser.rejected, (state) => {
			state.authenticatedUser = null;
			state.permissionedProjectsId = [];
			state.userPermissions = [];
			state.projectUserPermissions = {};
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(signUp.fulfilled, (state) => {
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(signUp.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(signUp.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(logout.fulfilled, (state) => {
			state.authenticatedUser = null;
			state.permissionedProjectsId = [];
			state.userPermissions = [];
			state.projectUserPermissions = {};
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(logout.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(logout.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addMatcher(
			isAnyOf(
				getAuthenticatedUser.fulfilled,
				signIn.fulfilled,
				signUp.fulfilled,
			),
			(state, action) => {
				state.authenticatedUser = action.payload;
				state.userPermissions =
					action.payload?.groups.flatMap((group) => group.permissions) ?? [];
				const projectPermissionsMap: Record<
					number,
					ProjectPermissionsGetAllItemResponseDto[]
				> = {};

				const projectGroups = action.payload?.projectGroups ?? [];

				for (const group of projectGroups) {
					const { projectId } = group;

					if (projectId) {
						if (!projectPermissionsMap[projectId]) {
							projectPermissionsMap[projectId] = [];
						}

						projectPermissionsMap[projectId] = [
							...projectPermissionsMap[projectId],
							...group.permissions,
						];
					}
				}

				state.projectUserPermissions = projectPermissionsMap;
				state.permissionedProjectsId = projectGroups.map(
					(group) => group.projectId,
				);
			},
		);
	},
	initialState,
	name: "auth",
	reducers: {},
});

export { actions, name, reducer };
