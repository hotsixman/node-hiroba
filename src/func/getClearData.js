import parse from "../parse.js";
import request from "../request.js";
export default async function getClearData(token, genre) {
    const bodys = await request.requestClearData(token, genre);
    const clearDatas = parse.parseClearData(bodys);
    return clearDatas;
}
