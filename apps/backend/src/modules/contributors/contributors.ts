import { logger } from "~/libs/modules/logger/logger.js";

import { GitEmailModel } from "../git-emails/git-emails.js";
import { ContributorController } from "./contributor.controller.js";
import { ContributorModel } from "./contributor.model.js";
import { ContributorRepository } from "./contributor.repository.js";
import { ContributorService } from "./contributor.service.js";

const contributorRepository = new ContributorRepository(
	ContributorModel,
	GitEmailModel,
);
const contributorService = new ContributorService(contributorRepository);
const contributorController = new ContributorController(
	logger,
	contributorService,
);

export { ContributorModel } from "./contributor.model.js";
export { ContributorService } from "./contributor.service.js";
export { contributorController, contributorService };
