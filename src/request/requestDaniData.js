import axios from "axios";
import HirobaError from "../hirobaError.js";
import createHeader from "../createHeader.js";
import checkLogin from "../parse/checkLogin.js";
export default async function requestDaniData(token, daniNo) {
    if (daniNo !== undefined) {
        return [await requestDaniDataByDaniNo(token, daniNo)];
    }
    else {
        const daniNos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
        const bodies = [];
        await Promise.all(daniNos.map(async (daniNo) => {
            bodies.push(await requestDaniDataByDaniNo(token, daniNo));
        }));
        return bodies;
    }
}
async function requestDaniDataByDaniNo(token, daniNo) {
    let response;
    try {
        response = await axios({
            method: 'get',
            url: 'https://donderhiroba.jp/dan_detail.php?dan=' + daniNo,
            headers: createHeader('_token_v2=' + token)
        });
    }
    catch (err) {
        console.warn(err.message);
        throw new HirobaError('CANNOT_CONNECT');
    }
    if (!checkLogin(response))
        throw new HirobaError('NOT_LOGINED');
    return [response.data, daniNo];
}
