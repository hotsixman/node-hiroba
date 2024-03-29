import axios from 'axios';
import { load } from 'cheerio';
import createHeader from './createHeader';
import HirobaError from './hirobaError';
import isCardLogined from './isCardLogined';
import { CardData } from './types/cardData';


export default async function getCurrentLogin(token:string):Promise<CardData>{
    let response;
    try{
        response = await axios({
            method:'get',
            url:'https://donderhiroba.jp/',
            headers: createHeader(`_token_v2=${token}`)
        })
    }
    catch(err:any){//에러
        throw new HirobaError(err.message, 'CANNOT_CONNECT');
    }

    if(isCardLogined(response)){//로그인이 된 경우
        let $ = load(response.data);
        let mydonArea = $('div#mydon_area');
        let userDiv = $(mydonArea).children('div')[2]

        let nickname;
        {
            let nicknameDiv = $(mydonArea).find('div')[1];
            nickname = $(nicknameDiv).text().replaceAll('\n', '').replaceAll('\t', '');
        }

        let taikoNumber;
        {
            let detailDiv = $(userDiv).find('div.detail');
            let taikoNumberP = $(detailDiv).find('p')[1]
            taikoNumber = Number($(taikoNumberP).text().replace('太鼓番：', ''));
        }
        
        let myDon;
        {
            let mydonDiv = $(userDiv).find('div.mydon_image');
            let img = $(mydonDiv).find('img');
            myDon = img.attr()?.src;
        }

        let currentLogin:CardData = {
            nickname,
            taikoNumber,
            myDon
        }

        return currentLogin;
    }
    else{//로그인이 안된 경우
        throw new HirobaError('', 'NOT_CARD_LOGINED');
    }
}