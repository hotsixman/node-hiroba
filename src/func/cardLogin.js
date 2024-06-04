import axios from 'axios';
import createHeader from '../createHeader.js';
import HirobaError from '../hirobaError.js';
import getCardList from './getCardList.js';
export default async function cardLogin(token, taikoNumber) {
    let list = await getCardList(token);
    let matchedCardIndex = list.findIndex(card => card.taikoNumber === taikoNumber);
    if (matchedCardIndex !== -1) {
        let response;
        try {
            await axios({
                method: 'post',
                url: 'https://donderhiroba.jp/login_select.php',
                headers: {
                    Accept: '*/*',
                    'Accept-Encoding': 'ko,en;q=0.9,en-US;q=0.8',
                    'Content-Length': '18',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    Cookie: '_token_v2=' + token,
                    Origin: 'https://donderhiroba.jp',
                    Referer: 'https://donderhiroba.jp/login_select.php',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 Edg/115.0.1901.183'
                },
                data: {
                    'id_pos': matchedCardIndex + 1,
                    'mode': 'exec'
                },
                maxRedirects: 0
            });
        }
        catch (err) {
            if (err?.response?.status == 302) {
                response = err.response;
            }
            else {
                console.warn(err.message);
                throw new HirobaError('CANNOT_CONNECT');
            }
        }
        try {
            await axios({
                method: 'get',
                url: response.headers.location,
                headers: createHeader('_token_v2=' + token)
            });
        }
        catch (err) {
            console.warn(err.message);
            throw new HirobaError('CANNOT_CONNECT');
        }
        return list[matchedCardIndex];
    }
    else {
        throw new HirobaError('NO_MATCHED_CARD');
    }
}
