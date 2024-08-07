import { load } from "cheerio";
import type { BestScore, DaniNo, DaniData, Condition, SongRecord, DaniResponseData } from "../types/daniData.js";

export default function parseDaniData(responseDatas: DaniResponseData | DaniResponseData[]): DaniData | null | DaniData[] {
    if (Array.isArray(responseDatas)) {
        return responseDatas.map(parseDaniResponseData).filter(e => e !== null) as DaniData[]
    }
    else {
        return parseDaniResponseData(responseDatas);
    }
}

function parseDaniResponseData(responseData: DaniResponseData) {
    const { body } = responseData;
    let $ = load(body[0]);
    //이상한 페이지
    if ($('h1').text() === 'エラー') {
        return null;
    }

    //제목
    const title = $($('#dan_detail div')[0]).text().replaceAll('\t', '').replaceAll('\n', '');

    //플레이 기록
    let played = false;
    const bestScore: BestScore = {
        score: 0,
        good: 0,
        ok: 0,
        bad: 0,
        roll: 0,
        maxCombo: 0,
        hit: 0,
        conditions: [],
        songRecords: []
    }
    //플레이했을 경우
    if (!$('p.head_error').text()) {
        played = true;
        bestScore.score = Number($('.total_score_score').text());
        bestScore.good = Number($($('.total_status')[0]).text().replaceAll('\t', '').replaceAll('\n', ''));
        bestScore.ok = Number($($('.total_status')[2]).text().replaceAll('\t', '').replaceAll('\n', ''));
        bestScore.bad = Number($($('.total_status')[4]).text().replaceAll('\t', '').replaceAll('\n', ''));
        bestScore.roll = Number($($('.total_status')[1]).text().replaceAll('\t', '').replaceAll('\n', ''));
        bestScore.maxCombo = Number($($('.total_status')[3]).text().replaceAll('\t', '').replaceAll('\n', ''));
        bestScore.hit = Number($($('.total_status')[5]).text().replaceAll('\t', '').replaceAll('\n', ''));
    }

    //조건들 추가
    const bestConditions: Condition[] = [];
    let conditionDivs = $('.odai_total_song_wrap,.odai_song_wrap');
    conditionDivs.each((i, e) => {
        let condition: Condition = {
            name: '',
            criteria: [],
            record: []
        };

        //이름 및 타입
        let type;
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
                criteria: [Number($($(e).find('.odai_total_song_border span')[2]).text().replace(/[^0-9]/g, ''))],
                record: [Number($($(e).find('.odai_total_song_result')[0]).text().replace(/[^0-9]/g, ''))]
            }
        }
        else if (type === 'multi') {//멀티 조건인 경우
            const criteria: number[] = [];
            const record: number[] = [];

            $(e).find('.odai_song_border_border').each((i, e) => {
                criteria.push(Number($($(e).find('span')[0]).text().replace(/[^0-9]/g, '')));
                record.push(Number($($(e).find('span')[1]).text().replace(/[^0-9]/g, '')));
            });

            condition = {
                name,
                criteria,
                record
            }
        }

        if (i < conditionDivs.length / 2) {//베스트 스코어 조건
            bestScore.conditions.push(condition);
        }
        else {
            bestConditions.push(condition);
        }
    })

    //곡들 추가
    let songListDiv = $('#songList').children();
    songListDiv.each((i, e) => {
        let title: string = $(e).find('.songName').text().trim();
        let difficulty = getSongDifficulty($(e).find('.score_open img').attr('src')?.trim())
        let good = Number($(e).find('.good_cnt').text().replace(/[^0-9]/g, ''));
        let ok = Number($(e).find('.ok_cnt').text().replace(/[^0-9]/g, ''));
        let bad = Number($(e).find('.ng_cnt').text().replace(/[^0-9]/g, ''));
        let roll = Number($(e).find('.pound_cnt').text().replace(/[^0-9]/g, ''));
        let maxCombo = Number($(e).find('.combo_cnt').text().replace(/[^0-9]/g, ''));
        let hit = Number($(e).find('.hit_cnt').text().replace(/[^0-9]/g, ''));

        let songRecord: SongRecord = {
            title,
            difficulty,
            good,
            ok,
            bad,
            roll,
            maxCombo,
            hit
        }

        bestScore.songRecords.push(songRecord);
    })

    const daniData: DaniData = {
        title,
        daniNo: responseData.daniNo,
        played,
        bestScore,
        bestConditions
    }

    return daniData
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

function getSongDifficulty(src: string | undefined) {
    let difficulty: string = '';
    switch (src) {
        case 'image/sp/640/level_icon_1_640.png': {
            difficulty = 'easy';
            break;
        }
        case 'image/sp/640/level_icon_2_640.png': {
            difficulty = 'normal';
            break;
        }
        case 'image/sp/640/level_icon_3_640.png': {
            difficulty = 'hard';
            break;
        }
        case 'image/sp/640/level_icon_4_640.png': {
            difficulty = 'oni';
            break;
        }
        case 'image/sp/640/icon_ura_640.png': {
            difficulty = 'ura';
            break;
        }
    }
    return difficulty;
}