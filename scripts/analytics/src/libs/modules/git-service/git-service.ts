import { BaseGITService } from "./base-git-service.module.js";

const gitService = new BaseGITService();

export { type GITService } from "./libs/types/types.js";
export { gitService };
