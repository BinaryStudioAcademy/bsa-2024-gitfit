import { EMPTY_LENGTH } from "~/libs/constants/constants.js";
import {
	ExceptionMessage,
	PermissionKey,
	ProjectPermissionKey,
} from "~/libs/enums/enums.js";
import { getDifferenceInDays } from "~/libs/helpers/helpers.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type Service } from "~/libs/types/types.js";
import { type ProjectApiKeyService } from "~/modules/project-api-keys/project-api-key.service.js";
import { type ProjectGroupService } from "~/modules/project-groups/project-groups.js";

import { type NotificationService } from "../notifications/notification.service.js";
import { type UserService } from "../users/user.service.js";
import { NOTIFICATION_DAY_THRESHOLD } from "./libs/constants/constants.js";
import { ProjectError } from "./libs/exceptions/exceptions.js";
import {
	type ProjectCreateRequestDto,
	type ProjectGetAllItemResponseDto,
	type ProjectGetAllRequestDto,
	type ProjectGetAllResponseDto,
	type ProjectGetByIdResponseDto,
	type ProjectPatchRequestDto,
	type ProjectPatchResponseDto,
} from "./libs/types/types.js";
import { ProjectEntity } from "./project.entity.js";
import { type ProjectRepository } from "./project.repository.js";

type Constructor = {
	logger: Logger;
	notificationService: NotificationService;
	projectApiKeyService: ProjectApiKeyService;
	projectGroupService: ProjectGroupService;
	projectRepository: ProjectRepository;
	userService: UserService;
};

class ProjectService implements Service {
	private logger: Logger;

	private notificationService: NotificationService;

	private projectApiKeyService: ProjectApiKeyService;

	private projectGroupService: ProjectGroupService;

	private projectRepository: ProjectRepository;

	private userService: UserService;

	public constructor({
		logger,
		notificationService,
		projectApiKeyService,
		projectGroupService,
		projectRepository,
		userService,
	}: Constructor) {
		this.logger = logger;
		this.notificationService = notificationService;
		this.userService = userService;
		this.projectGroupService = projectGroupService;
		this.projectRepository = projectRepository;
		this.projectApiKeyService = projectApiKeyService;
	}

	public async create(
		payload: ProjectCreateRequestDto,
	): Promise<ProjectGetAllItemResponseDto> {
		const { description, name } = payload;
		const existingProject = await this.projectRepository.findByName(name);

		if (existingProject) {
			throw new ProjectError({
				message: ExceptionMessage.PROJECT_NAME_USED,
				status: HTTPCode.CONFLICT,
			});
		}

		const item = await this.projectRepository.create(
			ProjectEntity.initializeNew({
				description,
				name,
			}),
		);

		return item.toObject();
	}

	public async delete(id: number): Promise<boolean> {
		await this.projectGroupService.deleteByProjectId(id);

		const isDeleted = await this.projectRepository.delete(id);

		if (!isDeleted) {
			throw new ProjectError({
				message: ExceptionMessage.PROJECT_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return isDeleted;
	}

	public async find(id: number): Promise<ProjectGetByIdResponseDto> {
		const item = await this.projectRepository.find(id);

		if (!item) {
			throw new ProjectError({
				message: ExceptionMessage.PROJECT_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const project = item.toObject();

		const projectApiKey = await this.projectApiKeyService.findByProjectId(
			project.id,
		);

		const apiKey = projectApiKey ? projectApiKey.apiKey : null;

		return {
			...project,
			apiKey,
		};
	}

	public async findAll({
		hasRootPermission,
		parameters,
		userProjectIds,
	}: {
		hasRootPermission: boolean;
		parameters: ProjectGetAllRequestDto;
		userProjectIds: number[];
	}): Promise<ProjectGetAllResponseDto> {
		const projects = hasRootPermission
			? await this.projectRepository.findAll({
					...parameters,
					userProjectIds: [],
				})
			: await this.projectRepository.findAll({
					...parameters,
					userProjectIds,
				});

		const { items, totalItems } = projects;

		return {
			items: items.map((item) => {
				const { id, lastActivityDate, name } = item.toObject();

				return { id, lastActivityDate, name };
			}),
			totalItems,
		};
	}

	public async findAllWithoutPagination({
		userProjectIds,
	}: {
		userProjectIds?: number[];
	}): Promise<ProjectGetAllItemResponseDto[]> {
		const projects =
			userProjectIds && userProjectIds.length !== EMPTY_LENGTH
				? await this.projectRepository.findAllWithoutPagination({
						userProjectIds,
					})
				: await this.projectRepository.findAllWithoutPagination({
						userProjectIds: [],
					});

		return projects.map((project) => project.toObject());
	}

	public async findInactiveProjects(
		thresholdInDays: number,
	): Promise<ProjectGetAllItemResponseDto[]> {
		const projects =
			await this.projectRepository.findInactiveProjects(thresholdInDays);

		return projects.map((project) => {
			const { id, lastActivityDate, name } = project.toObject();

			return { id, lastActivityDate, name };
		});
	}

	public async patch(
		id: number,
		projectData: ProjectPatchRequestDto,
	): Promise<ProjectPatchResponseDto> {
		const targetProject = await this.projectRepository.find(id);

		if (!targetProject) {
			throw new ProjectError({
				message: ExceptionMessage.PROJECT_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const existingProject = await this.projectRepository.findByName(
			projectData.name,
		);

		if (existingProject && existingProject.toObject().id !== id) {
			throw new ProjectError({
				message: ExceptionMessage.PROJECT_NAME_USED,
				status: HTTPCode.CONFLICT,
			});
		}

		const updatedItem = await this.projectRepository.patch(id, projectData);

		const project = updatedItem.toObject();

		const projectApiKey = await this.projectApiKeyService.findByProjectId(
			project.id,
		);

		const apiKey = projectApiKey ? projectApiKey.apiKey : null;

		return {
			...project,
			apiKey,
		};
	}

	public async processInactiveProjects(): Promise<void> {
		const [firstThreshold, secondThreshold] = NOTIFICATION_DAY_THRESHOLD;
		const projects = await this.findInactiveProjects(firstThreshold);

		for (const project of projects) {
			const daysInactive = getDifferenceInDays(
				new Date(),
				new Date(project.lastActivityDate as string),
			);

			if (
				daysInactive === firstThreshold ||
				daysInactive % secondThreshold === EMPTY_LENGTH
			) {
				const projectUsers =
					await this.userService.findAllWithProjectPermissions(
						[
							ProjectPermissionKey.EDIT_PROJECT,
							ProjectPermissionKey.VIEW_PROJECT,
							ProjectPermissionKey.MANAGE_PROJECT,
						],
						project.id,
					);

				const rootUsers = await this.userService.findAllWithRootPermissions([
					PermissionKey.MANAGE_ALL_PROJECTS,
					PermissionKey.VIEW_ALL_PROJECTS,
				]);

				const filteredRootUsers = rootUsers.filter(
					(rootUser) =>
						!projectUsers.some((projectUser) => projectUser.id === rootUser.id),
				);

				const users = [...projectUsers, ...filteredRootUsers];

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

	public update(): ReturnType<Service["update"]> {
		return Promise.resolve(null);
	}

	public async updateLastActivityDate(
		projectId: number,
		lastActivityDate: string,
	): Promise<void> {
		await this.projectRepository.updateLastActivityDate(
			projectId,
			lastActivityDate,
		);
	}
}

export { ProjectService };
