import request from "./src/request.js";
import parse from "./src/parse.js";
import getCardList from "./src/func/getCardList.js";
import getClearData from "./src/func/getClearData.js";
import getSessionToken from "./src/func/getSessionToken.js";
import cardLogin from "./src/func/cardLogin.js";
import getCurrentLogin from "./src/func/getCurrentLogin.js";
import getDaniData from "./src/func/getDaniData.js";
import getScoreData from "./src/func/getScoreData.js";
import updateScore from "./src/func/updateScore.js";

const hiroba = {
    getCardList,
    getClearData,
    getSessionToken,
    cardLogin,
    getCurrentLogin,
    getDaniData,
    getScoreData,
    updateScore
}

export default hiroba;

export {
    request,
    parse
}