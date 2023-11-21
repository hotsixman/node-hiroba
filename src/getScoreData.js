import getCurrentLogin from "./getCurrentLogin";
import createHeader from "./createHeader";
import HirobaError from "./hirobaError";
import axios from 'axios';
import { load } from 'cheerio';
import checkLogin from "./checkLogin";
import getClearData from "./getClearData";
export default async function getScoreData(token, songNo, split) {
    let currentLogin = await getCurrentLogin(token); //여기서 로그인 검사 함
    if (songNo) { //songNo 특정
        return {
            card: currentLogin,
            scoreData: await getScoreDataBySongNo(token, songNo)
        };
    }
    else {
        let clearData = await getClearData(token);
        let songNos = clearData.clearData.map((e) => {
            return {
                songNo: e.songNo,
                count: e.difficulty.length
            };
        });
        let songNoss;
        if (split) {
            songNoss = splitIntoChunk(songNos, split);
        }
        else {
            songNoss = splitIntoChunk(songNos, 20);
        }
        let scoreData = [];
        for (const index in songNoss) {
            let e = songNoss[index];
            await Promise.all(e.map(async (e) => {
                let songScoreData = await getScoreDataBySongNo(token, e.songNo, e.count);
                if (songScoreData) {
                    scoreData.push(songScoreData);
                }
            }));
        }
        ;
        return {
            card: currentLogin,
            scoreData
        };
    }
}
async function getScoreDataBySongNo(token, songNo, count) {
    let songScoreData = null;
    let diff = [1, 2, 3, 4, 5];
    if (count) {
        diff = [];
        for (let i = 1; i <= count; i++) {
            diff.push(i);
        }
    }
    await Promise.all(diff.map(async (e) => {
        let diffClearData = await getScoreDataBySongNoByDifficulty(token, songNo, e);
        if (diffClearData?.title && !songScoreData) {
            songScoreData = new SongScoreData(diffClearData.title, songNo);
        }
        if (diffClearData !== null) {
            songScoreData?.addDifficulty(diffClearData.data);
        }
    }));
    return songScoreData;
}
async function getScoreDataBySongNoByDifficulty(token, songNo, difficulty) {
    let response;
    try {
        response = await axios({
            method: 'get',
            headers: createHeader('_token_v2=' + token),
            url: `https://donderhiroba.jp/score_detail.php?song_no=${songNo}&level=${difficulty}`
        });
    }
    catch (err) {
        throw new HirobaError(err.message, 'CANNOT_CONNECT');
    }
    if (!checkLogin(response)) { //로그인 풀림 확인
        throw new HirobaError('', 'NOT_LOGINED');
    }
    let $ = load(response.data);
    //잘못된 곡
    if ($('#content').text().replaceAll('\n', '').replaceAll('\t', '') === '指定されたページは存在しません。') {
        return null;
    }
    let diffScoreData = new DifficultyScoreData(difficulty);
    if ($('.scoreDetailStatus').find('.crown').length !== 0) { //플레이 함
        diffScoreData.setData($);
    }
    let title = $('.songNameTitleScore').text().replaceAll('\n', '').replaceAll('\t', '');
    return {
        title: title,
        data: diffScoreData
    };
}
class SongScoreData {
    constructor(title, songNo) {
        this.difficultyScoreData = [];
        this.title = title;
        this.songNo = songNo;
    }
    addDifficulty(diff) {
        this.difficultyScoreData.push(diff);
    }
}
class DifficultyScoreData {
    constructor(difficulty) {
        this.difficulty = '';
        this.crown = null;
        this.badge = null;
        this.score = 0;
        this.ranking = 0;
        this.good = 0;
        this.ok = 0;
        this.bad = 0;
        this.maxCombo = 0;
        this.roll = 0;
        this.count = {
            play: 0,
            clear: 0,
            fullcombo: 0,
            donderfullcombo: 0
        };
        switch (difficulty) {
            case 1: {
                this.difficulty = 'easy';
                break;
            }
            case 2: {
                this.difficulty = 'normal';
                break;
            }
            case 3: {
                this.difficulty = 'hard';
                break;
            }
            case 4: {
                this.difficulty = 'oni';
                break;
            }
            case 5: {
                this.difficulty = 'ura';
                break;
            }
        }
    }
    setData($) {
        this.crown = getCrown($('.scoreDetailStatus').find('.crown').attr('src')?.replace('image/sp/640/crown_large_', '').replace('_640.png', ''));
        this.badge = getBadge($('.scoreDetailStatus').find('.best_score_icon'));
        this.score = Number($($('.high_score')[0]).text().replace(/[^0-9]/g, ''));
        this.ranking = Number($('.ranking').text().replace(/[^0-9]/g, ''));
        this.good = Number($($('.good_cnt')[0]).text().replace(/[^0-9]/g, ''));
        this.ok = Number($($('.ok_cnt')[0]).text().replace(/[^0-9]/g, ''));
        this.bad = Number($($('.ng_cnt')[0]).text().replace(/[^0-9]/g, ''));
        this.maxCombo = Number($($('.combo_cnt')[0]).text().replace(/[^0-9]/g, ''));
        this.roll = Number($($('.pound_cnt')[0]).text().replace(/[^0-9]/g, ''));
        this.count.play = Number($($('.stage_cnt')[0]).text().replace(/[^0-9]/g, ''));
        this.count.clear = Number($($('.clear_cnt')[0]).text().replace(/[^0-9]/g, ''));
        this.count.fullcombo = Number($($('.full_combo_cnt')[0]).text().replace(/[^0-9]/g, ''));
        this.count.donderfullcombo = Number($($('.dondafull_combo_cnt')[0]).text().replace(/[^0-9]/g, ''));
    }
}
function getCrown(src) {
    let crown = null;
    switch (src) {
        case '0': {
            crown = 'played';
            break;
        }
        case '1': {
            crown = 'silver';
            break;
        }
        case '2': {
            crown = 'gold';
            break;
        }
        case '3': {
            crown = 'donderfull';
            break;
        }
    }
    return crown;
}
function getBadge(element) {
    if (element?.length == 0) {
        return null;
    }
    switch (element?.attr('src')?.replace('image/sp/640/best_score_rank_', '').replace('_640.png', '')) {
        case '8': {
            return 'rainbow';
        }
        case '7': {
            return 'purple';
        }
        case '6': {
            return 'pink';
        }
        case '5': {
            return 'gold';
        }
        case '4': {
            return 'silver';
        }
        case '3': {
            return 'bronze';
        }
        case '2': {
            return 'white';
        }
        default: {
            return null;
        }
    }
}
function splitIntoChunk(arr, chunk) {
    // 빈 배열 생성
    const result = [];
    while (arr.length > 0) {
        let tempArray;
        // splice() 메서드를 사용하여 특정 길이만큼 배열을 분리함
        tempArray = arr.splice(0, chunk);
        // 빈 배열에 특정 길이만큼 분리된 배열을 추가
        result.push(tempArray);
    }
    return result;
}
//# sourceMappingURL=getScoreData.js.map