"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = require("cheerio");
function isLogined(response) {
    if (!response?.data) {
        return false;
    }
    let $ = (0, cheerio_1.load)(response.data);
    if ($('form#login_form').length !== 0) {
        return false;
    }
    if ($('h1').html()?.trim() == 'カード登録 (1枚登録中)') {
        return false;
    }
    if (!response?.config?.url) {
        return false;
    }
    if (new URL(response.config.url).origin !== 'https://donderhiroba.jp') {
        return false;
    }
    return true;
}
exports.default = isLogined;
