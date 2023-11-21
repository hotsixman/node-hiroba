import checkLogin from "./checkLogin";
import createHeader from "./createHeader";
import HirobaError from "./hirobaError";
import axios from 'axios';
import { load } from 'cheerio';
export default async function getCardList(token) {
    let response;
    try {
        response = await axios({
            method: 'get',
            url: 'https://donderhiroba.jp/login_select.php',
            headers: createHeader(`_token_v2=${token}`)
        });
    }
    catch (err) {
        throw new HirobaError(err.message, 'CANNOT_CONNECT');
    }
    if (await checkLogin(response)) {
        let $ = load(response.data);
        let cardList = [];
        $('.cardSelect').each(function (index, element) {
            let cardData = {
                taikoNumber: Number($(element).find('div#mydon_area > div:nth-child(2) > p')?.text()?.replace('太鼓番: ', '')),
                nickname: $(element).find('div#mydon_area > div:nth-child(3)')?.text()?.replaceAll('\n', '')?.replaceAll('\t', ''),
                myDon: $(element).find('img')?.attr('src')
            };
            cardList.push(cardData);
        });
        return cardList;
    }
    else {
        throw new HirobaError('', 'NOT_LOGINED');
    }
}
