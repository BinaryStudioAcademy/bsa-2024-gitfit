import {
	Button,
	Loader,
	Modal,
	PageLayout,
} from "~/libs/components/components.js";
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

import { ProjectCard, ProjectCreateForm } from "./components/components.js";
import styles from "./styles.module.css";

const Projects = (): JSX.Element => {
	const dispatch = useAppDispatch();

	const { dataStatus, projects } = useAppSelector(({ projects }) => projects);

	useEffect(() => {
		void dispatch(projectActions.loadAll());
	}, [dispatch]);

	const { isModalOpened, onModalClose, onModalOpen } = useModal();

	const handleProjectCreateSubmit = useCallback(
		(payload: ProjectCreateRequestDto) => {
			void dispatch(projectActions.create(payload));
			onModalClose();
		},
		[dispatch, onModalClose],
	);

	const isLoading =
		dataStatus === DataStatus.PENDING || dataStatus === DataStatus.IDLE;

	return (
		<PageLayout>
			<header className={styles["projects-header"]}>
				<h1 className={styles["title"]}>Projects</h1>
				<Button label="Create New" onClick={onModalOpen} />
			</header>
			{isLoading ? (
				<div className={styles["projects-loader"]}>
					<Loader />
				</div>
			) : (
				<div className={styles["projects-list"]}>
					{projects.map((project) => (
						<ProjectCard key={project.id} project={project} />
					))}
				</div>
			)}
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
