"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const architect_1 = require("@angular-devkit/architect");
const child_process_1 = require("child_process");
const util_1 = require("util");
const execPromise = util_1.promisify(child_process_1.exec);
function runCommand(input, _context) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            for (let i = 0; i < input.array_command.length; i += 1) {
                const command = input.array_command[i];
                console.log(`Execute command ${i}: ${command}`);
                const result = yield execPromise(command, {
                    encoding: 'utf-8'
                });
                console.log('Ok.\n' + result);
                _context.logger.info(result.stdout);
            }
            ;
            return {
                success: true,
                stdout: "All tasks complete!"
            };
        }
        catch (error) {
            return { error: error.toString(), success: false };
        }
    });
}
exports.default = architect_1.createBuilder(runCommand);
//# sourceMappingURL=index.js.map