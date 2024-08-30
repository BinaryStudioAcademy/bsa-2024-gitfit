import { useParams } from "react-router-dom";

import { Loader, PageLayout } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { actions as projectActions } from "~/modules/projects/projects.js";
import { NotFound } from "~/pages/not-found/not-found.jsx";

import styles from "./styles.module.css";

const Project = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const { id: projectId } = useParams<{ id: string }>();

	const { dataStatus, project } = useAppSelector(({ projects }) => ({
		dataStatus: projects.dataStatus,
		project: projects.project,
	}));

	useEffect(() => {
		if (projectId) {
			void dispatch(projectActions.getById({ id: projectId }));
		}
	}, [dispatch, projectId]);

	const isLoading =
		dataStatus === DataStatus.PENDING || dataStatus === DataStatus.IDLE;

	const isRejected = dataStatus === DataStatus.REJECTED;

	if (isRejected) {
		return <NotFound />;
	}

	return (
		<>
			<PageLayout>
				{isLoading ? (
					<Loader />
				) : (
					<div className={styles["project-layout"]}>
						<h1 className={styles["project-name"]}>{project?.name}</h1>
						<div className={styles["project-description-layout"]}>
							<h3 className={styles["project-description-title"]}>
								Description
							</h3>
							<p className={styles["project-description"]}>
								{project?.description}
							</p>
						</div>
					</div>
				)}
			</PageLayout>
		</>
	);
};

export { Project };
