"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createHeader_js_1 = __importDefault(require("../createHeader.js"));
const hirobaError_js_1 = __importDefault(require("../hirobaError.js"));
const axios_1 = __importDefault(require("axios"));
const checkNamcoLogin_js_1 = __importDefault(require("../parse/checkNamcoLogin.js"));
async function requestCardList(token) {
    let response;
    try {
        response = await (0, axios_1.default)({
            method: 'get',
            url: 'https://donderhiroba.jp/login_select.php',
            headers: (0, createHeader_js_1.default)(`_token_v2=${token}`)
        });
    }
    catch (err) {
        console.warn(err.message);
        throw new hirobaError_js_1.default('CANNOT_CONNECT');
    }
    if (!(0, checkNamcoLogin_js_1.default)(response))
        throw new hirobaError_js_1.default('NOT_NAMCO_LOGINED');
    return response.data;
}
exports.default = requestCardList;
//# sourceMappingURL=requestCardList.js.map