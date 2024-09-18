import { EMPTY_LENGTH } from "~/libs/constants/constants.js";
import { getDifferenceInDays } from "~/libs/helpers/helpers.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type NotificationService } from "~/modules/notifications/notification.service.js";
import { type ProjectService } from "~/modules/projects/project.service.js";
import { type UserService } from "~/modules/users/user.service.js";

import {
	NotificationDayThreshold,
	NotificationProjectPermissionKey,
	NotificationRootPermissionKey,
} from "./libs/enums/enums.js";

type Constructor = {
	logger: Logger;
	notificationService: NotificationService;
	projectService: ProjectService;
	userService: UserService;
};

class InactiveProjectsNotifier {
	private logger: Logger;
	private notificationService: NotificationService;
	private projectService: ProjectService;
	private userService: UserService;

	public constructor({
		logger,
		notificationService,
		projectService,
		userService,
	}: Constructor) {
		this.projectService = projectService;
		this.notificationService = notificationService;
		this.userService = userService;
		this.logger = logger;
	}

	private calculateInactiveDays(lastActivityDate: string): number {
		const lastActivity = new Date(lastActivityDate);
		const today = new Date();

		return getDifferenceInDays(today, lastActivity);
	}

	public async processInactiveProjects(): Promise<void> {
		const projects = await this.projectService.findInactiveProjects(
			NotificationDayThreshold.FIRST_THRESHOLD,
		);

		for (const project of projects) {
			if (!project.lastActivityDate) {
				continue;
			}

			const daysInactive = this.calculateInactiveDays(project.lastActivityDate);

			if (
				daysInactive === NotificationDayThreshold.FIRST_THRESHOLD ||
				daysInactive % NotificationDayThreshold.SECOND_THRESHOLD ===
					EMPTY_LENGTH
			) {
				const projectUsers =
					await this.userService.findAllWithProjectPermissions(
						[
							NotificationProjectPermissionKey.EDIT_PROJECT,
							NotificationProjectPermissionKey.VIEW_PROJECT,
							NotificationProjectPermissionKey.MANAGE_PROJECT,
						],
						project.id,
					);

				const rootUsers = await this.userService.findAllWithRootPermissions([
					NotificationRootPermissionKey.MANAGE_ALL_PROJECTS,
					NotificationRootPermissionKey.VIEW_ALL_PROJECTS,
				]);

				const users = [
					...projectUsers,
					...rootUsers.filter(
						(rootUser) =>
							!projectUsers.some(
								(projectUser) => projectUser.id === rootUser.id,
							),
					),
				];

				if (users.length > EMPTY_LENGTH) {
					const userIds = users.map((user) => user.id);

					await this.notificationService.bulkCreate({
						payload: `Statistics for ${project.name} is not uploaded for ${daysInactive.toString()} days.`,
						receiverUserIds: userIds,
					});

					this.logger.info(
						`Sent notifications to users for project ${project.name}.`,
					);
				}
			}
		}
	}
}

export { InactiveProjectsNotifier };
