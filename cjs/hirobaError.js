"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HirobaError extends Error {
    code;
    constructor(code) {
        super(code);
        this.code = code;
    }
}
exports.default = HirobaError;
//# sourceMappingURL=hirobaError.js.map