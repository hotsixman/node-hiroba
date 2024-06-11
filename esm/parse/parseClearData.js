import { load } from 'cheerio';
export default function parseClearData(bodys) {
    const songClearDatas = [];
    bodys.forEach(body => {
        let $ = load(body);
        $('.contentBox').each((i, e) => {
            let title = $(e).find('.songNameArea span').text();
            let songNo = new URL('https://donderhiroba.jp/' + $(e).find('a').attr('href')).searchParams.get('song_no');
            if (!songNo)
                return;
            let songClear;
            const foundClearData = songClearDatas.find(clearData => clearData.songNo === songNo);
            if (foundClearData) {
                songClear = foundClearData;
            }
            else {
                songClear = {
                    title,
                    songNo,
                    difficulty: {}
                };
                songClearDatas.push(songClear);
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
                if (!imgSrcParsed || imgSrcParsed[0] === 'none') {
                    return;
                }
                let crown = null;
                switch (imgSrcParsed[0]) {
                    case 'played': {
                        crown = 'played';
                        break;
                    }
                    case 'silver': {
                        crown = 'silver';
                        break;
                    }
                    case 'gold': {
                        crown = 'gold';
                        break;
                    }
                    case 'donderfull': {
                        crown = 'donderfull';
                        break;
                    }
                }
                let badge = null;
                switch (imgSrcParsed[1]) {
                    case '8': {
                        badge = 'rainbow';
                        break;
                    }
                    case '7': {
                        badge = 'purple';
                        break;
                    }
                    case '6': {
                        badge = 'pink';
                        break;
                    }
                    case '5': {
                        badge = 'gold';
                        break;
                    }
                    case '4': {
                        badge = 'silver';
                        break;
                    }
                    case '3': {
                        badge = 'bronze';
                        break;
                    }
                    case '2': {
                        badge = 'white';
                        break;
                    }
                }
                const clear = {
                    crown,
                    badge
                };
                songClear.difficulty[difficulty] = clear;
            });
        });
    });
    return songClearDatas;
}
//# sourceMappingURL=parseClearData.js.map