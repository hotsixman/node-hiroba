import request from "../request.js";
import parse from "../parse.js";
import type { CompeDetail } from "../types/compeData.js";

export default async function getCompeDetail(token: string | null, compeId: string): Promise<CompeDetail | null>{
    const response = await request.requestCompeDetail(token, compeId);
    
    return parse.parseCompeDetail(response);
}