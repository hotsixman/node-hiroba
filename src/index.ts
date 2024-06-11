import request from "./request.js";
import parse from "./parse.js";
import getCardList from "./func/getCardList.js";
import getClearData from "./func/getClearData.js";
import getSessionToken from "./func/getSessionToken.js";
import cardLogin from "./func/cardLogin.js";
import getCurrentLogin from "./func/getCurrentLogin.js";
import getDaniData from "./func/getDaniData.js";
import getScoreData from "./func/getScoreData.js";
import updateScore from "./func/updateScore.js";

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