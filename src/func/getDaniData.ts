import parse from "../parse.js";
import request from "../request.js";
import type { DaniData, DaniNo } from "../types/daniData.js";

export default async function getDaniData(token: string | null, daniNo?: DaniNo): Promise<DaniData | null | DaniData[]> {
    const bodies = await request.requestDaniData(token, daniNo);
    return parse.parseDaniData(bodies);
}