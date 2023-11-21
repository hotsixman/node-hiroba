import getSessionToken from "./src/getSessionToken";
import cardLogin from "./src/cardLogin";
import getDaniData from "./src/getDaniData";
import getClearData from "./src/getClearData";
import getScoreData from "./src/getScoreData";

(async () => {
    console.time('로그인')
    let token = await getSessionToken('huheurim@gmail.com', 'spasname0_');
    await cardLogin(token, 353820166716);
    console.timeEnd('로그인');
    console.time('한 곡 점수 데이터 가져오기')
    console.log((await getScoreData(token, 120)).scoreData)
    console.timeEnd('한 곡 점수 데이터 가져오기')
})();

