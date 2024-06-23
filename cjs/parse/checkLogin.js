"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = require("cheerio");
function checkLogin(response) {
    if (!response?.data) {
        return false;
    }
    let $ = (0, cheerio_1.load)(response.data);
    if ($('form#login_form').length !== 0) {
        return false;
    }
    if ($('h1').html()?.trim() && /^カード登録 \([0-9]枚登録中\)$/.test($('h1').html()?.trim())) {
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
exports.default = checkLogin;
//# sourceMappingURL=checkLogin.js.map