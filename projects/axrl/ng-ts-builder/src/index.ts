import {
  BuilderContext,
  BuilderOutput,
  createBuilder
} from '@angular-devkit/architect';
import { Schema } from './schema';
import { exec } from 'child_process';
import { promisify } from 'util';
const execPromise = promisify(exec);

export async function runCommand(
  input: Schema,
  _context: BuilderContext
): Promise<BuilderOutput> {
  const results: string[] = [];
  try {
    for (let i = 0; i < input.commands.length; i += 1) {
      const command = input.commands[i];
      const result = await execPromise(command, {
        encoding: 'utf-8'
      });
      _context.logger.info(result.stdout);
      results.push(result.stdout);
    };
    return {
      success: true,
      stdout: results.join('\n')
    };
  } catch (error) {
    return { error: error.toString(), success: false }
  }
}

export const CommandBuilder = createBuilder(runCommand);

export default CommandBuilder;