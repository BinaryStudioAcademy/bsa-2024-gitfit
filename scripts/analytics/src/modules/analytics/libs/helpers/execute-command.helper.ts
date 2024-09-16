import { exec } from "node:child_process";
import { promisify } from "node:util";

const execAsync = promisify(exec);

async function executeCommand(
	command: string,
	options?: { cwd?: string },
): Promise<{ stderr: Buffer | string; stdout: Buffer | string }> {
	return await execAsync(command, options);
}

export { executeCommand };
