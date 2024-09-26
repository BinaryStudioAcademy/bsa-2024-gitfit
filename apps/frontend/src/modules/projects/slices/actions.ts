import { createAsyncThunk } from "@reduxjs/toolkit";

import { NotificationMessage } from "~/libs/enums/enums.js";
import { subtractDays } from "~/libs/helpers/helpers.js";
import { type AsyncThunkConfig } from "~/libs/types/types.js";
import {
	type ActivityLogGetAllAnalyticsResponseDto,
	type ActivityLogQueryParameters,
} from "~/modules/activity/activity.js";
import {
	type ContributorGetAllResponseDto,
	ContributorOrderByKey,
} from "~/modules/contributors/contributors.js";
import {
	type ProjectCreateRequestDto,
	type ProjectGetAllItemResponseDto,
	type ProjectGetAllRequestDto,
	type ProjectGetAllResponseDto,
	type ProjectGetByIdResponseDto,
	type ProjectPatchRequestDto,
	type ProjectPatchResponseDto,
} from "~/modules/projects/projects.js";
import { ANALYTICS_DATE_MAX_RANGE } from "~/pages/analytics/libs/constants/analytics-date-max-range.constant.js";

import { name as sliceName } from "./project.slice.js";

const getById = createAsyncThunk<
	ProjectGetByIdResponseDto,
	{ id: string },
	AsyncThunkConfig
>(`${sliceName}/getById`, async (payload, { extra }) => {
	const { projectApi } = extra;

	return await projectApi.getById(payload);
});

const loadAll = createAsyncThunk<
	ProjectGetAllResponseDto,
	ProjectGetAllRequestDto,
	AsyncThunkConfig
>(`${sliceName}/load-all`, async (query, { extra }) => {
	const { projectApi } = extra;

	return await projectApi.getAll(query);
});

const create = createAsyncThunk<
	ProjectGetAllItemResponseDto,
	ProjectCreateRequestDto,
	AsyncThunkConfig
>(`${sliceName}/create`, async (payload, { extra }) => {
	const { projectApi, toastNotifier } = extra;

	const response = await projectApi.create(payload);

	toastNotifier.showSuccess(NotificationMessage.PROJECT_CREATE_SUCCESS);

	return response;
});

const patch = createAsyncThunk<
	ProjectPatchResponseDto,
	{ id: number; payload: ProjectPatchRequestDto },
	AsyncThunkConfig
>(`${sliceName}/update`, async ({ id, payload }, { extra }) => {
	const { projectApi, toastNotifier } = extra;

	const updatedProject = await projectApi.patch(id, payload);

	toastNotifier.showSuccess(NotificationMessage.PROJECT_UPDATE_SUCCESS);

	return updatedProject;
});

const deleteById = createAsyncThunk<boolean, number, AsyncThunkConfig>(
	`${sliceName}/deleteById`,
	async (id, { extra }) => {
		const { projectApi, toastNotifier } = extra;

		const isDeleted = await projectApi.deleteById(id);

		if (isDeleted) {
			toastNotifier.showSuccess(NotificationMessage.PROJECT_DELETE_SUCCESS);
		}

		return isDeleted;
	},
);

const loadAllContributorsByProjectId = createAsyncThunk<
	ContributorGetAllResponseDto,
	number,
	AsyncThunkConfig
>(
	`${sliceName}/load-all-contributors-by-project-id`,
	async (projectId, { dispatch, extra }) => {
		const { contributorApi } = extra;

		const todayDate = new Date();
		const endDate = todayDate.toISOString();
		const startDate = subtractDays(
			todayDate,
			ANALYTICS_DATE_MAX_RANGE,
		).toISOString();

		void dispatch(
			loadAllContributorsActivityByProjectId({
				endDate,
				projectId,
				startDate,
			}),
		);

		return await contributorApi.getAll({
			orderBy: ContributorOrderByKey.LAST_ACTIVITY_DATE,
			projectId,
		});
	},
);

const loadAllContributorsActivityByProjectId = createAsyncThunk<
	ActivityLogGetAllAnalyticsResponseDto,
	ActivityLogQueryParameters,
	AsyncThunkConfig
>(
	`${sliceName}/load-all-contributors-activity-by-project-id`,
	async (query, { extra }) => {
		const { activityLogApi } = extra;

		return await activityLogApi.getAll(query);
	},
);

export {
	create,
	deleteById,
	getById,
	loadAll,
	loadAllContributorsActivityByProjectId,
	loadAllContributorsByProjectId,
	patch,
};
