"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const hirobaError_js_1 = __importDefault(require("../hirobaError.js"));
const createHeader_js_1 = __importDefault(require("../createHeader.js"));
const checkLogin_js_1 = __importDefault(require("../parse/checkLogin.js"));
async function requestDaniData(token, daniNo) {
    if (daniNo !== undefined) {
        return [await requestDaniDataByDaniNo(token, daniNo)];
    }
    else {
        const daniNos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
        const bodies = [];
        await Promise.all(daniNos.map(async (daniNo) => {
            bodies.push(await requestDaniDataByDaniNo(token, daniNo));
        }));
        return bodies;
    }
}
exports.default = requestDaniData;
async function requestDaniDataByDaniNo(token, daniNo) {
    let response;
    try {
        response = await (0, axios_1.default)({
            method: 'get',
            url: 'https://donderhiroba.jp/dan_detail.php?dan=' + daniNo,
            headers: (0, createHeader_js_1.default)('_token_v2=' + token)
        });
    }
    catch (err) {
        console.warn(err.message);
        throw new hirobaError_js_1.default('CANNOT_CONNECT');
    }
    if (!(0, checkLogin_js_1.default)(response))
        throw new hirobaError_js_1.default('NOT_LOGINED');
    return [response.data, daniNo];
}
//# sourceMappingURL=requestDaniData.js.map