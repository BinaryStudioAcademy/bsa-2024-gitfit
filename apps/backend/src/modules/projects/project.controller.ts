import { APIPath } from "~/libs/enums/enums.js";
import { BaseController } from "~/libs/modules/controller/controller.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { type ProjectService } from "./project.service.js";

class ProjectController extends BaseController {
	private projectService: ProjectService;

	public constructor(logger: Logger, projectService: ProjectService) {
		super(logger, APIPath.PROJECTS);

		this.projectService = projectService;
	}
}

export { ProjectController };
