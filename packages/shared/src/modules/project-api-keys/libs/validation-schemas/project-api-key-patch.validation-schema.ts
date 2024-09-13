import { z } from "zod";

import { type ProjectApiKeyPatchRequestDto } from "../types/types.js";

const projectApiKeyPatch: z.ZodType<ProjectApiKeyPatchRequestDto> = z
	.object({
		projectId: z.number().int().positive(),
	})
	.required();

export { projectApiKeyPatch };
