"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const cheerio_1 = require("cheerio");
const createHeader_1 = require("./createHeader");
const hirobaError_1 = require("./hirobaError");
const getCurrentLogin_1 = require("./getCurrentLogin");
const isCardLogined_1 = require("./isCardLogined");
async function getClearData(token, genre) {
    let currentLogin = await (0, getCurrentLogin_1.default)(token);
    if (genre) {
        return {
            card: currentLogin,
            clearData: await getClearDataByGenre(token, genre)
        };
    }
    else {
        let clearData = [];
        let genres = [1, 2, 3, 4, 5, 6, 7, 8];
        await Promise.all(genres.map(async (e) => {
            (await getClearDataByGenre(token, e)).forEach(e => {
                if (!clearData.find(el => el.songNo === e.songNo)) {
                    clearData.push(e);
                }
            });
        }));
        return {
            card: currentLogin,
            clearData
        };
    }
}
exports.default = getClearData;
async function getClearDataByGenre(token, genre) {
    let response;
    try {
        response = await (0, axios_1.default)({
            method: 'get',
            url: 'https://donderhiroba.jp/score_list.php?genre=' + genre,
            headers: (0, createHeader_1.default)('_token_v2=' + token)
        });
    }
    catch (err) {
        throw new hirobaError_1.default(err.message, 'CANNOT_CONNECT');
    }
    if (!(0, isCardLogined_1.default)(response)) {
        throw new hirobaError_1.default('', 'NOT_CARD_LOGINED');
    }
    return parseClearData(response);
}
function parseClearData(response) {
    let songList = [];
    let $ = (0, cheerio_1.load)(response.data);
    $('.contentBox').each((i, e) => {
        let title = $(e).find('.songNameArea span').text();
        let songNo = Number(new URL('https://donderhiroba.jp/' + $(e).find('a').attr('href')).searchParams.get('song_no'));
        let songClear;
        if (songList.filter(e => e.songNo === songNo).length === 0) {
            songClear = new SongClearData(title, songNo);
            songList.push(songClear);
        }
        else {
            songClear = songList.filter(e => e.songNo === songNo)[0];
        }
        let clearImg = $(e).find('.buttonList img');
        clearImg.each((i, e) => {
            let imgSrcParsed = $(e).attr('src')?.replace('image/sp/640/crown_button_', '')?.replace('_640.png', '')?.split('_');
            let className = $(e).attr('class')?.split(' ')[1];
            let difficulty;
            if (className?.includes('easy')) {
                difficulty = 'easy';
            }
            else if (className?.includes('normal')) {
                difficulty = 'normal';
            }
            else if (className?.includes('hard')) {
                difficulty = 'hard';
            }
            else if (className?.includes('oni_ura')) {
                difficulty = 'ura';
            }
            else {
                difficulty = 'oni';
            }
            let clear = {
                crown: null,
                badge: null
            };
            let diffClear = new DifficultyClearData(difficulty, clear);
            songClear.addDifficulty(diffClear);
            if (!imgSrcParsed || imgSrcParsed[0] === 'none') {
                return undefined;
            }
            switch (imgSrcParsed[0]) {
                case 'played': {
                    clear.crown = 'played';
                    break;
                }
                case 'silver': {
                    clear.crown = 'silver';
                    break;
                }
                case 'gold': {
                    clear.crown = 'gold';
                    break;
                }
                case 'donderfull': {
                    clear.crown = 'donderfull';
                    break;
                }
            }
            switch (imgSrcParsed[1]) {
                case '8': {
                    clear.badge = 'rainbow';
                    break;
                }
                case '7': {
                    clear.badge = 'purple';
                    break;
                }
                case '6': {
                    clear.badge = 'pink';
                    break;
                }
                case '5': {
                    clear.badge = 'gold';
                    break;
                }
                case '4': {
                    clear.badge = 'silver';
                    break;
                }
                case '3': {
                    clear.badge = 'bronze';
                    break;
                }
                case '2': {
                    clear.badge = 'white';
                    break;
                }
            }
            return undefined;
        });
    });
    return songList;
}
class SongClearData {
    constructor(title, songNo) {
        this.difficulty = [];
        this.title = title;
        this.songNo = songNo;
    }
    addDifficulty(d) {
        this.difficulty.push(d);
    }
}
class DifficultyClearData {
    constructor(difficulty, clear) {
        this.difficulty = difficulty;
        this.clear = clear;
    }
}
