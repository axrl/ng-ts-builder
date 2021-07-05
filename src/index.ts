import { BuilderOutput,BuilderContext, createBuilder } from '@angular-devkit/architect';
import { JsonObject } from '@angular-devkit/core';
import { exec } from 'child_process';
import { promisify } from 'util';
const execPromise = promisify(exec);

interface Options extends JsonObject {
  array_command: string[];
}

async function runCommand(
  input: Options,
  _context: BuilderContext
): Promise<BuilderOutput> {
  try {
    for (let i = 0; i < input.array_command.length; i += 1) {
      const command = input.array_command[i];
      console.log(`Execute command ${i}: ${command}`);
      const result = await execPromise(command, {
        encoding: 'utf-8'
      });
      console.log('Ok.\n' + result);
      _context.logger.info(result.stdout);
    };
    return {
      success: true,
      stdout: "All tasks complete!"
    };
  } catch (error) {
    return { error: error.toString(), success: false }
  }
}

export default createBuilder<Options>(runCommand);


