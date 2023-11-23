import { AxiosResponse } from 'axios';
import { load } from 'cheerio';

export default function checkLogin(response: AxiosResponse): boolean {
    if (!response?.data) {
        return false;

    }
    let $ = load(response.data);

    if ($('form#login_form').length !== 0) {//loginform없음
        return false;
    }
    if($('h1').html()?.trim() == 'カード登録 (1枚登録中)'){//카드 선택창
        return false;
    }
    if(!response?.config?.url){//url이 없음
        return false;
    }
    if(new URL(response.config.url).origin !== 'https://donderhiroba.jp'){//동더히로바가 아님
        return false;
    }

    return true;
}