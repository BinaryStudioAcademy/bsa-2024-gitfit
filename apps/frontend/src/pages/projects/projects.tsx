import {
	Button,
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
	useModal,
} from "~/libs/hooks/hooks.js";
import {
	actions as projectActions,
	type ProjectCreateRequestDto,
} from "~/modules/projects/projects.js";

import {
	ProjectCard,
	ProjectCreateForm,
	ProjectsSearch,
} from "./components/components.js";
import styles from "./styles.module.css";

const Projects = (): JSX.Element => {
	const dispatch = useAppDispatch();

	const { dataStatus, projectCreateStatus, projects } = useAppSelector(
		({ projects }) => projects,
	);

	useEffect(() => {
		void dispatch(projectActions.loadAll());
	}, [dispatch]);

	const handleSearchChange = useCallback(
		(value: string) => {
			void dispatch(projectActions.loadAll(value));
		},
		[dispatch],
	);

	const hasProject = projects.length === EMPTY_LENGTH;

	const { isModalOpened, onModalClose, onModalOpen } = useModal();

	useEffect(() => {
		if (projectCreateStatus === DataStatus.FULFILLED) {
			onModalClose();
		}
	}, [projectCreateStatus, onModalClose]);

	const handleProjectCreateSubmit = useCallback(
		(payload: ProjectCreateRequestDto) => {
			void dispatch(projectActions.create(payload));
		},
		[dispatch],
	);

	const isLoading =
		dataStatus === DataStatus.IDLE ||
		(dataStatus === DataStatus.PENDING && hasProject);

	return (
		<PageLayout>
			<header className={styles["projects-header"]}>
				<h1 className={styles["title"]}>Projects</h1>
				<Button label="Create New" onClick={onModalOpen} />
			</header>
			<ProjectsSearch onChange={handleSearchChange} />
			<div className={styles["projects-list"]}>
				{isLoading ? (
					<Loader />
				) : (
					projects.map((project) => (
						<ProjectCard key={project.id} project={project} />
					))
				)}
			</div>
			<Modal
				isModalOpened={isModalOpened}
				onModalClose={onModalClose}
				title="Create new project"
			>
				<ProjectCreateForm onSubmit={handleProjectCreateSubmit} />
			</Modal>
		</PageLayout>
	);
};

export { Projects };
