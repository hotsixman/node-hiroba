import createHeader from "../createHeader.js";
import HirobaError from "../hirobaError.js";
import axios from 'axios';
import checkNamcoLogin from "../parse/checkNamcoLogin.js";
export default async function requestCardList(token) {
    let response;
    try {
        response = await axios({
            method: 'get',
            url: 'https://donderhiroba.jp/login_select.php',
            headers: token ? createHeader(`_token_v2=${token}`) : createHeader()
        });
    }
    catch (err) {
        console.warn(err.message);
        throw new HirobaError('CANNOT_CONNECT');
    }
    if (!checkNamcoLogin(response))
        throw new HirobaError('NOT_NAMCO_LOGINED');
    return response.data;
}
//# sourceMappingURL=requestCardList.js.map