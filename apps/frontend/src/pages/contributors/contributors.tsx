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
	type ContributorPatchRequestDto,
} from "~/modules/contributors/contributors.js";

import { ContributorUpdateForm } from "./libs/components/components.js";
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

	const [contributorToEdit, setContributorToEdit] =
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

	const handleEdit = useCallback(
		(contributorId: number) => {
			const contributor = contributors.find(({ id }) => id === contributorId);
			openEditModal(contributor || null);
		},
		[contributors, openEditModal],
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

	const contributorsColumns = useMemo(
		() => getContributorColumns({ onEdit: handleEdit }),
		[handleEdit],
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
					isFullHeight
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
		</PageLayout>
	);
};

export { Contributors };
