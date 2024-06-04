import axios from 'axios';
import createHeader from '../createHeader.js';
import HirobaError from '../hirobaError.js';
import getCardList from './getCardList.js';
import type { CardData } from '../types/cardData.js';


export default async function cardLogin(token:string, taikoNumber:number):Promise<CardData|null>{
    //카드 리스트 수집
    let list:CardData[] = await getCardList(token);//여기서 로그인체크 했음

    let matchedCardIndex = list.findIndex(card => card.taikoNumber === taikoNumber)
    
    if(matchedCardIndex !== -1){//일치하는 것이 있음
        let response;
        try{//첫번째 요청
            await axios({
                method: 'post',
                url: 'https://donderhiroba.jp/login_select.php',
                headers: {
                    Accept: '*/*',
                    'Accept-Encoding': 'ko,en;q=0.9,en-US;q=0.8',
                    'Content-Length': '18',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    Cookie: '_token_v2=' + token,
                    Origin: 'https://donderhiroba.jp',
                    Referer: 'https://donderhiroba.jp/login_select.php',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 Edg/115.0.1901.183'
                },
                data: {
                    'id_pos': matchedCardIndex+1,
                    'mode': 'exec'
                },
                maxRedirects: 0
            });
        }
        catch(err:any){//의도된 에러
            if (err?.response?.status == 302) {
                response = err.response;
            }
            else{
                console.warn(err.message);
                throw new HirobaError('CANNOT_CONNECT');
            }
        }

        //두 번째 요청
        try {
            await axios({
                method: 'get',
                url: response.headers.location,
                headers: createHeader('_token_v2=' + token)
            })
        }
        catch (err:any) {
            console.warn(err.message);
            throw new HirobaError('CANNOT_CONNECT');
        }
        
        return list[matchedCardIndex]
    }
    else{//일치하는 것이 없음
        throw new HirobaError('NO_MATCHED_CARD')
    }
}