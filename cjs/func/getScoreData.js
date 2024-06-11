"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_js_1 = __importDefault(require("../request.js"));
const parse_js_1 = __importDefault(require("../parse.js"));
async function getScoreData(token, songNos) {
    const responses = await request_js_1.default.requestScoreData(token, songNos);
    const parsed = responses.map(response => {
        return parse_js_1.default.parseScoreData(response);
    });
    return parsed.filter(e => e !== null);
}
exports.default = getScoreData;
//# sourceMappingURL=getScoreData.js.map