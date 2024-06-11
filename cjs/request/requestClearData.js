"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const createHeader_js_1 = __importDefault(require("../createHeader.js"));
const hirobaError_js_1 = __importDefault(require("../hirobaError.js"));
const checkLogin_js_1 = __importDefault(require("../parse/checkLogin.js"));
async function requestClearData(token, genre) {
    if (genre) {
        try {
            const response = await (0, axios_1.default)({
                method: 'get',
                url: 'https://donderhiroba.jp/score_list.php?genre=' + genre,
                headers: (0, createHeader_js_1.default)('_token_v2=' + token)
            });
            if (!(0, checkLogin_js_1.default)(response))
                throw new hirobaError_js_1.default('NOT_LOGINED');
            return [response.data];
        }
        catch (err) {
            console.warn(err.message);
            throw new hirobaError_js_1.default('CANNOT_CONNECT');
        }
    }
    else {
        const genres = [1, 2, 3, 4, 5, 6, 7, 8];
        const responses = [];
        for (const genre of genres) {
            try {
                const response = await (0, axios_1.default)({
                    method: 'get',
                    url: 'https://donderhiroba.jp/score_list.php?genre=' + genre,
                    headers: (0, createHeader_js_1.default)('_token_v2=' + token)
                });
                if (!(0, checkLogin_js_1.default)(response))
                    throw new hirobaError_js_1.default('NOT_LOGINED');
                responses.push(response.data);
            }
            catch (err) {
                console.warn(err.message);
                throw new hirobaError_js_1.default('CANNOT_CONNECT');
            }
        }
        return responses;
    }
}
exports.default = requestClearData;
//# sourceMappingURL=requestClearData.js.map