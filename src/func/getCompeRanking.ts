import request from "../request.js";
import parse from "../parse.js";
import type { RankingData } from "../types/compeData";

export default async function getCompeRanking(token: string | null, compeId: string): Promise<RankingData[]>{
    const response = await request.requestCompeRanking(token, compeId);
    
    return parse.parseCompeRanking(response);
}