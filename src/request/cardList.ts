import createHeader from "../createHeader";
import HirobaError from "../hirobaError";
import axios from 'axios';
import checkNamcoLogin from "../parse/checkNamcoLogin";

/**
 * 
 * @param {string} token
 * @returns card datas
 * You should 'Card Login' after use this function. If not, the token will be expires;
 */
export default async function cardList(token:string): Promise<string> {
    let response;
    try{//login_select로 요청 보내기
        response = await axios({
            method: 'get',
            url: 'https://donderhiroba.jp/login_select.php',
            headers: createHeader(`_token_v2=${token}`)
        });
    }
    catch(err:any){//네트워크 에러
        throw new HirobaError(err.message, 'CANNOT_CONNECT');
    }

    //로그인이 되어 있는지 체크
    if(checkNamcoLogin(response)){//로그인 되어 있으면
        return response.data;
    }
    else{
        throw new HirobaError('', 'NOT_LOGINED');
    }
}