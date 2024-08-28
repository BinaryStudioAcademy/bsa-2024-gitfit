import { type ProjectFindRequestDto } from "@git-fit/shared";
import { useParams } from "react-router-dom";

import { Loader } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { getById } from "~/modules/projects/slices/actions.js";
import { NotFound } from "~/pages/not-found/not-found.jsx";

import styles from "./styles.module.css";

const Project = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const { id: projectId } = useParams<ProjectFindRequestDto>();

	const { dataStatus, project } = useAppSelector(({ projects }) => ({
		dataStatus: projects.dataStatus,
		project: projects.project,
	}));

	useEffect(() => {
		if (projectId) {
			void dispatch(getById({ id: projectId }));
		}
	}, [dispatch, projectId]);

	const isLoading =
		dataStatus === DataStatus.PENDING || dataStatus === DataStatus.IDLE;

	if (!project) {
		return <NotFound />;
	}

	return (
		<>
			{isLoading ? (
				<div className={styles["projects-loader"]}>
					<Loader />
				</div>
			) : (
				<>
					<h1 className={styles["project-name"]}>{project.name}</h1>
					<h3 className={styles["project-description-title"]}>Description</h3>
					<p className={styles["project-description"]}>{project.description}</p>
				</>
			)}
		</>
	);
};

export { Project };
