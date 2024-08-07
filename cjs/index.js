"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = exports.request = void 0;
const request_js_1 = __importDefault(require("./request.js"));
exports.request = request_js_1.default;
const parse_js_1 = __importDefault(require("./parse.js"));
exports.parse = parse_js_1.default;
const func_js_1 = __importDefault(require("./func.js"));
const hiroba = func_js_1.default;
exports.default = hiroba;
//# sourceMappingURL=index.js.map