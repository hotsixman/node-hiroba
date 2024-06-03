import parse from "../parse.js";
import request from "../request.js";
import { type SongClearData } from "../types/clearData.js";

export default async function getClearData(token: string, genre?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8): Promise<SongClearData[]> {
    const bodys = await request.requestClearData(token, genre);
    const clearDatas = parse.parseClearData(bodys);
    return clearDatas;
}