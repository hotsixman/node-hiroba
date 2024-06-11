"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = require("cheerio");
function parseScoreData(data) {
    const [bodies, songNo] = data;
    const diffs = ['easy', 'normal', 'hard', 'oni', 'ura'];
    const scoreData = {
        title: '',
        songNo,
        difficulty: {}
    };
    if ((0, cheerio_1.load)(bodies[0])('#content').text().replaceAll('\n', '').replaceAll('\t', '') === '指定されたページは存在しません。') {
        return null;
    }
    bodies.forEach((body, index) => {
        const $ = (0, cheerio_1.load)(body);
        if ($('#content').text().replaceAll('\n', '').replaceAll('\t', '') === '指定されたページは存在しません。') {
            return null;
        }
        if (index === 0) {
            scoreData.title = $('.songNameTitleScore').text().replaceAll('\n', '').replaceAll('\t', '');
        }
        const difficultyScoreData = {
            crown: null,
            badge: null,
            score: 0,
            ranking: 0,
            good: 0,
            ok: 0,
            bad: 0,
            maxCombo: 0,
            roll: 0,
            count: {
                play: 0,
                clear: 0,
                fullcombo: 0,
                donderfullcombo: 0
            }
        };
        if ($('.scoreDetailStatus').find('.crown').length !== 0) {
            difficultyScoreData.crown = getCrown($('.scoreDetailStatus').find('.crown').attr('src')?.replace('image/sp/640/crown_large_', '').replace('_640.png', ''));
            difficultyScoreData.badge = getBadge($('.scoreDetailStatus').find('.best_score_icon'));
            difficultyScoreData.score = Number($($('.high_score')[0]).text().replace(/[^0-9]/g, ''));
            difficultyScoreData.ranking = Number($('.ranking').text().replace(/[^0-9]/g, ''));
            difficultyScoreData.good = Number($($('.good_cnt')[0]).text().replace(/[^0-9]/g, ''));
            difficultyScoreData.ok = Number($($('.ok_cnt')[0]).text().replace(/[^0-9]/g, ''));
            difficultyScoreData.bad = Number($($('.ng_cnt')[0]).text().replace(/[^0-9]/g, ''));
            difficultyScoreData.maxCombo = Number($($('.combo_cnt')[0]).text().replace(/[^0-9]/g, ''));
            difficultyScoreData.roll = Number($($('.pound_cnt')[0]).text().replace(/[^0-9]/g, ''));
            difficultyScoreData.count.play = Number($($('.stage_cnt')[0]).text().replace(/[^0-9]/g, ''));
            difficultyScoreData.count.clear = Number($($('.clear_cnt')[0]).text().replace(/[^0-9]/g, ''));
            difficultyScoreData.count.fullcombo = Number($($('.full_combo_cnt')[0]).text().replace(/[^0-9]/g, ''));
            difficultyScoreData.count.donderfullcombo = Number($($('.dondafull_combo_cnt')[0]).text().replace(/[^0-9]/g, ''));
        }
        scoreData.difficulty[diffs[index]] = difficultyScoreData;
    });
    return scoreData;
}
exports.default = parseScoreData;
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
//# sourceMappingURL=parseScoreData.js.map