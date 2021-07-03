import { JsonObject } from '@angular-devkit/core';
interface Options extends JsonObject {
    array_command: string[];
}
declare const _default: import("@angular-devkit/architect/src/internal").Builder<Options & JsonObject>;
export default _default;
