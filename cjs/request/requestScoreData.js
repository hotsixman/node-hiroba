"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hirobaError_js_1 = __importDefault(require("../hirobaError.js"));
const createHeader_js_1 = __importDefault(require("../createHeader.js"));
const axios_1 = __importDefault(require("axios"));
const checkLogin_js_1 = __importDefault(require("../parse/checkLogin.js"));
async function requestScoreData(token, songNos) {
    const returns = [];
    for (const songNo of songNos) {
        returns.push(await requestScoreDataBySongNo(token, songNo));
    }
    return returns;
}
exports.default = requestScoreData;
const difficulty = {
    1: 'easy',
    2: 'normal',
    3: 'hard',
    4: 'oni',
    5: 'ura'
};
async function requestScoreDataBySongNo(token, songNo) {
    let diffs = [1, 2, 3, 4, 5];
    const requestData = {
        songNo,
        body: {
            easy: null,
            normal: null,
            hard: null,
            oni: null,
            ura: null
        }
    };
    for (const diff of diffs) {
        let response;
        try {
            response = await (0, axios_1.default)({
                method: 'get',
                headers: token ? (0, createHeader_js_1.default)('_token_v2=' + token) : (0, createHeader_js_1.default)(),
                url: `https://donderhiroba.jp/score_detail.php?song_no=${songNo}&level=${diff}`
            });
            requestData.body[difficulty[diff]] = response.data;
        }
        catch (err) {
            console.warn(err.message);
            throw new hirobaError_js_1.default('CANNOT_CONNECT');
        }
        if (!(0, checkLogin_js_1.default)(response))
            throw new hirobaError_js_1.default('NOT_LOGINED');
    }
    return requestData;
}
//# sourceMappingURL=requestScoreData.js.map