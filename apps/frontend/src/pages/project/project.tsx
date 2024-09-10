import { Breadcrumbs, PageLayout } from "~/libs/components/components.js";
import { AppRoute, DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
	useParams,
} from "~/libs/hooks/hooks.js";
import {
	actions as projectActions,
	type ProjectGetAllItemResponseDto,
} from "~/modules/projects/projects.js";
import { NotFound } from "~/pages/not-found/not-found.jsx";

import { ProjectDetailsMenu } from "./components/project-details-menu/project-details-menu.js";
import styles from "./styles.module.css";

const Project = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const { id: projectId } = useParams<{ id: string }>();

	const { project, projectStatus } = useAppSelector(({ projects }) => ({
		project: projects.project,
		projectStatus: projects.projectStatus,
	}));

	useEffect(() => {
		if (projectId) {
			void dispatch(projectActions.getById({ id: projectId }));
		}
	}, [dispatch, projectId]);

	const isLoading =
		projectStatus === DataStatus.PENDING || projectStatus === DataStatus.IDLE;

	const isRejected = projectStatus === DataStatus.REJECTED;

	const hasProject = Boolean(project);

	if (isRejected) {
		return <NotFound />;
	}

	return (
		<PageLayout isLoading={isLoading}>
			<div className={styles["breadcrumb-container"]}>
				{hasProject && (
					<Breadcrumbs
						items={[
							{ href: AppRoute.ROOT, label: "Projects" },
							{ label: (project as ProjectGetAllItemResponseDto).name },
						]}
					/>
				)}
			</div>

			<div className={styles["project-layout"]}>
				<div className={styles["project-header"]}>
					<h1 className={styles["title"]}>{project?.name}</h1>
					{hasProject && (
						<ProjectDetailsMenu
							id={(project as ProjectGetAllItemResponseDto).id}
						/>
					)}
				</div>

				<div className={styles["project-description-layout"]}>
					<h3 className={styles["project-description-title"]}>Description</h3>
					<p className={styles["project-description"]}>
						{project?.description}
					</p>
				</div>
			</div>
		</PageLayout>
	);
};

export { Project };
