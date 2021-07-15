import { BuilderOutput, BuilderContext, createBuilder } from '@angular-devkit/architect';
import { JsonObject } from '@angular-devkit/core';
import { exec } from 'child_process';
import { promisify } from 'util';
import Listr from 'listr';

const execPromise = promisify(exec);

interface Options extends JsonObject {
  array_command: string[];
}

async function runCommand(
  input: Options,
  _context: BuilderContext
): Promise<BuilderOutput> {
  try {
    const list = new Listr(input.array_command.map(
      (command, i) => ({
        title: `Execute command ${i}: ${command}`,
        task: async () => await execPromise(command, {
          encoding: 'utf-8'
        })
      })
    ));
    await list.run();
    return {
      success: true,
      stdout: "All tasks complete!"
    };
  } catch (error) {
    return { error: error.toString(), success: false }
  }
}

export default createBuilder<Options>(runCommand);
