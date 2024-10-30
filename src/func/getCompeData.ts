import getCompeDetail from "./getCompeDetail.js";
import getCompeRanking from "./getCompeRanking.js";
import type { CompeData } from "../types/compeData.js";

export default async function getCompeData(token: string | null, compeId: string): Promise<CompeData | null> {
  const detail = await getCompeDetail(token, compeId);
  if(detail === null){
    return null;
  }
  const ranking = await getCompeRanking(token, compeId);
  if(ranking === null){
    return null;
  }

  const compeData = {
    ...detail,
    ranking
  }

  return compeData;
}