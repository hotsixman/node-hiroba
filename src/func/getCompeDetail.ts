import request from "../request.js";
import parse from "../parse.js";
import type { CompeDetail } from "../types/compeData";

export default async function getCompeDetail(token: string | null, compeId: string): Promise<CompeDetail>{
    const response = await request.requestCompeDetail(token, compeId);
    
    return parse.parseCompeDetail(response);
}