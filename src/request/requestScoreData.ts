import getCurrentLogin from "../func/getCurrentLogin.js";
import HirobaError from "../hirobaError.js";
import createHeader from "../createHeader.js";
import axios from "axios";
import checkLogin from "../parse/checkLogin.js";

export default async function requestScoreData(token: string, songNos: string[]): Promise<[string[], string][]> {
    const returns: [string[], string][] = [];
    for (const songNo of songNos) {
        returns.push(await requestScoreDataBySongNo(token, songNo));
    }
    return returns;
}

async function requestScoreDataBySongNo(token: string, songNo: string): Promise<[string[], string]> {
    let diffs = [1, 2, 3, 4, 5];
    const bodies: string[] = [];

    for (const diff of diffs) {
        let response;
        try {
            response = await axios({
                method: 'get',
                headers: createHeader('_token_v2=' + token),
                url: `https://donderhiroba.jp/score_detail.php?song_no=${songNo}&level=${diff}`
            })
            bodies.push(response.data)
        }
        catch (err: any) {
            console.warn(err.message);
            throw new HirobaError('CANNOT_CONNECT');
        }
        if (!checkLogin(response)) throw new HirobaError('NOT_LOGINED');
    }

    return [bodies, songNo]
}