import getCurrentLogin from "./getCurrentLogin";
import createHeader from "./createHeader";
import HirobaError from "./hirobaError";
import axios from 'axios';
import { load, Cheerio } from 'cheerio';
import checkLogin from "./checkLogin";
import getClearData from "./getClearData";

export default async function getScoreData(token: string, songNo?: number) {
    let currentLogin = await getCurrentLogin(token);//여기서 로그인 검사 함

    if (songNo) {//songNo 특정
        return {
            card: currentLogin,
            scoreData: await getScoreDataBySongNo(token, songNo)
        }
    }
    else {
        let songNos = (await getClearData(token)).clearData.map((e) => {
            return e.songNo;
        })
        let scoreData: SongScoreData[] = []
        for (const index in songNos) {
            let songScoreData = await getScoreDataBySongNo(token, songNos[index]);
            if (songScoreData) {
                scoreData.push(songScoreData);
            }
        };
        return {
            card: currentLogin,
            scoreData
        }
    }

}

async function getScoreDataBySongNo(token: string, songNo: number) {
    let songScoreData: SongScoreData | null = null;
    let diff = [1, 2, 3, 4, 5]
    await Promise.all(diff.map(async (e) => {
        let diffClearData = await getScoreDataBySongNoByDifficulty(token, songNo, e);

        if (diffClearData?.title && !songScoreData) {
            songScoreData = new SongScoreData(diffClearData.title, songNo)
        }

        if (diffClearData !== null) {
            songScoreData?.addDifficulty(diffClearData.data);
        }
    }))
    return songScoreData;
}

async function getScoreDataBySongNoByDifficulty(token: string, songNo: number, difficulty: number) {
    let response;
    try {
        response = await axios({
            method: 'get',
            headers: createHeader('_token_v2=' + token),
            url: `https://donderhiroba.jp/score_detail.php?song_no=${songNo}&level=${difficulty}`
        })
    }
    catch (err: any) {
        throw new HirobaError(err.message, 'CANNOT_CONNECT');
    }

    if (!checkLogin(response)) {//로그인 풀림 확인
        throw new HirobaError('', 'NOT_LOGINED');
    }

    let $ = load(response.data);

    //잘못된 곡
    if ($('#content').text().replaceAll('\n', '').replaceAll('\t', '') === '指定されたページは存在しません。') {
        return null;
    }

    let diffScoreData = new DifficultyScoreData(difficulty);
    if ($('.scoreDetailStatus').find('.crown').length !== 0) {//플레이 함
        diffScoreData.setData($);
    }

    let title = $('.songNameTitleScore').text().replaceAll('\n', '').replaceAll('\t', '');
    return {
        title: title,
        data: diffScoreData
    }
}

class SongScoreData {
    title: string;
    songNo: number;
    difficultyScoreData: DifficultyScoreData[] = []
    constructor(title: string, songNo: number) {
        this.title = title;
        this.songNo = songNo;
    }

    addDifficulty(diff: DifficultyScoreData) {
        this.difficultyScoreData.push(diff);
    }
}

class DifficultyScoreData {
    difficulty: string = '';
    crown: string | null = null;
    badge: string | null = null;
    score: number = 0;
    ranking: number = 0;
    good: number = 0;
    ok: number = 0;
    bad: number = 0;
    maxCombo: number = 0;
    roll: number = 0;
    count: Count = {
        play: 0,
        clear: 0,
        fullcombo: 0,
        donderfullcombo: 0
    }

    constructor(difficulty: number) {
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

    setData($: any) {
        this.crown = getCrown($('.scoreDetailStatus').find('.crown').attr('src')?.replace('image/sp/640/crown_large_', '').replace('_640.png', ''));
        this.badge = getBadge($('.scoreDetailStatus').find('.best_score_icon'));
        this.score = Number($($('.high_score')[0]).text().replace(/[^0-9]/g, ''));
        this.ranking = Number($('.ranking').text().replace(/[^0-9]/g, ''))
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

interface Count {
    play: number
    clear: number
    fullcombo: number
    donderfullcombo: number
}

function getCrown(src: string | undefined) {
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

function getBadge(element: any) {
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