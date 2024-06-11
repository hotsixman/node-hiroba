import request from "../request.js";
import parse from "../parse.js";
export default async function getCurrentLogin(token) {
    const body = await request.requestCurrentLogin(token);
    return parse.parseCurrentLogin(body);
}
//# sourceMappingURL=getCurrentLogin.js.map