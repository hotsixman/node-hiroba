import { AxiosResponse } from 'axios';
import { load } from 'cheerio';

/**
 * axios response를 인수로 받아 카드 로그인이 되어있는지 체크합니다.
 * @param response
 * @returns {boolean}
 */
export default function checkLogin(response: AxiosResponse): boolean {
    if (!response?.data) {
        return false;
    }
    let $ = load(response.data);

    if ($('form#login_form').length !== 0) {//loginform있음
        return false;
    }
    if ($('h1').html()?.trim() && /^カード登録 \([0-9]枚登録中\)$/.test($('h1').html().trim() as string)) {//카드 선택창일 때
        return false;
    }
    if (!response?.config?.url) {//url이 없음
        return false;
    }
    if (new URL(response.config.url).origin !== 'https://donderhiroba.jp') {//동더히로바가 아님
        return false;
    }

    return true;
}