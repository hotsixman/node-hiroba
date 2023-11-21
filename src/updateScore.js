"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createHeader_1 = require("./createHeader");
const hirobaError_1 = require("./hirobaError");
const axios_1 = require("axios");
const cheerio_1 = require("cheerio");
const getCurrentLogin_1 = require("./getCurrentLogin");
async function updateScore(token) {
    let currentLogin = await (0, getCurrentLogin_1.default)(token);
    let response;
    try {
        response = await (0, axios_1.default)(({
            method: 'get',
            url: 'https://donderhiroba.jp/score_list.php',
            headers: (0, createHeader_1.default)('_token_v2=' + token)
        }));
    }
    catch (err) {
        throw new hirobaError_1.default(err.message, 'CANNOT_CONNECT');
    }
    let $ = (0, cheerio_1.load)(response.data);
    let tckt = $('#_tckt').val();
    let data = { '_tckt': '1' };
    try {
        response = await (0, axios_1.default)({
            method: 'get',
            url: 'https://donderhiroba.jp/ajax/update_score.php?_tckt=1&_=1690640091979',
            headers: {
                Accept: 'application/json, text/javascript, */*; q=0.01',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'ko,en;q=0.9,en-US;q=0.8',
                'Content-Length': '7',
                'Origin': 'https://donderhiroba.jp',
                Cookie: '_token_v2=' + token,
                Referer: 'https://donderhiroba.jp/score_list.php',
                'X-Requested-With': 'XMLHttpRequest',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 Edg/115.0.1901.183'
            },
            data: data
        });
    }
    catch (err) {
        throw new hirobaError_1.default(err.message, 'CANNOT_CONNECT');
    }
    if (response.data.result == 0) {
        await (0, axios_1.default)({
            method: 'get',
            url: 'https://donderhiroba.jp/score_list.php',
            headers: (0, createHeader_1.default)('_token_v2=' + token)
        });
        return currentLogin;
    }
    else if (response.data.result == 705) {
        return await updateScore(token);
    }
    else if (response.data.result == 901) {
        throw new hirobaError_1.default('', 'UNKNOWN_ERROR');
    }
    else {
        throw new hirobaError_1.default('', 'UNKNOWN_ERROR');
    }
}
exports.default = updateScore;
