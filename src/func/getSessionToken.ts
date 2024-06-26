import createHeader from "../createHeader.js";
import HirobaError from "../hirobaError.js";
import axios from 'axios';

/**
 * 이메일과 비밀번호를 이용해 동더히로바에 로그인합니다.
 * 소셜로그인은 지원하지 않습니다.
 * 동더히로바에서 세션 키 역할을 하는 _token_v2 쿠기 값을 반환합니다.
 * 
 * @param email
 * @param password 
 * @returns 
 */
export default async function getSessionToken(email: string, password: string): Promise<string> {
    let response;
    try {//첫번째 요청 => 성공
        const data = {
            client_id: 'nbgi_taiko',
            redirect_uri: 'https://www.bandainamcoid.com/v2/oauth2/auth?back=v3&client_id=nbgi_taiko&scope=JpGroupAll&redirect_uri=https%3A%2F%2Fdonderhiroba.jp%2Flogin_process.php%3Finvite_code%3D%26abs_back_url%3D%26location_code%3D&text=',
            customize_id: '',
            login_id: email,
            password: password,
            shortcut: 0,
            retention: 0,
            language: 'ko',
            cookie: '{"language":"ko"}',
            prompt: 'login',
        };

        response = await axios({
            method: 'post',
            url: 'https://account-api.bandainamcoid.com/v3/login/idpw',
            headers: createHeader(),
            data: data
        })
    }
    catch (err: any) {//오류시: 네트워크 에러
        console.warn(err.message);
        throw new HirobaError('CANNOT_CONNECT');
    }

    try {
        //두 번째 요청 쿠키 설정
        let cookie: string = '';
        for (const key in response.data.cookie) {
            if (response.data.cookie[key]?.domain == '.bandainamcoid.com' && response.data.cookie[key]?.value !== undefined) {
                cookie += response.data.cookie[key].name + '=' + response.data.cookie[key].value + ';';
            }

        }

        //두 번째 요청
        await axios({
            method: 'get',
            url: response.data.redirect,
            headers: createHeader(cookie),
            maxRedirects: 0,
        })
    }
    catch (err: any) {
        if (err?.response == undefined) {//아이디 비번 에러
            console.warn(err?.message);
            throw new HirobaError('INVALID_ID_PASSWORD');
        }
        else if (err?.response?.status == 302) {//의도된 것입니다.
            response = err;
        }
        else {//몰?루 이상한 에러
            console.warn(err?.message);
            throw new HirobaError('CANNOT_CONNECT');
        }
    }

    try {
        //세 번째 요청
        await axios({
            method: 'get',
            url: response.response.headers.location,
            headers: createHeader(),
            maxRedirects: 0
        })

    }
    catch (err: any) {
        if (err?.response == undefined) {//아이디 비번 에러
            console.warn(err?.message);
            throw new HirobaError('INVALID_ID_PASSWORD');
        }
        else if (err?.response?.status == 302) {//의도된 것입니다.
            response = err;
        }
        else {//몰?루 이상한 에러
            throw new HirobaError('CANNOT_CONNECT');
        }
    }

    let token: string;
    try {//네 번째 요청
        response = await axios({
            method: 'get',
            url: response.response.headers.location,
            headers: createHeader(response.response.headers['set-cookie'][2].split(';')[0])
        });
        token = response.config.headers.cookie.replace('_token_v2=', '');
    }
    catch (err: any) {//오류시: 네트워크 에러
        console.warn(err?.message);
        throw new HirobaError('CANNOT_CONNECT');
    }

    return token;
}