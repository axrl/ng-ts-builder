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
      (command, i) => <Listr.ListrTask>({
        title: `Execute command ${i}: ${command}`,
        task: async () => {
          try {
            const result = await execPromise(command, {
              encoding: 'utf-8'
            });
            if (result.stderr) {
              console.log(`stderr - ${result.stderr}`);
            };
          } catch (error) {
            console.log(error);
          };
        }
      })
    ));
    await list.run();
    return {
      success: true,
      stdout: "All tasks complete!"
    };
  } catch (error: any) {
    return { error: typeof error == 'string' ? error : JSON.stringify(error), success: false }
  }
}

export default createBuilder<Options>(runCommand);
