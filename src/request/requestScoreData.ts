import HirobaError from "../hirobaError.js";
import createHeader from "../createHeader.js";
import axios from "axios";
import checkLogin from "../parse/checkLogin.js";
import { Difficulty } from "../types/clearData.js";
import { ScoreResponseData } from "../types/scoreData.js";

export default async function requestScoreData(token: string | null, songNos: string[]): Promise<ScoreResponseData[]> {
    const returns: ScoreResponseData[] = [];
    for (const songNo of songNos) {
        returns.push(await requestScoreDataBySongNo(token, songNo));
    }
    return returns;
}

const difficulty: Record<1 | 2 | 3 | 4 | 5, Difficulty> = {
    1: 'easy',
    2: 'normal',
    3: 'hard',
    4: 'oni',
    5: 'ura'
} as const;

async function requestScoreDataBySongNo(token: string | null, songNo: string): Promise<ScoreResponseData> {
    let diffs: (1 | 2 | 3 | 4 | 5)[] = [1, 2, 3, 4, 5];

    const requestData: ScoreResponseData = {
        songNo,
        body: {
            easy: null,
            normal: null,
            hard: null,
            oni: null,
            ura: null
        }
    }

    for (const diff of diffs) {
        let response;
        try {
            response = await axios({
                method: 'get',
                headers: token ? createHeader('_token_v2=' + token) : createHeader(),
                url: `https://donderhiroba.jp/score_detail.php?song_no=${songNo}&level=${diff}`
            });

            requestData.body[difficulty[diff]] = response.data
        }
        catch (err: any) {
            console.warn(err.message);
            throw new HirobaError('CANNOT_CONNECT');
        }
        if (!checkLogin(response)) throw new HirobaError('NOT_LOGINED');
    }

    return requestData;
}