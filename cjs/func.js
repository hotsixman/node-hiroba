"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getCardList_js_1 = __importDefault(require("./func/getCardList.js"));
const getClearData_js_1 = __importDefault(require("./func/getClearData.js"));
const getSessionToken_js_1 = __importDefault(require("./func/getSessionToken.js"));
const cardLogin_js_1 = __importDefault(require("./func/cardLogin.js"));
const getCurrentLogin_js_1 = __importDefault(require("./func/getCurrentLogin.js"));
const getDaniData_js_1 = __importDefault(require("./func/getDaniData.js"));
const getScoreData_js_1 = __importDefault(require("./func/getScoreData.js"));
const updateScore_js_1 = __importDefault(require("./func/updateScore.js"));
const func = {
    getCardList: getCardList_js_1.default,
    getClearData: getClearData_js_1.default,
    getSessionToken: getSessionToken_js_1.default,
    cardLogin: cardLogin_js_1.default,
    getCurrentLogin: getCurrentLogin_js_1.default,
    getDaniData: getDaniData_js_1.default,
    getScoreData: getScoreData_js_1.default,
    updateScore: updateScore_js_1.default
};
exports.default = func;
//# sourceMappingURL=func.js.map