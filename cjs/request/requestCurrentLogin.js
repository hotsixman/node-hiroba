"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const hirobaError_js_1 = __importDefault(require("../hirobaError.js"));
const createHeader_js_1 = __importDefault(require("../createHeader.js"));
const checkLogin_js_1 = __importDefault(require("../parse/checkLogin.js"));
async function requestCurrentLogin(token) {
    let response;
    try {
        response = await (0, axios_1.default)({
            method: 'get',
            url: 'https://donderhiroba.jp/',
            headers: token ? (0, createHeader_js_1.default)(`_token_v2=${token}`) : (0, createHeader_js_1.default)()
        });
    }
    catch (err) {
        console.warn(err.message);
        throw new hirobaError_js_1.default('CANNOT_CONNECT');
    }
    if (!(0, checkLogin_js_1.default)(response))
        throw new hirobaError_js_1.default('NOT_LOGINED');
    return response.data;
}
exports.default = requestCurrentLogin;
//# sourceMappingURL=requestCurrentLogin.js.map