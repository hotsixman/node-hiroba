"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parse_js_1 = __importDefault(require("../parse.js"));
const request_js_1 = __importDefault(require("../request.js"));
async function getDaniData(token, daniNo) {
    const bodies = await request_js_1.default.requestDaniData(token, daniNo);
    return parse_js_1.default.parseDaniData(bodies);
}
exports.default = getDaniData;
//# sourceMappingURL=getDaniData.js.map