import request from "./request.js";
import parse from "./parse.js";
declare const hiroba: {
    getCardList: typeof import("./func/getCardList.js").default;
    getClearData: typeof import("./func/getClearData.js").default;
    getSessionToken: typeof import("./func/getSessionToken.js").default;
    cardLogin: typeof import("./func/cardLogin.js").default;
    getCurrentLogin: typeof import("./func/getCurrentLogin.js").default;
    getDaniData: typeof import("./func/getDaniData.js").default;
    getScoreData: typeof import("./func/getScoreData.js").default;
    updateScore: typeof import("./func/updateScore.js").default;
};
export default hiroba;
export { request, parse };
//# sourceMappingURL=index.d.ts.map