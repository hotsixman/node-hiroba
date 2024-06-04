import parse from "../parse.js";
import request from "../request.js";
export default async function getDaniData(token, daniNo) {
    const bodies = await request.requestDaniData(token, daniNo);
    return parse.parseDaniData(bodies);
}
