import { GitEmailModel } from "./git-email.model.js";
import { GitEmailRepository } from "./git-email.repository.js";
import { GitEmailService } from "./git-email.service.js";

const gitEmailRepository = new GitEmailRepository(GitEmailModel);
const gitEmailService = new GitEmailService(gitEmailRepository);

export { GitEmailModel } from "./git-email.model.js";
export { GitEmailService } from "./git-email.service.js";
export { gitEmailService };
