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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const architect_1 = require("@angular-devkit/architect");
const child_process_1 = require("child_process");
const util_1 = require("util");
const listr_1 = __importDefault(require("listr"));
const execPromise = (0, util_1.promisify)(child_process_1.exec);
function runCommand(input, _context) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const list = new listr_1.default(input.array_command.map((command, i) => ({
                title: `Execute command ${i}: ${command}`,
                task: () => __awaiter(this, void 0, void 0, function* () {
                    try {
                        const result = yield execPromise(command, {
                            encoding: 'utf-8'
                        });
                        if (result.stderr) {
                            console.log(`stderr - ${result.stderr}`);
                        }
                        ;
                    }
                    catch (error) {
                        console.log(error);
                    }
                    ;
                })
            })));
            yield list.run();
            return {
                success: true,
                stdout: "All tasks complete!"
            };
        }
        catch (error) {
            return { error: typeof error == 'string' ? error : JSON.stringify(error), success: false };
        }
    });
}
exports.default = (0, architect_1.createBuilder)(runCommand);
//# sourceMappingURL=index.js.map