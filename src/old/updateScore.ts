import createHeader from "./createHeader";
import HirobaError from "./hirobaError";
import axios from 'axios';
import { load } from 'cheerio';
import getCurrentLogin from "./getCurrentLogin";
import { CardData } from "./types/cardData";

export default async function updateScore(token:string):Promise<CardData>{
    let currentLogin = await getCurrentLogin(token);//여기서 로그인 검사 함

    //첫번째 요청
    let response;
    try{
        response = await axios(({
            method: 'get',
            url: 'https://donderhiroba.jp/score_list.php',
            headers: createHeader('_token_v2=' + token)
        }));
    }
    catch(err:any){
        throw new HirobaError(err.message, 'CANNOT_CONNECT');
    }

    //tckt값 얻기
    let $ = load(response.data);
    let tckt = $('#_tckt').val();
    let data = { '_tckt': '1' };

    //두번째 요청
    try{
        response = await axios({
            method: 'get',
            url: 'https://donderhiroba.jp/ajax/update_score.php?_tckt=1&_=1690640091979',
            headers: {
                Accept: 'application/json, text/javascript, */*; q=0.01',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'ko,en;q=0.9,en-US;q=0.8',
                'Content-Length': '7',
                'Origin': 'https://donderhiroba.jp',
                Cookie: '_token_v2=' + token,
                Referer: 'https://donderhiroba.jp/score_list.php',
                'X-Requested-With': 'XMLHttpRequest',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 Edg/115.0.1901.183'
            },
            data: data
        })
    }
    catch(err:any){
        throw new HirobaError(err.message, 'CANNOT_CONNECT');
    }

    if (response.data.result == 0) {
        await axios({
            method: 'get',
            url: 'https://donderhiroba.jp/score_list.php',
            headers: createHeader('_token_v2=' + token)
        })
        return currentLogin;
    }
    else if (response.data.result == 705) {
        return await updateScore(token);
    }
    else if (response.data.result == 901) {
        throw new HirobaError('', 'UNKNOWN_ERROR')
    }
    else {
        throw new HirobaError('', 'UNKNOWN_ERROR')
    }
}