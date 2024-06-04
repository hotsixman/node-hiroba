import { load } from "cheerio";
export default function parseCurrentLogin(body) {
    const $ = load(body);
    let mydonArea = $('div#mydon_area');
    let userDiv = $(mydonArea).children('div')[2];
    let nickname;
    {
        let nicknameDiv = $(mydonArea).find('div')[1];
        nickname = $(nicknameDiv).text().replaceAll('\n', '').replaceAll('\t', '');
    }
    let taikoNumber;
    {
        let detailDiv = $(userDiv).find('div.detail');
        let taikoNumberP = $(detailDiv).find('p')[1];
        taikoNumber = Number($(taikoNumberP).text().replace('太鼓番：', ''));
    }
    let myDon;
    {
        let mydonDiv = $(userDiv).find('div.mydon_image');
        let img = $(mydonDiv).find('img');
        myDon = img.attr()?.src;
    }
    let currentLogin = {
        nickname,
        taikoNumber,
        myDon
    };
    return currentLogin;
}
