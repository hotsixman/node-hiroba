import parse from "../parse.js";
import request from "../request.js";
import { CompeData } from "../types/compeData";

export default async function getCompeData(token: string | null, compeId: string): Promise<CompeData> {
  const detailResponse = await request.requestCompeDetailData(token, compeId)
  const rankingResponse = await request.requestCompeRankingData(token, compeId)

  const parsed = parse.parseCompeData(detailResponse, rankingResponse)

  return parsed as CompeData
}