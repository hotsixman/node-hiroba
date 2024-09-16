import getCompeDetail from "./getCompeDetail.js";
import getCompeRanking from "./getCompeRanking.js";
import type { CompeData } from "../types/compeData";

export default async function getCompeData(token: string | null, compeId: string): Promise<CompeData> {
  const detail = await getCompeDetail(token, compeId);
  const ranking = await getCompeRanking(token, compeId);

  const compeData = {
    ...detail,
    ranking
  }

  return compeData;
}