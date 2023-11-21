import axios from 'axios';
import createHeader from './createHeader';
import HirobaError from './hirobaError';
import getCardList from './getCardList';
export default async function cardLogin(token, taikoNumber, cardList) {
    let list;
    if (cardList) {
        list = cardList;
    }
    else {
        list = await getCardList(token);
    }
    let matches = {
        matched: false,
        matchIndex: null,
        matchCard: null
    };
    list.forEach((e, i) => {
        if (e.taikoNumber === taikoNumber) {
            matches.matched = true;
            matches.matchIndex = i + 1;
            matches.matchCard = e;
        }
    });
    if (matches.matched) {
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
                    'id_pos': matches.matchIndex,
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
                throw new HirobaError(err.message, 'CANNOT_CONNECT');
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
            throw new HirobaError(err.message, 'CANNOT_CONNECT');
        }
        return matches.matchCard;
    }
    else {
        throw new HirobaError('', 'NO_MATCHED_CARD');
    }
}
