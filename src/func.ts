import getCardList from "./func/getCardList.js";
import getClearData from "./func/getClearData.js";
import getSessionToken from "./func/getSessionToken.js";
import cardLogin from "./func/cardLogin.js";
import getCurrentLogin from "./func/getCurrentLogin.js";
import getDaniData from "./func/getDaniData.js";
import getScoreData from "./func/getScoreData.js";
import updateScore from "./func/updateScore.js";
import getCompeData from "./func/getCompeData.js";
import getCompeDetail from "./func/getCompeDetail.js";
import getCompeRanking from "./func/getCompeRanking.js";

const func = {
    getCardList,
    getClearData,
    getCompeData,
    getCompeDetail,
    getCompeRanking,
    getSessionToken,
    cardLogin,
    getCurrentLogin,
    getDaniData,
    getScoreData,
    updateScore
}

export default func;