"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HirobaError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}
exports.default = HirobaError;
