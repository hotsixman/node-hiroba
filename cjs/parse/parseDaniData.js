"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = require("cheerio");
function parseDaniData(bodies) {
    return bodies.map(body => {
        let $ = (0, cheerio_1.load)(body[0]);
        if ($('h1').text() === 'エラー') {
            return null;
        }
        const title = $($('#dan_detail div')[0]).text().replaceAll('\t', '').replaceAll('\n', '');
        let played = false;
        const bestScore = {
            score: 0,
            good: 0,
            ok: 0,
            bad: 0,
            roll: 0,
            maxCombo: 0,
            hit: 0,
            conditions: [],
            songRecords: []
        };
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
        const bestConditions = [];
        let conditionDivs = $('.odai_total_song_wrap,.odai_song_wrap');
        conditionDivs.each((i, e) => {
            let condition = {
                name: '',
                criteria: [],
                record: []
            };
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
                    criteria: [Number($($(e).find('.odai_total_song_border span')[2]).text().replace(/[^0-9]/g, ''))],
                    record: [Number($($(e).find('.odai_total_song_result')[0]).text().replace(/[^0-9]/g, ''))]
                };
            }
            else if (type === 'multi') {
                const criteria = [];
                const record = [];
                $(e).find('.odai_song_border_border').each((i, e) => {
                    criteria.push(Number($($(e).find('span')[0]).text().replace(/[^0-9]/g, '')));
                    record.push(Number($($(e).find('span')[1]).text().replace(/[^0-9]/g, '')));
                });
                condition = {
                    name,
                    criteria,
                    record
                };
            }
            if (i < conditionDivs.length / 2) {
                bestScore.conditions.push(condition);
            }
            else {
                bestConditions.push(condition);
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
            bestScore.songRecords.push(songRecord);
        });
        const daniData = {
            title,
            daniNo: body[1],
            played,
            bestScore,
            bestConditions
        };
        return daniData;
    }).filter(e => e !== null);
}
exports.default = parseDaniData;
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
//# sourceMappingURL=parseDaniData.js.map