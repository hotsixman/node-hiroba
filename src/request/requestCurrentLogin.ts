import axios from "axios";
import HirobaError from "../hirobaError.js";
import createHeader from "../createHeader.js";
import checkLogin from "../parse/checkLogin.js";

export default async function requestCurrentLogin(token: string | null) {
    let response;
    try {
        response = await axios({
            method: 'get',
            url: 'https://donderhiroba.jp/',
            headers: token ? createHeader(`_token_v2=${token}`) : createHeader()
        })
    }
    catch (err: any) {//에러
        console.warn(err.message);
        throw new HirobaError('CANNOT_CONNECT');
    }

    if (!checkLogin(response)) throw new HirobaError('NOT_LOGINED');

    return response.data as string;
}