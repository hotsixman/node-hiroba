import { load } from 'cheerio';
import type { Clear, Difficulty, ClearData } from '../types/clearData.js';

export default function parseClearData(bodys: string[]): ClearData[] {
    const songClearDatas: ClearData[] = [];

    bodys.forEach(body => {
        let $ = load(body);

        $('.contentBox').each((i, e) => {
            let title = $(e).find('.songNameArea span').text();
            let songNo = new URL('https://donderhiroba.jp/' + $(e).find('a').attr('href')).searchParams.get('song_no');

            if (!songNo) return;

            let songClear: ClearData;
            const foundClearData = songClearDatas.find(clearData => clearData.songNo === songNo);
            if (foundClearData) {//중복 없음
                songClear = foundClearData;
            }
            else {//중복 있음
                songClear = {
                    title,
                    songNo,
                    difficulty: {}
                }
                songClearDatas.push(songClear);
            }

            //이미지에서 클리어 데이터 파싱
            let clearImg = $(e).find('.buttonList img');
            clearImg.each((i, e) => {
                let imgSrcParsed = $(e).attr('src')?.replace('image/sp/640/crown_button_', '')?.replace('_640.png', '')?.split('_');
                let className = $(e).attr('class')?.split(' ')[1];

                //난이도
                let difficulty: Difficulty;
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

                if (!imgSrcParsed || imgSrcParsed[0] === 'none') {//이미지를 찾을 수 없는 경우 또는 플레이 하지 않은 경우
                    return;
                }

                let crown: Clear['crown'] = null;
                switch (imgSrcParsed[0]) {//왕관
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

                let badge: Clear['badge'] = null;
                switch (imgSrcParsed[1]) {//배지
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

                const clear: Clear = {
                    crown,
                    badge
                }

                songClear.difficulty[difficulty] = clear;
            })
        })
    })

    return songClearDatas;
}