"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parse_js_1 = __importDefault(require("../parse.js"));
const request_js_1 = __importDefault(require("../request.js"));
async function getClearData(token, genre) {
    const bodys = await request_js_1.default.requestClearData(token, genre);
    const clearDatas = parse_js_1.default.parseClearData(bodys);
    return clearDatas;
}
exports.default = getClearData;
//# sourceMappingURL=getClearData.js.map