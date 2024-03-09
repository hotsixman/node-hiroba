"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createHeader_1 = require("./createHeader");
const hirobaError_1 = require("./hirobaError");
const axios_1 = require("axios");
const cheerio_1 = require("cheerio");
const getCurrentLogin_1 = require("./getCurrentLogin");
const isCardLogined_1 = require("./isCardLogined");
async function getDaniData(token, daniNo) {
    let currentLogin = await (0, getCurrentLogin_1.default)(token);
    if (daniNo) {
        return {
            card: currentLogin,
            daniData: await getDaniDataByDaniNo(token, daniNo)
        };
    }
    else {
        let daniNos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
        let daniData = [];
        await Promise.all(daniNos.map(async (e) => {
            daniData.push(await getDaniDataByDaniNo(token, e));
        }));
        return {
            card: currentLogin,
            daniData: daniData.filter(e => e !== null)
        };
    }
}
exports.default = getDaniData;
async function getDaniDataByDaniNo(token, daniNo) {
    let response;
    try {
        response = await (0, axios_1.default)({
            method: 'get',
            url: 'https://donderhiroba.jp/dan_detail.php?dan=' + daniNo,
            headers: (0, createHeader_1.default)('_token_v2=' + token)
        });
    }
    catch (err) {
        throw new hirobaError_1.default(err.message, 'CANNOT_CONNECT');
    }
    if (!(0, isCardLogined_1.default)(response)) {
        throw new hirobaError_1.default('', 'NOT_CARD_LOGINED');
    }
    let $ = (0, cheerio_1.load)(response.data);
    if ($('h1').text() === 'エラー') {
        return null;
    }
    let title = $($('#dan_detail div')[0]).text().replaceAll('\t', '').replaceAll('\n', '');
    let daniData = new DaniData(title, daniNo);
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
    let conditionDivs = $('.odai_total_song_wrap,.odai_song_wrap');
    conditionDivs.each((i, e) => {
        let condition = null;
        let type;
        let name = '';
        if ($(e).attr('class') === 'odai_total_song_wrap') {
            type = 'single';
            name = getConditionName($($(e).find('.odai_total_song_border span')[0]).text().trim());
        }
        else {
            type = 'multi';
            name = getConditionName($($(e).find('.odai_song_border_name')[0]).text().trim());
        }
        if (type === 'single') {
            condition = {
                name,
                type,
                cutoff: Number($($(e).find('.odai_total_song_border span')[2]).text().replace(/[^0-9]/g, '')),
                record: Number($($(e).find('.odai_total_song_result')[0]).text().replace(/[^0-9]/g, ''))
            };
        }
        else if (type === 'multi') {
            let records = [];
            $(e).find('.odai_song_border_border').each((i, e) => {
                records.push({
                    cutoff: Number($($(e).find('span')[0]).text().replace(/[^0-9]/g, '')),
                    record: Number($($(e).find('span')[1]).text().replace(/[^0-9]/g, '')),
                });
            });
            condition = {
                name,
                type,
                records
            };
        }
        if (condition) {
            if (i < conditionDivs.length / 2) {
                daniData.bestScore.addCondition(condition);
            }
            else {
                daniData.addBestCondition(condition);
            }
        }
    });
    let songListDiv = $('#songList').children();
    songListDiv.each((i, e) => {
        let title = $(e).find('.songName').text().trim();
        let difficulty = getSongDifficulty($(e).find('.score_open img').attr('src')?.trim());
        let good = Number($(e).find('.good_cnt').text().replace(/[^0-9]/g, ''));
        let ok = Number($(e).find('.ok_cnt').text().replace(/[^0-9]/g, ''));
        let bad = Number($(e).find('.ng_cnt').text().replace(/[^0-9]/g, ''));
        let roll = Number($(e).find('.pound_cnt').text().replace(/[^0-9]/g, ''));
        let maxCombo = Number($(e).find('.combo_cnt').text().replace(/[^0-9]/g, ''));
        let hit = Number($(e).find('.hit_cnt').text().replace(/[^0-9]/g, ''));
        let songRecord = {
            title,
            difficulty,
            good,
            ok,
            bad,
            roll,
            maxCombo,
            hit
        };
        daniData.bestScore.addSongRecord(songRecord);
    });
    return daniData;
}
class DaniData {
    constructor(title, daniNo) {
        this.played = false;
        this.bestScore = new BestScore();
        this.bestConditions = [];
        this.title = title;
        this.daniNo = daniNo;
    }
    addBestCondition(condition) {
        this.bestConditions.push(condition);
    }
}
class BestScore {
    constructor() {
        this.score = 0;
        this.good = 0;
        this.ok = 0;
        this.bad = 0;
        this.roll = 0;
        this.maxCombo = 0;
        this.hit = 0;
        this.conditions = [];
        this.songRecords = [];
    }
    addCondition(condition) {
        this.conditions.push(condition);
    }
    addSongRecord(songRecord) {
        this.songRecords.push(songRecord);
    }
}
function getConditionName(nameOriginal) {
    let name = '';
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
function getSongDifficulty(src) {
    let difficulty = '';
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
