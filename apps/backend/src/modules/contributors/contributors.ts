import { ContributorModel } from "./contributor.model.js";
import { ContributorRepository } from "./contributor.repository.js";
import { ContributorService } from "./contributors.service.js";

const contributorRepository = new ContributorRepository(ContributorModel);
const contributorService = new ContributorService(contributorRepository);

export { ContributorModel } from "./contributor.model.js";
export { ContributorRepository } from "./contributor.repository.js";
export { ContributorService } from "./contributors.service.js";
export { contributorService };
