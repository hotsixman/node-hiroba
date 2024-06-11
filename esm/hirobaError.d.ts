import { HirobaErrorCode } from "./types/errorCodes.js";
export default class HirobaError extends Error {
    code: string;
    constructor(code: HirobaErrorCode);
}
//# sourceMappingURL=hirobaError.d.ts.map