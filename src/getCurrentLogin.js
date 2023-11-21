"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const cheerio_1 = require("cheerio");
const createHeader_1 = require("./createHeader");
const hirobaError_1 = require("./hirobaError");
const checkLogin_1 = require("./checkLogin");
async function getCurrentLogin(token) {
    let response;
    try {
        response = await (0, axios_1.default)({
            method: 'get',
            url: 'https://donderhiroba.jp/',
            headers: (0, createHeader_1.default)(`_token_v2=${token}`)
        });
    }
    catch (err) {
        throw new hirobaError_1.default(err.message, 'CANNOT_CONNECT');
    }
    if ((0, checkLogin_1.default)(response)) {
        let $ = (0, cheerio_1.load)(response.data);
        let mydonArea = $('div#mydon_area');
        let userDiv = $(mydonArea).children('div')[2];
        let nickname;
        {
            let nicknameDiv = $(mydonArea).find('div')[1];
            nickname = $(nicknameDiv).text().replaceAll('\n', '').replaceAll('\t', '');
        }
        let taikoNumber;
        {
            let detailDiv = $(userDiv).find('div.detail');
            let taikoNumberP = $(detailDiv).find('p')[1];
            taikoNumber = Number($(taikoNumberP).text().replace('太鼓番：', ''));
        }
        let myDon;
        {
            let mydonDiv = $(userDiv).find('div.mydon_image');
            let img = $(mydonDiv).find('img');
            myDon = img.attr()?.src;
        }
        let currentLogin = {
            nickname,
            taikoNumber,
            myDon
        };
        return currentLogin;
    }
    else {
        throw new hirobaError_1.default('', 'NOT_LOGINED');
    }
}
exports.default = getCurrentLogin;
