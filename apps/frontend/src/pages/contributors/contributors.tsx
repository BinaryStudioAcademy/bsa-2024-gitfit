import { Modal, PageLayout, Table } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useMemo,
	useModal,
	useState,
} from "~/libs/hooks/hooks.js";
import {
	actions as contributorActions,
	type ContributorGetAllItemResponseDto,
	type ContributorMergeRequestDto,
	type ContributorPatchRequestDto,
} from "~/modules/contributors/contributors.js";

import {
	ContributorMergeForm,
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

	const { contributors, dataStatus } = useAppSelector(
		({ contributors }) => contributors,
	);

	useEffect(() => {
		void dispatch(contributorActions.loadAll());
	}, [dispatch]);

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

	const [contributorToEdit, setContributorToEdit] =
		useState<ContributorGetAllItemResponseDto | null>(null);

	const [contributorToMerge, setContributorToMerge] =
		useState<ContributorGetAllItemResponseDto | null>(null);

	const openEditModal = useCallback(
		(contributor: ContributorGetAllItemResponseDto | null) => {
			setContributorToEdit(contributor);

			if (contributor) {
				onUpdateModalOpen();
			}
		},
		[onUpdateModalOpen],
	);

	const openMergeModal = useCallback(
		(contributor: ContributorGetAllItemResponseDto | null) => {
			setContributorToMerge(contributor);

			if (contributor) {
				onMergeModalOpen();
			}
		},
		[onMergeModalOpen],
	);

	const handleEdit = useCallback(
		(contributorId: number) => {
			const contributor = contributors.find(({ id }) => id === contributorId);
			openEditModal(contributor || null);
		},
		[contributors, openEditModal],
	);

	const handleMerge = useCallback(
		(contributorId: number): void => {
			const contributor = contributors.find(({ id }) => id === contributorId);
			openMergeModal(contributor || null);
		},
		[contributors, openMergeModal],
	);

	const handleContributorUpdateSubmit = useCallback(
		(payload: ContributorPatchRequestDto) => {
			if (contributorToEdit) {
				void dispatch(
					contributorActions.patch({ id: contributorToEdit.id, payload }),
				);
				openEditModal(null);
				onUpdateModalClose();
			}
		},
		[dispatch, contributorToEdit, openEditModal, onUpdateModalClose],
	);

	const handleContributorMergeSubmit = useCallback(
		(payload: ContributorMergeRequestDto) => {
			if (contributorToMerge) {
				void dispatch(
					contributorActions.merge({ id: contributorToMerge.id, payload }),
				);
				openMergeModal(null);
				onMergeModalClose();
			}
		},
		[contributorToMerge, dispatch, openMergeModal, onMergeModalClose],
	);

	const contributorsColumns = useMemo(
		() => getContributorColumns({ onEdit: handleEdit, onMerge: handleMerge }),
		[handleEdit, handleMerge],
	);

	const contributorsData: ContributorRow[] = getContributorRows(contributors);

	const isLoading =
		dataStatus === DataStatus.IDLE || dataStatus === DataStatus.PENDING;

	return (
		<PageLayout isLoading={isLoading}>
			<h1 className={styles["title"]}>Contributors</h1>
			<section className={styles["contributors-table"]}>
				<Table<ContributorRow>
					columns={contributorsColumns}
					data={contributorsData}
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
					<ContributorMergeForm
						allContributors={contributors}
						currentContributor={contributorToMerge}
						onSubmit={handleContributorMergeSubmit}
					/>
				</Modal>
			)}
		</PageLayout>
	);
};

export { Contributors };
