"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkLogin_1 = require("./checkLogin");
const createHeader_1 = require("./createHeader");
const hirobaError_1 = require("./hirobaError");
const axios_1 = require("axios");
const cheerio_1 = require("cheerio");
async function getCardList(token) {
    let response;
    try {
        response = await (0, axios_1.default)({
            method: 'get',
            url: 'https://donderhiroba.jp/login_select.php',
            headers: (0, createHeader_1.default)(`_token_v2=${token}`)
        });
    }
    catch (err) {
        throw new hirobaError_1.default(err.message, 'CANNOT_CONNECT');
    }
    if (await (0, checkLogin_1.default)(response)) {
        let $ = (0, cheerio_1.load)(response.data);
        let cardList = [];
        $('.cardSelect').each(function (index, element) {
            let cardData = {
                taikoNumber: Number($(element).find('div#mydon_area > div:nth-child(2) > p')?.text()?.replace('太鼓番: ', '')),
                nickname: $(element).find('div#mydon_area > div:nth-child(3)')?.text()?.replaceAll('\n', '')?.replaceAll('\t', ''),
                myDon: $(element).find('img')?.attr('src')
            };
            cardList.push(cardData);
        });
        return cardList;
    }
    else {
        throw new hirobaError_1.default('', 'NOT_LOGINED');
    }
}
exports.default = getCardList;
