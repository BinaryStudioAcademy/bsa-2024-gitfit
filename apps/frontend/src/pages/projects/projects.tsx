import { Loader, PageLayout } from "~/libs/components/components.js";
import { EMPTY_ARRAY_LENGTH } from "~/libs/constants/constants.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { actions as projectActions } from "~/modules/projects/projects.js";

import { ProjectCard, ProjectsSearch } from "./components/components.js";
import styles from "./styles.module.css";

const Projects = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const { dataStatus, projects } = useAppSelector(({ projects }) => projects);

	useEffect(() => {
		void dispatch(projectActions.loadAll());
	}, [dispatch]);

	const handleSearchChange = useCallback(
		(value: string) => {
			void dispatch(projectActions.loadAll(value));
		},
		[dispatch],
	);

	const isLoading =
		dataStatus === DataStatus.IDLE ||
		(dataStatus === DataStatus.PENDING &&
			projects.length === EMPTY_ARRAY_LENGTH);

	return (
		<PageLayout>
			<h1 className={styles["label"]}>Projects</h1>
			<ProjectsSearch onChange={handleSearchChange} />
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
		</PageLayout>
	);
};

export { Projects };
