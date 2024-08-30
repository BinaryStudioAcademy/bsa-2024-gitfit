import { Loader, PageLayout } from "~/libs/components/components.js";
import { isDataLoading } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { actions as projectActions } from "~/modules/projects/projects.js";

import { ProjectCard } from "./components/components.js";
import styles from "./styles.module.css";

const Projects = (): JSX.Element => {
	const dispatch = useAppDispatch();

	const { dataStatus, projects } = useAppSelector(({ projects }) => projects);

	useEffect(() => {
		void dispatch(projectActions.loadAll());
	}, [dispatch]);

	const isLoading = isDataLoading(dataStatus);

	return (
		<PageLayout>
			<h1 className={styles["label"]}>Projects</h1>
			{isLoading ? (
				<Loader />
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
