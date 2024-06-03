import createHeader from "../createHeader.js";
import HirobaError from "../hirobaError.js";
import axios from 'axios';
import checkNamcoLogin from "../parse/checkNamcoLogin.js";

/**
 * 
 * @param {string} token
 * @returns card datas
 * You should 'Card Login' after use this function. If not, the token will be expires;
 */
export default async function requestCardList(token:string): Promise<string> {
    let response;
    try{//login_select로 요청 보내기
        response = await axios({
            method: 'get',
            url: 'https://donderhiroba.jp/login_select.php',
            headers: createHeader(`_token_v2=${token}`)
        });
    }
    catch(err:any){//네트워크 에러
        console.warn(err.message);
        throw new HirobaError('CANNOT_CONNECT');
    }

    //로그인이 되어 있는지 체크
    if(checkNamcoLogin(response)){//로그인 되어 있으면
        return response.data;
    }
    else{
        throw new HirobaError('NOT_NAMCO_LOGINED');
    }
}