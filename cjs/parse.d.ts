import parseCardList from "./parse/parseCardList.js";
import parseClearData from "./parse/parseClearData.js";
import parseCurrentLogin from "./parse/parseCurrentLogin.js";
import parseDaniData from "./parse/parseDaniData.js";
import parseScoreData from "./parse/parseScoreData.js";
import parseCompeDetail from "./parse/parseCompeDetail.js";
import parseCompeRanking from "./parse/parseCompeRanking.js";
declare const parse: {
    parseCardList: typeof parseCardList;
    parseClearData: typeof parseClearData;
    parseCompeDetail: typeof parseCompeDetail;
    parseCompeRanking: typeof parseCompeRanking;
    parseCurrentLogin: typeof parseCurrentLogin;
    parseDaniData: typeof parseDaniData;
    parseScoreData: typeof parseScoreData;
};
export default parse;
//# sourceMappingURL=parse.d.ts.map