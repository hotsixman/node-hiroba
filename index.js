"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cardLogin_1 = require("./src/cardLogin");
const getCardList_1 = require("./src/getCardList");
const getClearData_1 = require("./src/getClearData");
const getCurrentLogin_1 = require("./src/getCurrentLogin");
const getDaniData_1 = require("./src/getDaniData");
const getScoreData_1 = require("./src/getScoreData");
const getSessionToken_1 = require("./src/getSessionToken");
const isLogined_1 = require("./src/isLogined");
const isCardLogined_1 = require("./src/isCardLogined");
const hiroba = {
    cardLogin: cardLogin_1.default,
    getCardList: getCardList_1.default,
    getClearData: getClearData_1.default,
    getCurrentLogin: getCurrentLogin_1.default,
    getDaniData: getDaniData_1.default,
    getScoreData: getScoreData_1.default,
    getSessionToken: getSessionToken_1.default,
    isLogined: isLogined_1.default,
    isCardLogined: isCardLogined_1.default
};
exports.default = hiroba;
