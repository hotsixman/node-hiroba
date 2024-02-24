import axios, { AxiosResponse } from 'axios';
import { load } from 'cheerio';
import createHeader from './createHeader';
import HirobaError from './hirobaError';
import getCurrentLogin from './getCurrentLogin';
import isCardLogined from './isCardLogined';
import { CardData } from './getCardList';

export default async function getClearData(token: string, genre?: 1|2|3|4|5|6|7|8):Promise<GetClearDataReturn>{
    let currentLogin = await getCurrentLogin(token);//여기서 로그인 체크 했음

    if (genre) {//특정 장르가 주어진 경우
        return {
            card: currentLogin,
            clearData: await getClearDataByGenre(token, genre)
        }
    }
    else{//장르가 특정되지 않은 경우
        let clearData = new Set<SongClearData>();

        let genres = [1,2,3,4,5,6,7,8]
        await Promise.all(genres.map(async (e) => {
            (await getClearDataByGenre(token, e)).forEach(e => {
                clearData.add(e);
            })
        }));

        return {
            card: currentLogin,
            clearData: [...clearData]
        }
    }
}

async function getClearDataByGenre(token:string, genre:number){
    let response;
    try{
        response = await axios({
            method: 'get',
            url: 'https://donderhiroba.jp/score_list.php?genre=' + genre,
            headers: createHeader('_token_v2=' + token)
        })
    }
    catch(err:any){
        throw new HirobaError(err.message, 'CANNOT_CONNECT');
    }

    if(!isCardLogined(response)){
        throw new HirobaError('', 'NOT_CARD_LOGINED')
    }

    return parseClearData(response);    
}

function parseClearData(response:AxiosResponse):SongClearData[]{
    let songList:SongClearData[] = [];

    let $ = load(response.data);
    $('.contentBox').each((i, e) => {
        let title = $(e).find('.songNameArea span').text();
        let songNo = Number(new URL('https://donderhiroba.jp/' + $(e).find('a').attr('href')).searchParams.get('song_no'));

        let songClear:SongClearData;
        if(songList.filter(e => e.songNo === songNo).length === 0){//중복 없음
            songClear = new SongClearData(title, songNo);
            songList.push(songClear);
        }
        else{//중복 있음
            songClear = songList.filter(e => e.songNo === songNo)[0];
        }

        //이미지에서 클리어 데이터 파싱
        let clearImg = $(e).find('.buttonList img');
        clearImg.each((i, e) =>{
            let imgSrcParsed = $(e).attr('src')?.replace('image/sp/640/crown_button_', '')?.replace('_640.png', '')?.split('_');
            let className = $(e).attr('class')?.split(' ')[1];
            
            //난이도
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

            //클리어 여부
            let clear:Clear = {
                crown:null,
                badge:null
            };

            let diffClear = new DifficultyClearData(difficulty, clear);
            songClear.addDifficulty(diffClear);

            if(!imgSrcParsed || imgSrcParsed[0] === 'none'){//이미지를 찾을 수 없는 경우 또는 플레이 하지 않은 경우
                return undefined;
            }

            switch(imgSrcParsed[0]){//왕관
                case 'played':{
                    clear.crown = 'played';
                    break;
                }
                case 'silver':{
                    clear.crown = 'silver';
                    break;
                }
                case 'gold':{
                    clear.crown = 'gold';
                    break;
                }
                case 'donderfull':{
                    clear.crown = 'donderfull';
                    break;
                }
            }

            switch(imgSrcParsed[1]){//배지
                case '8':{
                    clear.badge = 'rainbow';
                    break;
                }
                case '7':{
                    clear.badge = 'purple';
                    break;
                }
                case '6':{
                    clear.badge = 'pink';
                    break;
                }
                case '5':{
                    clear.badge = 'gold';
                    break;
                }
                case '4':{
                    clear.badge = 'silver';
                    break;
                }
                case '3':{
                    clear.badge = 'bronze';
                    break;
                }
                case '2':{
                    clear.badge = 'white';
                    break;
                }
            }

            return undefined;
        })
    })

    return songList;
}

interface Clear{
    crown: string|null,
    badge: string|null
}

class SongClearData{
    title:string;
    songNo:number;
    difficulty: DifficultyClearData[] = [];

    constructor(title:string, songNo:number){
        this.title = title;
        this.songNo = songNo;
    }

    addDifficulty(d: DifficultyClearData){
        this.difficulty.push(d);
    }
}

class DifficultyClearData{
    difficulty:string;
    clear:Clear;

    constructor(difficulty:string, clear:Clear){
        this.difficulty = difficulty;
        this.clear = clear;
    }
}

interface GetClearDataReturn{
    card:CardData
    clearData:SongClearData[]
}