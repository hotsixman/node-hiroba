"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_js_1 = __importDefault(require("../request.js"));
const parse_js_1 = __importDefault(require("../parse.js"));
async function getCardList(token) {
    const body = await request_js_1.default.requestCardList(token);
    return parse_js_1.default.parseCardList(body);
}
exports.default = getCardList;
//# sourceMappingURL=getCardList.js.map