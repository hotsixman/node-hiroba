import createHeader from "./createHeader";
import HirobaError from "./hirobaError";
import axios from 'axios';
import { load } from 'cheerio';
import getCurrentLogin from "./getCurrentLogin";
import checkLogin from "./checkLogin";

export default async function getDaniData(token: string, daniNo?: number) {
    let currentLogin = await getCurrentLogin(token);//여기서  로그인 체크 함

    if(daniNo){//단위가 정해진 경우
        return {
            card: currentLogin,
            daniData: await getDaniDataByDaniNo(token,  daniNo)
        }
    }
    else{
        let daniNos = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]
        let daniData:(DaniData|null)[] = [];
        await Promise.all(daniNos.map(async(e) => {
            daniData.push(await getDaniDataByDaniNo(token, e))
        }));
        return {
            card: currentLogin,
            daniData
        }
    }
}   

async function getDaniDataByDaniNo(token: string, daniNo: number) {
    let response;
    try {
        response = await axios({
            method: 'get',
            url: 'https://donderhiroba.jp/dan_detail.php?dan=' + daniNo,
            headers: createHeader('_token_v2=' + token)
        });
    }
    catch (err: any) {//네트워크 에러
        throw new HirobaError(err.message, 'CANNOT_CONNECT');
    }

    if(!checkLogin(response)){
        throw new HirobaError('', 'NOT_LOGINED');
    }

    let $ = load(response.data);

    //이상한 단위에 들어간 경우
    if ($('h1').text() === 'エラー') {
        return null;
    }

    let title = $($('#dan_detail div')[0]).text().replaceAll('\t', '').replaceAll('\n', '');
    let daniData = new DaniData(title, daniNo);

    //플레이했을 경우
    if (!$('p.head_error').text()) {
        daniData.played = true;
        daniData.bestScore.score = Number($('.total_score_score').text());
        daniData.bestScore.good = Number($($('.total_status')[0]).text().replaceAll('\t', '').replaceAll('\n', ''));
        daniData.bestScore.ok = Number($($('.total_status')[2]).text().replaceAll('\t', '').replaceAll('\n', ''));
        daniData.bestScore.bad = Number($($('.total_status')[4]).text().replaceAll('\t', '').replaceAll('\n', ''));
        daniData.bestScore.roll = Number($($('.total_status')[1]).text().replaceAll('\t', '').replaceAll('\n', ''));
        daniData.bestScore.maxCombo = Number($($('.total_status')[3]).text().replaceAll('\t', '').replaceAll('\n', ''));
        daniData.bestScore.hit = Number($($('.total_status')[5]).text().replaceAll('\t', '').replaceAll('\n', ''));
    }

    //조건들 추가
    let conditionDivs = $('.odai_total_song_wrap,.odai_song_wrap');
    conditionDivs.each((i, e) => {
        let condition: SingleCondition | MultiCondition | null = null;
        let type: string;

        //이름 및 타입
        let name: string = '';
        if ($(e).attr('class') === 'odai_total_song_wrap') {//싱글
            type = 'single';
            name = getConditionName($($(e).find('.odai_total_song_border span')[0]).text().trim())
        }
        else {
            type = 'multi';
            name = getConditionName($($(e).find('.odai_song_border_name')[0]).text().trim())
        }

        //조건 채우기
        if (type === 'single') {//싱글 조건인 경우
            condition = {
                name,
                type,
                cutoff: Number($($(e).find('.odai_total_song_border span')[2]).text().replace(/[^0-9]/g, '')),
                record: Number($($(e).find('.odai_total_song_result')[0]).text().replace(/[^0-9]/g, ''))
            }
        }
        else if(type === 'multi') {
            let records: MultiConditionRecord[] = [];

            $(e).find('.odai_song_border_border').each((i, e) => {
                records.push({
                    cutoff: Number($($(e).find('span')[0]).text().replace(/[^0-9]/g, '')),
                    record: Number($($(e).find('span')[1]).text().replace(/[^0-9]/g, '')),
                })
            });

            condition = {
                name,
                type,
                records
            }
        }

        if(condition){
            if(i < conditionDivs.length / 2){//베스트 스코어 조건
                daniData.bestScore.addCondition(condition)
            }
            else{
                daniData.addBestCondition(condition);
            }
        }
    })

    //곡들 추가
    let songListDiv = $('#songList').children();
    songListDiv.each((i, e) => {
        let title:string = $(e).find('.songName').text().trim();
        let difficulty = getSongDifficulty($(e).find('.score_open img').attr('src')?.trim())
        let good = Number($(e).find('.good_cnt').text().replace(/[^0-9]/g, ''));
        let ok = Number($(e).find('.ok_cnt').text().replace(/[^0-9]/g, ''));
        let bad = Number($(e).find('.ng_cnt').text().replace(/[^0-9]/g, ''));
        let roll = Number($(e).find('.pound_cnt').text().replace(/[^0-9]/g, ''));
        let maxCombo = Number($(e).find('.combo_cnt').text().replace(/[^0-9]/g, ''));
        let hit = Number($(e).find('.hit_cnt').text().replace(/[^0-9]/g, ''));

        let songRecord:SongRecord = {
            title,
            difficulty,
            good,
            ok,
            bad,
            roll,
            maxCombo,
            hit
        }

        daniData.bestScore.addSongRecord(songRecord);
    })

    return daniData;
}

class DaniData {
    title: string;
    daniNo: number;
    played: boolean = false;
    bestScore: BestScore = new BestScore()
    bestConditions: Condition[] = []

    constructor(title: string, daniNo: number) {
        this.title = title;
        this.daniNo = daniNo;
    }

    addBestCondition(condition: Condition) {
        this.bestConditions.push(condition);
    }
}

class BestScore {
    score: number = 0;
    good: number = 0;
    ok: number = 0;
    bad: number = 0;
    roll: number = 0;
    maxCombo: number = 0;
    hit: number = 0;
    conditions: (SingleCondition | MultiCondition)[] = [];
    songRecords: SongRecord[] = [];

    addCondition(condition: SingleCondition | MultiCondition) {
        this.conditions.push(condition)
    }

    addSongRecord(songRecord: SongRecord) {
        this.songRecords.push(songRecord);
    }
}

interface Condition {
    name: string;
}

interface SingleCondition extends Condition {
    type: 'single'
    cutoff: number
    record: number
}

interface MultiCondition extends Condition {
    type: 'multi'
    records: MultiConditionRecord[]
}

interface MultiConditionRecord {
    cutoff: number
    record: number
}

interface SongRecord {
    title: string
    difficulty: string
    good: number
    ok: number
    bad: number
    roll: number
    maxCombo: number
    hit: number
}

function getConditionName(nameOriginal: string) {
    let name: string = '';
    switch (nameOriginal) {
        case '魂ゲージ': {
            name = 'gauge';
            break;
        }
        case '良': {
            name = 'good';
            break;
        }
        case '可': {
            name = 'ok';
            break;
        }
        case '不可': {
            name = 'bad';
            break;
        }
        case '連打数': {
            name = 'roll';
            break;
        }
    }
    return name;
}

function getSongDifficulty(src:string|undefined){
    let difficulty:string = '';
    switch(src){
        case 'image/sp/640/level_icon_1_640.png':{
            difficulty = 'easy';
            break;
        }
        case 'image/sp/640/level_icon_2_640.png':{
            difficulty = 'normal';
            break;
        }
        case 'image/sp/640/level_icon_3_640.png':{
            difficulty = 'hard';
            break;
        }
        case 'image/sp/640/level_icon_4_640.png':{
            difficulty = 'oni';
            break;
        }
        case 'image/sp/640/icon_ura_640.png':{
            difficulty = 'ura';
            break;
        }
    }
    return difficulty;
}