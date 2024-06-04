import parse from "../parse.js";
import request from "../request.js";
import { DaniData, DaniNo } from "../types/daniData.js";

export default async function getDaniData(token: string, daniNo?: DaniNo): Promise<DaniData[]> {
    const bodies = await request.requestDaniData(token, daniNo);
    return parse.parseDaniData(bodies);
}