import { z } from "zod";

import { type ProjectApiKeyCreateRequestDto } from "../types/types.js";

const projectApiKeyCreate: z.ZodType<ProjectApiKeyCreateRequestDto> = z
	.object({
		projectId: z.number().int().positive(),
	})
	.required();

export { projectApiKeyCreate };
