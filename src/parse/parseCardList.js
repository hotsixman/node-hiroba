import { load } from "cheerio";
export default function parseCardList(body) {
    let $ = load(body);
    let cardList = [];
    $('.cardSelect').each(function (_, element) {
        let cardData = {
            taikoNumber: Number($(element).find('div#mydon_area > div:nth-child(2) > p')?.text()?.replace('太鼓番: ', '')),
            nickname: $(element).find('div#mydon_area > div:nth-child(3)')?.text()?.replaceAll('\n', '')?.replaceAll('\t', ''),
            myDon: $(element).find('img')?.attr('src')
        };
        cardList.push(cardData);
    });
    return cardList;
}
