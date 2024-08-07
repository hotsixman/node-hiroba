import createHeader from "../createHeader.js";
import HirobaError from "../hirobaError.js";
import axios from 'axios';
import checkNamcoLogin from "../parse/checkNamcoLogin.js";

/**
 * 
 * @param {string} token
 * @returns card datas
 * You should 'Card Login' after use this function. If not, the token will be expired
 */
export default async function requestCardList(token: string | null): Promise<string> {
    let response;
    try {//login_select로 요청 보내기
        response = await axios({
            method: 'get',
            url: 'https://donderhiroba.jp/login_select.php',
            headers: token ? createHeader(`_token_v2=${token}`) : createHeader()
        });
    }
    catch (err: any) {//네트워크 에러
        console.warn(err.message);
        throw new HirobaError('CANNOT_CONNECT');
    }

    if(!checkNamcoLogin(response)) throw new HirobaError('NOT_NAMCO_LOGINED');

    return response.data
}