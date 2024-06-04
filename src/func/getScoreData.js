import request from "../request.js";
import parse from "../parse.js";
export default async function getScoreData(token, songNos) {
    const responses = await request.requestScoreData(token, songNos);
    const parsed = responses.map(response => {
        return parse.parseScoreData(response);
    });
    return parsed.filter(e => e !== null);
}
