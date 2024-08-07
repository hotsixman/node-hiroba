"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const createHeader_js_1 = __importDefault(require("../createHeader.js"));
const hirobaError_js_1 = __importDefault(require("../hirobaError.js"));
const getCardList_js_1 = __importDefault(require("./getCardList.js"));
async function cardLogin(token, taikoNumber) {
    let list = await (0, getCardList_js_1.default)(token);
    let matchedCardIndex = list.findIndex(card => card.taikoNumber === taikoNumber);
    if (matchedCardIndex !== -1) {
        let response;
        try {
            await (0, axios_1.default)({
                method: 'post',
                url: 'https://donderhiroba.jp/login_select.php',
                headers: {
                    Accept: '*/*',
                    'Accept-Encoding': 'ko,en;q=0.9,en-US;q=0.8',
                    'Content-Length': '18',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    Cookie: token ? ('_token_v2=' + token) : undefined,
                    Origin: 'https://donderhiroba.jp',
                    Referer: 'https://donderhiroba.jp/login_select.php',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 Edg/115.0.1901.183'
                },
                data: {
                    'id_pos': matchedCardIndex + 1,
                    'mode': 'exec'
                },
                maxRedirects: 0
            });
        }
        catch (err) {
            if (err?.response?.status == 302) {
                response = err.response;
            }
            else {
                console.warn(err.message);
                throw new hirobaError_js_1.default('CANNOT_CONNECT');
            }
        }
        try {
            await (0, axios_1.default)({
                method: 'get',
                url: response.headers.location,
                headers: token ? (0, createHeader_js_1.default)('_token_v2=' + token) : (0, createHeader_js_1.default)()
            });
        }
        catch (err) {
            console.warn(err.message);
            throw new hirobaError_js_1.default('CANNOT_CONNECT');
        }
        return list[matchedCardIndex];
    }
    else {
        throw new hirobaError_js_1.default('NO_MATCHED_CARD');
    }
}
exports.default = cardLogin;
//# sourceMappingURL=cardLogin.js.map