import request from "../request.js";
import parse from "../parse.js";
import type { ScoreData } from "../types/scoreData.js";

export default async function getScoreData(token: string, songNos: number[]): Promise<ScoreData[]> {
    const responses = await request.requestScoreData(token, songNos);
    const parsed = responses.map(response => {
        return parse.parseScoreData(response);
    })

    return parsed.filter(e => e !== null) as ScoreData[]
}