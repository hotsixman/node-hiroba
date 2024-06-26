"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createHeader_js_1 = __importDefault(require("../createHeader.js"));
const hirobaError_js_1 = __importDefault(require("../hirobaError.js"));
const axios_1 = __importDefault(require("axios"));
async function getSessionToken(email, password) {
    let response;
    try {
        const data = {
            client_id: 'nbgi_taiko',
            redirect_uri: 'https://www.bandainamcoid.com/v2/oauth2/auth?back=v3&client_id=nbgi_taiko&scope=JpGroupAll&redirect_uri=https%3A%2F%2Fdonderhiroba.jp%2Flogin_process.php%3Finvite_code%3D%26abs_back_url%3D%26location_code%3D&text=',
            customize_id: '',
            login_id: email,
            password: password,
            shortcut: 0,
            retention: 0,
            language: 'ko',
            cookie: '{"language":"ko"}',
            prompt: 'login',
        };
        response = await (0, axios_1.default)({
            method: 'post',
            url: 'https://account-api.bandainamcoid.com/v3/login/idpw',
            headers: (0, createHeader_js_1.default)(),
            data: data
        });
    }
    catch (err) {
        console.warn(err.message);
        throw new hirobaError_js_1.default('CANNOT_CONNECT');
    }
    try {
        let cookie = '';
        for (const key in response.data.cookie) {
            if (response.data.cookie[key]?.domain == '.bandainamcoid.com' && response.data.cookie[key]?.value !== undefined) {
                cookie += response.data.cookie[key].name + '=' + response.data.cookie[key].value + ';';
            }
        }
        await (0, axios_1.default)({
            method: 'get',
            url: response.data.redirect,
            headers: (0, createHeader_js_1.default)(cookie),
            maxRedirects: 0,
        });
    }
    catch (err) {
        if (err?.response == undefined) {
            console.warn(err?.message);
            throw new hirobaError_js_1.default('INVALID_ID_PASSWORD');
        }
        else if (err?.response?.status == 302) {
            response = err;
        }
        else {
            console.warn(err?.message);
            throw new hirobaError_js_1.default('CANNOT_CONNECT');
        }
    }
    try {
        await (0, axios_1.default)({
            method: 'get',
            url: response.response.headers.location,
            headers: (0, createHeader_js_1.default)(),
            maxRedirects: 0
        });
    }
    catch (err) {
        if (err?.response == undefined) {
            console.warn(err?.message);
            throw new hirobaError_js_1.default('INVALID_ID_PASSWORD');
        }
        else if (err?.response?.status == 302) {
            response = err;
        }
        else {
            throw new hirobaError_js_1.default('CANNOT_CONNECT');
        }
    }
    let token;
    try {
        response = await (0, axios_1.default)({
            method: 'get',
            url: response.response.headers.location,
            headers: (0, createHeader_js_1.default)(response.response.headers['set-cookie'][2].split(';')[0])
        });
        token = response.config.headers.cookie.replace('_token_v2=', '');
    }
    catch (err) {
        console.warn(err?.message);
        throw new hirobaError_js_1.default('CANNOT_CONNECT');
    }
    return token;
}
exports.default = getSessionToken;
//# sourceMappingURL=getSessionToken.js.map