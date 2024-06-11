"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_js_1 = __importDefault(require("../request.js"));
const parse_js_1 = __importDefault(require("../parse.js"));
async function getCurrentLogin(token) {
    const body = await request_js_1.default.requestCurrentLogin(token);
    return parse_js_1.default.parseCurrentLogin(body);
}
exports.default = getCurrentLogin;
//# sourceMappingURL=getCurrentLogin.js.map