"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const requestCardList_js_1 = __importDefault(require("./request/requestCardList.js"));
const requestClearData_js_1 = __importDefault(require("./request/requestClearData.js"));
const requestCurrentLogin_js_1 = __importDefault(require("./request/requestCurrentLogin.js"));
const requestDaniData_js_1 = __importDefault(require("./request/requestDaniData.js"));
const requestScoreData_js_1 = __importDefault(require("./request/requestScoreData.js"));
const request = {
    requestCardList: requestCardList_js_1.default,
    requestClearData: requestClearData_js_1.default,
    requestCurrentLogin: requestCurrentLogin_js_1.default,
    requestDaniData: requestDaniData_js_1.default,
    requestScoreData: requestScoreData_js_1.default
};
exports.default = request;
//# sourceMappingURL=request.js.map