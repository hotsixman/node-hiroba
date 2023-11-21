import axios from 'axios';
import { load } from 'cheerio';
import createHeader from './createHeader';
import HirobaError from './hirobaError';
import checkLogin from './checkLogin';
export default async function getCurrentLogin(token) {
    let response;
    try {
        response = await axios({
            method: 'get',
            url: 'https://donderhiroba.jp/',
            headers: createHeader(`_token_v2=${token}`)
        });
    }
    catch (err) {
        throw new HirobaError(err.message, 'CANNOT_CONNECT');
    }
    if (checkLogin(response)) {
        let $ = load(response.data);
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
        throw new HirobaError('', 'NOT_LOGINED');
    }
}
