import {
	ContributorModel,
	ContributorRepository,
} from "~/modules/contributors/contributors.js";

import { GitEmailModel } from "./git-email.model.js";
import { GitEmailRepository } from "./git-email.repository.js";
import { GitEmailService } from "./git-email.service.js";

const contributorRepository = new ContributorRepository(ContributorModel);
const gitEmailRepository = new GitEmailRepository(GitEmailModel);
const gitEmailService = new GitEmailService(
	contributorRepository,
	gitEmailRepository,
);

export { GitEmailModel } from "./git-email.model.js";
export { GitEmailService } from "./git-email.service.js";
export { gitEmailService };
