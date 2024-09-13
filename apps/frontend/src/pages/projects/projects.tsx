import {
	Button,
	ConfirmationModal,
	Loader,
	Modal,
	PageLayout,
} from "~/libs/components/components.js";
import { EMPTY_LENGTH } from "~/libs/constants/constants.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useIntersectionObserver,
	useMemo,
	useModal,
	useSearch,
	useState,
} from "~/libs/hooks/hooks.js";
import {
	DEFAULT_PAGE,
	DEFAULT_PAGE_SIZE,
	actions as projectActions,
	type ProjectCreateRequestDto,
	type ProjectGetAllItemResponseDto,
	type ProjectPatchRequestDto,
} from "~/modules/projects/projects.js";

import {
	ProjectCard,
	ProjectCreateForm,
	ProjectsSearch,
	ProjectUpdateForm,
} from "./libs/components/components.js";
import { PAGE_INCREMENT } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

const Projects = (): JSX.Element => {
	const dispatch = useAppDispatch();

	const { onSearch, search } = useSearch();

	const [projectToModifyId, setProjectToModifyId] = useState<null | number>(
		null,
	);

	const {
		dataStatus,
		project,
		projectCreateStatus,
		projectPatchStatus,
		projects,
		projectStatus,
		projectsTotalCount,
	} = useAppSelector(({ projects }) => projects);

	const [currentPage, setCurrentPage] = useState<number>(DEFAULT_PAGE);
	const hasMoreProjects = useMemo(
		() => projects.length < projectsTotalCount,
		[projects, projectsTotalCount],
	);

	useEffect(() => {
		if (projectToModifyId) {
			void dispatch(projectActions.getById({ id: String(projectToModifyId) }));
		}
	}, [dispatch, projectToModifyId]);

	const loadMoreProjects = useCallback(() => {
		if (dataStatus !== DataStatus.PENDING) {
			const nextPage = currentPage + PAGE_INCREMENT;

			void dispatch(
				projectActions.loadMore({
					name: search,
					page: nextPage,
					pageSize: DEFAULT_PAGE_SIZE,
				}),
			);

			setCurrentPage(nextPage);
		}
	}, [dispatch, search, currentPage, dataStatus, setCurrentPage]);

	const sentinelReference = useIntersectionObserver<HTMLDivElement>({
		isDisabled: !hasMoreProjects || dataStatus === DataStatus.PENDING,
		onIntersect: loadMoreProjects,
	});

	useEffect(() => {
		void dispatch(projectActions.loadAll(search));
		setCurrentPage(DEFAULT_PAGE);
	}, [dispatch, search]);

	const handleSearchChange = useCallback(
		(value: string) => {
			void dispatch(projectActions.loadAll(value));
			onSearch(value);
			setCurrentPage(DEFAULT_PAGE);
		},
		[dispatch, onSearch],
	);

	const hasProject = projects.length !== EMPTY_LENGTH;

	const {
		isOpened: isCreateModalOpen,
		onClose: handleCreateModalClose,
		onOpen: handleCreateModalOpen,
	} = useModal();
	const {
		isOpened: isEditModalOpen,
		onClose: handleEditModalClose,
		onOpen: handleEditModalOpen,
	} = useModal();
	const {
		isOpened: isDeleteConfirmationModalOpen,
		onClose: handleDeleteConfirmationModalClose,
		onOpen: handleDeleteConfirmationModalOpen,
	} = useModal();

	useEffect(() => {
		if (projectCreateStatus === DataStatus.FULFILLED) {
			handleCreateModalClose();
		}
	}, [projectCreateStatus, handleCreateModalClose]);

	useEffect(() => {
		if (projectPatchStatus === DataStatus.FULFILLED) {
			handleEditModalClose();
		}
	}, [projectPatchStatus, handleEditModalClose]);

	const handleEditClick = useCallback(
		(project: ProjectGetAllItemResponseDto) => {
			setProjectToModifyId(project.id);
			handleEditModalOpen();
		},
		[handleEditModalOpen],
	);

	const handleDeleteClick = useCallback(
		(project: ProjectGetAllItemResponseDto) => {
			setProjectToModifyId(project.id);
			handleDeleteConfirmationModalOpen();
		},
		[handleDeleteConfirmationModalOpen],
	);
	const handleProjectCreateSubmit = useCallback(
		(payload: ProjectCreateRequestDto) => {
			void dispatch(projectActions.create(payload));
		},
		[dispatch],
	);

	const handleProjectEditSubmit = useCallback(
		(payload: ProjectPatchRequestDto) => {
			if (projectToModifyId) {
				void dispatch(projectActions.patch({ id: projectToModifyId, payload }));
				setProjectToModifyId(null);
			}
		},
		[dispatch, projectToModifyId],
	);

	const handleProjectDeleteConfirm = useCallback(() => {
		if (projectToModifyId) {
			void dispatch(projectActions.deleteById(projectToModifyId));
			handleDeleteConfirmationModalClose();
		}
	}, [dispatch, projectToModifyId, handleDeleteConfirmationModalClose]);

	const isLoading =
		dataStatus === DataStatus.IDLE ||
		(dataStatus === DataStatus.PENDING && !hasProject);

	const isLoadingMore = hasMoreProjects && dataStatus === DataStatus.PENDING;

	const isUpdateFormShown = project && projectStatus === DataStatus.FULFILLED;

	return (
		<PageLayout>
			<header className={styles["projects-header"]}>
				<h1 className={styles["title"]}>Projects</h1>
				<div>
					<Button label="Create New" onClick={handleCreateModalOpen} />
				</div>
			</header>
			<ProjectsSearch onChange={handleSearchChange} />
			{isLoading ? (
				<Loader />
			) : (
				<div className={styles["projects-list"]}>
					{hasProject ? (
						projects.map((project) => (
							<ProjectCard
								key={project.id}
								onDelete={handleDeleteClick}
								onEdit={handleEditClick}
								project={project}
							/>
						))
					) : (
						<p className={styles["empty-placeholder"]}>
							No projects found matching your search criteria. Please try
							different keywords.
						</p>
					)}

					<div ref={sentinelReference} />
					{isLoadingMore && <Loader />}
				</div>
			)}
			<Modal
				isOpened={isCreateModalOpen}
				onClose={handleCreateModalClose}
				title="Create new project"
			>
				<ProjectCreateForm onSubmit={handleProjectCreateSubmit} />
			</Modal>
			<Modal
				isOpened={isEditModalOpen}
				onClose={handleEditModalClose}
				title="Update project"
			>
				{isUpdateFormShown && (
					<ProjectUpdateForm
						onSubmit={handleProjectEditSubmit}
						project={project}
					/>
				)}
			</Modal>
			<ConfirmationModal
				content="The project will be deleted. This action cannot be undone. Click 'Confirm' to proceed."
				isOpened={isDeleteConfirmationModalOpen}
				onClose={handleDeleteConfirmationModalClose}
				onConfirm={handleProjectDeleteConfirm}
			/>
		</PageLayout>
	);
};

export { Projects };
