import parseCardList from "./parse/parseCardList.js";
import parseClearData from "./parse/parseClearData.js";
import parseCurrentLogin from "./parse/parseCurrentLogin.js";
import parseDaniData from "./parse/parseDaniData.js";
import parseScoreData from "./parse/parseScoreData.js";
import parseCompeData from "./parse/parseCompeData.js";

const parse = {
    parseCardList,
    parseClearData,
    parseCompeData,
    parseCurrentLogin,
    parseDaniData,
    parseScoreData
}

export default parse;