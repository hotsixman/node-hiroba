import checkLogin from "./checkLogin";
import createHeader from "./createHeader";
import HirobaError from "./hirobaError";
import axios from 'axios';
import {load} from 'cheerio';

export default async function getCardList(token:string){
    let response;
    try{//login_select로 요청 보내기
        response = await axios({
            method: 'get',
            url: 'https://donderhiroba.jp/login_select.php',
            headers: createHeader(`_token_v2=${token}`)
        });
    }
    catch(err:any){//네트워크 에러
        throw new HirobaError(err.message, 'CANNOT_CONNECT');
    }

    //로그인이 되어 있는지 체크
    if(await checkLogin(response)){//로그인 되어 있으면
        let $ = load(response.data);

        let cardList:CardData[] = [];
        $('.cardSelect').each(function (index, element) {
            let cardData:CardData = {
                taikoNo: Number($(element).find('div#mydon_area > div:nth-child(2) > p')?.text()?.replace('太鼓番: ', '')),
                nickname: $(element).find('div#mydon_area > div:nth-child(3)')?.text()?.replaceAll('\n', '')?.replaceAll('\t', ''),
                myDon: $(element).find('img')?.attr('src')
            }
            cardList.push(cardData);
        });
        return cardList;
    }
    else{
        throw new HirobaError('', 'NOT_LOGINED');
    }
}

interface CardData{
    taikoNo: number;
    nickname: string;
    myDon: string | undefined;
}