import {
	Loader,
	Modal,
	PageLayout,
	Select,
	Table,
	TablePagination,
} from "~/libs/components/components.js";
import { DataStatus, QueryParameterName } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useCallback,
	useEffect,
	useFormWatch,
	useMemo,
	useModal,
	usePagination,
	useSearchFilters,
	useSearchParams,
	useState,
} from "~/libs/hooks/hooks.js";
import { actions as activityActions } from "~/modules/activity/activity.js";
import {
	actions as contributorActions,
	type ContributorGetAllItemResponseDto,
	type ContributorMergeRequestDto,
	type ContributorPatchRequestDto,
	type ContributorSplitRequestDto,
} from "~/modules/contributors/contributors.js";
import { getProjectOptions } from "~/pages/analytics/libs/helpers/helpers.js";

import {
	ContributorMergeForm,
	ContributorSplitForm,
	ContributorUpdateForm,
} from "./libs/components/components.js";
import {
	getContributorColumns,
	getContributorRows,
} from "./libs/helpers/helpers.js";
import { type ContributorRow } from "./libs/types/types.js";
import styles from "./styles.module.css";

const Contributors = (): JSX.Element => {
	const dispatch = useAppDispatch();

	const {
		allContributors,
		allContributorsStatus,
		contributors,
		dataStatus,
		mergeContributorsStatus,
		splitContributorsStatus,
		totalCount,
		updateContributorsStatus,
	} = useAppSelector(({ contributors }) => contributors);

	const { projects } = useAppSelector(({ activityLogs }) => activityLogs);

	useEffect(() => {
		void dispatch(activityActions.loadAllProjects());
	}, [dispatch]);

	const { onPageChange, onPageSizeChange, page, pageSize } = usePagination({
		queryParameterPrefix: "contributor",
		totalItemsCount: totalCount,
	});

	const handleLoadContributors = useCallback(() => {
		void dispatch(
			contributorActions.loadAll({
				hasHidden: true,
				page,
				pageSize,
			}),
		);
	}, [dispatch, page, pageSize]);

	const {
		isOpened: isUpdateModalOpened,
		onClose: onUpdateModalClose,
		onOpen: onUpdateModalOpen,
	} = useModal();

	const {
		isOpened: isMergeModalOpen,
		onClose: onMergeModalClose,
		onOpen: onMergeModalOpen,
	} = useModal();

	const {
		isOpened: isSplitModalOpen,
		onClose: onSplitModalClose,
		onOpen: onSplitModalOpen,
	} = useModal();

	const [contributorToEdit, setContributorToEdit] =
		useState<ContributorGetAllItemResponseDto | null>(null);

	const [contributorToMerge, setContributorToMerge] =
		useState<ContributorGetAllItemResponseDto | null>(null);

	const [contributorToSplit, setContributorToSplit] =
		useState<ContributorGetAllItemResponseDto | null>(null);

	const openEditModal = useCallback(
		(contributor: ContributorGetAllItemResponseDto | null) => {
			setContributorToEdit(contributor);
			onUpdateModalOpen();
		},
		[setContributorToEdit, onUpdateModalOpen],
	);

	const openMergeModal = useCallback(
		(contributor: ContributorGetAllItemResponseDto | null) => {
			void dispatch(contributorActions.loadAllWithoutPagination());
			setContributorToMerge(contributor);
			onMergeModalOpen();
		},
		[dispatch, setContributorToMerge, onMergeModalOpen],
	);

	const openSplitModal = useCallback(
		(contributor: ContributorGetAllItemResponseDto | null) => {
			setContributorToSplit(contributor);
			onSplitModalOpen();
		},
		[setContributorToSplit, onSplitModalOpen],
	);

	const handleEdit = useCallback(
		(contributorId: number) => {
			const contributor = contributors.find(({ id }) => id === contributorId);

			if (contributor) {
				openEditModal(contributor);
			}
		},
		[contributors, openEditModal],
	);

	const handleMerge = useCallback(
		(contributorId: number): void => {
			const contributor = contributors.find(({ id }) => id === contributorId);

			if (contributor) {
				openMergeModal(contributor);
			}
		},
		[contributors, openMergeModal],
	);

	const handleSplit = useCallback(
		(contributorId: number): void => {
			const contributor = contributors.find(({ id }) => id === contributorId);

			if (contributor) {
				openSplitModal(contributor);
			}
		},
		[contributors, openSplitModal],
	);

	const handleContributorUpdateSubmit = useCallback(
		(payload: ContributorPatchRequestDto) => {
			if (contributorToEdit) {
				void dispatch(
					contributorActions.patch({ id: contributorToEdit.id, payload }),
				);
			}
		},
		[contributorToEdit, dispatch],
	);

	const handleContributorMergeSubmit = useCallback(
		(payload: ContributorMergeRequestDto) => {
			if (contributorToMerge) {
				void dispatch(
					contributorActions.merge({ id: contributorToMerge.id, payload }),
				);
			}
		},
		[contributorToMerge, dispatch],
	);

	const handleContributorSplitSubmit = useCallback(
		(payload: ContributorSplitRequestDto) => {
			if (contributorToSplit) {
				void dispatch(
					contributorActions.split({ id: contributorToSplit.id, payload }),
				);
			}
		},
		[contributorToSplit, dispatch],
	);

	useEffect(() => {
		if (updateContributorsStatus === DataStatus.FULFILLED) {
			onUpdateModalClose();
			setContributorToEdit(null);
		}
	}, [updateContributorsStatus, onUpdateModalClose, setContributorToEdit]);

	useEffect(() => {
		if (mergeContributorsStatus === DataStatus.FULFILLED) {
			onMergeModalClose();
			setContributorToMerge(null);
		}
	}, [mergeContributorsStatus, onMergeModalClose, setContributorToMerge]);

	useEffect(() => {
		if (splitContributorsStatus === DataStatus.FULFILLED) {
			onSplitModalClose();
			setContributorToSplit(null);

			void dispatch(contributorActions.loadAll({ page, pageSize }));
		}
	}, [
		dispatch,
		splitContributorsStatus,
		onSplitModalClose,
		setContributorToSplit,
		page,
		pageSize,
	]);

	const contributorsColumns = useMemo(
		() =>
			getContributorColumns({
				onEdit: handleEdit,
				onMerge: handleMerge,
				onSplit: handleSplit,
			}),
		[handleEdit, handleMerge, handleSplit],
	);

	const handleLoadContributorsByProjectId = useCallback(
		(projectId: number) => {
			void dispatch(
				contributorActions.loadAll({
					hasHidden: true,
					page,
					pageSize,
					projectId,
				}),
			);
		},
		[dispatch, page, pageSize],
	);

	const [searchParameters] = useSearchParams();
	const projectIdQueryParameter = searchParameters.get(
		QueryParameterName.PROJECT_ID,
	);

	const { onSearch: onProjectSelect } = useSearchFilters({
		queryParameterName: QueryParameterName.PROJECT_ID,
	});

	const { control, handleSubmit } = useAppForm<{
		projectId: null | number;
	}>({
		defaultValues: {
			projectId: projectIdQueryParameter
				? Number(projectIdQueryParameter)
				: null,
		},
	});

	const projectIdValue = useFormWatch({ control, name: "projectId" });

	const handleFiltersFormSubmit = useCallback(
		(event_?: React.BaseSyntheticEvent): void => {
			void handleSubmit(({ projectId }) => {
				if (projectId) {
					handleLoadContributorsByProjectId(projectId);
				} else {
					handleLoadContributors();
				}
			})(event_);
		},
		[handleSubmit, handleLoadContributorsByProjectId, handleLoadContributors],
	);

	useEffect(() => {
		handleFiltersFormSubmit();
		onProjectSelect(projectIdValue ? String(projectIdValue) : "");
	}, [projectIdValue, handleFiltersFormSubmit, onProjectSelect]);

	const projectOptions = getProjectOptions(projects);

	const contributorsData: ContributorRow[] = getContributorRows(contributors);

	const isLoading =
		dataStatus === DataStatus.IDLE || dataStatus === DataStatus.PENDING;

	const isLoadingAllContributors =
		allContributorsStatus === DataStatus.IDLE ||
		allContributorsStatus === DataStatus.PENDING;

	return (
		<PageLayout>
			<h1 className={styles["title"]}>Contributors</h1>
			<form
				className={styles["filters-form"]}
				onSubmit={handleFiltersFormSubmit}
			>
				<div className={styles["select-wrapper"]}>
					<Select
						control={control}
						isClearable
						isLabelHidden
						isSearchable
						label="Select project"
						name="projectId"
						options={projectOptions}
						placeholder="Select project"
					/>
				</div>
			</form>
			<section className={styles["contributors-table"]}>
				<Table<ContributorRow>
					columns={contributorsColumns}
					data={contributorsData}
					isFullHeight
					isLoading={isLoading}
				/>
				<TablePagination
					background="primary"
					onPageChange={onPageChange}
					onPageSizeChange={onPageSizeChange}
					page={page}
					pageSize={pageSize}
					totalItemsCount={totalCount}
				/>
			</section>
			{contributorToEdit && (
				<Modal
					isOpened={isUpdateModalOpened}
					onClose={onUpdateModalClose}
					title="Update contributor"
				>
					<ContributorUpdateForm
						contributor={contributorToEdit}
						onSubmit={handleContributorUpdateSubmit}
					/>
				</Modal>
			)}
			{contributorToMerge && (
				<Modal
					isOpened={isMergeModalOpen}
					onClose={onMergeModalClose}
					title="Merge contributors"
				>
					{isLoadingAllContributors ? (
						<Loader />
					) : (
						<ContributorMergeForm
							allContributors={allContributors}
							currentContributor={contributorToMerge}
							onSubmit={handleContributorMergeSubmit}
						/>
					)}
				</Modal>
			)}
			{contributorToSplit && (
				<Modal
					isOpened={isSplitModalOpen}
					onClose={onSplitModalClose}
					title="Split contributors"
				>
					<ContributorSplitForm
						currentContributor={contributorToSplit}
						onSubmit={handleContributorSplitSubmit}
					/>
				</Modal>
			)}
		</PageLayout>
	);
};

export { Contributors };
