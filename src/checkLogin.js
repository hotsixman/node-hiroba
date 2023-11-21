"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = require("cheerio");
function checkLogin(response) {
    if (response?.data) {
        let $ = (0, cheerio_1.load)(response.data);
        if ($('form.login_form').length == 0) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}
exports.default = checkLogin;
