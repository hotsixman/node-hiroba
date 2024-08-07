import HirobaError from "../hirobaError.js";
import getCurrentLogin from "./getCurrentLogin.js";
import axios from "axios";
import createHeader from "../createHeader.js";
import { load } from "cheerio";
export default async function updateScore(token) {
    if (!await getCurrentLogin(token))
        throw new HirobaError('NOT_LOGINED');
    let response;
    try {
        response = await axios(({
            method: 'get',
            url: 'https://donderhiroba.jp/score_list.php',
            headers: token ? createHeader('_token_v2=' + token) : createHeader()
        }));
    }
    catch (err) {
        console.warn(err.message);
        throw new HirobaError('CANNOT_CONNECT');
    }
    let $ = load(response.data);
    let tckt = $('#_tckt').val();
    let data = { '_tckt': tckt };
    try {
        response = await axios({
            method: 'get',
            url: 'https://donderhiroba.jp/ajax/update_score.php?_tckt=1&_=1690640091979',
            headers: {
                Accept: 'application/json, text/javascript, */*; q=0.01',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'ko,en;q=0.9,en-US;q=0.8',
                'Content-Length': '7',
                'Origin': 'https://donderhiroba.jp',
                Cookie: token ? ('_token_v2=' + token) : undefined,
                Referer: 'https://donderhiroba.jp/score_list.php',
                'X-Requested-With': 'XMLHttpRequest',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 Edg/115.0.1901.183'
            },
            data: data
        });
    }
    catch (err) {
        console.warn(err.message);
        throw new HirobaError('CANNOT_CONNECT');
    }
    if (response.data.result == 0) {
        await axios({
            method: 'get',
            url: 'https://donderhiroba.jp/score_list.php',
            headers: token ? createHeader('_token_v2=' + token) : createHeader()
        });
        return true;
    }
    else if (response.data.result == 705) {
        return await updateScore(token);
    }
    else if (response.data.result == 901) {
        throw new HirobaError('UNKNOWN_ERROR');
    }
    else {
        throw new HirobaError('UNKNOWN_ERROR');
    }
}
//# sourceMappingURL=updateScore.js.map