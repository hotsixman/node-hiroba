import createHeader from "../createHeader.js";
import HirobaError from "../hirobaError.js";
import axios from 'axios';
export default async function getSessionToken(email, password) {
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
        response = await axios({
            method: 'post',
            url: 'https://account-api.bandainamcoid.com/v3/login/idpw',
            headers: createHeader(),
            data: data
        });
    }
    catch (err) {
        console.warn(err.message);
        throw new HirobaError('CANNOT_CONNECT');
    }
    try {
        let cookie = '';
        for (const key in response.data.cookie) {
            if (response.data.cookie[key]?.domain == '.bandainamcoid.com' && response.data.cookie[key]?.value !== undefined) {
                cookie += response.data.cookie[key].name + '=' + response.data.cookie[key].value + ';';
            }
        }
        await axios({
            method: 'get',
            url: response.data.redirect,
            headers: createHeader(cookie),
            maxRedirects: 0,
        });
    }
    catch (err) {
        if (err?.response == undefined) {
            console.warn(err?.message);
            throw new HirobaError('INVALID_ID_PASSWORD');
        }
        else if (err?.response?.status == 302) {
            response = err;
        }
        else {
            console.warn(err?.message);
            throw new HirobaError('CANNOT_CONNECT');
        }
    }
    try {
        await axios({
            method: 'get',
            url: response.response.headers.location,
            headers: createHeader(),
            maxRedirects: 0
        });
    }
    catch (err) {
        if (err?.response == undefined) {
            console.warn(err?.message);
            throw new HirobaError('INVALID_ID_PASSWORD');
        }
        else if (err?.response?.status == 302) {
            response = err;
        }
        else {
            throw new HirobaError('CANNOT_CONNECT');
        }
    }
    let token;
    try {
        response = await axios({
            method: 'get',
            url: response.response.headers.location,
            headers: createHeader(response.response.headers['set-cookie'][2].split(';')[0])
        });
        token = response.config.headers.cookie.replace('_token_v2=', '');
    }
    catch (err) {
        console.warn(err?.message);
        throw new HirobaError('CANNOT_CONNECT');
    }
    return token;
}
