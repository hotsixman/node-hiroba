import axios from 'axios';
import { load } from 'cheerio';
import createHeader from './createHeader';
import HirobaError from './hirobaError';
import getCurrentLogin from './getCurrentLogin';

export default async function getClearData(token: string, genre?: number) {
    let currentLogin = getCurrentLogin(token);//여기서 로그인 체크 했음

    if (genre && 0 < genre && genre < 9) {//특정 장르가 주어진 경우

    }
    else{//장르가 특정되지 않은 경우

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

    let songList = [];
    let $ = load(response.data);
    $('.contentBox').each((i, e) => {
        
    })
}