import request from "../request.js";
import parse from "../parse.js";
export default async function getCardList(token) {
    const body = await request.requestCardList(token);
    return parse.parseCardList(body);
}
//# sourceMappingURL=getCardList.js.map