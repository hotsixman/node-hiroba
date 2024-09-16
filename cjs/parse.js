"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parseCardList_js_1 = __importDefault(require("./parse/parseCardList.js"));
const parseClearData_js_1 = __importDefault(require("./parse/parseClearData.js"));
const parseCurrentLogin_js_1 = __importDefault(require("./parse/parseCurrentLogin.js"));
const parseDaniData_js_1 = __importDefault(require("./parse/parseDaniData.js"));
const parseScoreData_js_1 = __importDefault(require("./parse/parseScoreData.js"));
const parseCompeDetail_js_1 = __importDefault(require("./parse/parseCompeDetail.js"));
const parseCompeRanking_js_1 = __importDefault(require("./parse/parseCompeRanking.js"));
const parse = {
    parseCardList: parseCardList_js_1.default,
    parseClearData: parseClearData_js_1.default,
    parseCompeDetail: parseCompeDetail_js_1.default,
    parseCompeRanking: parseCompeRanking_js_1.default,
    parseCurrentLogin: parseCurrentLogin_js_1.default,
    parseDaniData: parseDaniData_js_1.default,
    parseScoreData: parseScoreData_js_1.default
};
exports.default = parse;
//# sourceMappingURL=parse.js.map