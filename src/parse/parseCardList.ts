import { load } from "cheerio";
import { CardData } from "../types/cardData.js";

export default function parseCardList(body: string): CardData[] {
    let $ = load(body);

    let cardList: CardData[] = [];
    $('.cardSelect').each(function (_, element) {
        let cardData: CardData = {
            taikoNumber: $(element).find('div#mydon_area > div:nth-child(2) > p')?.text()?.replace('太鼓番: ', ''),
            nickname: $(element).find('div#mydon_area > div:nth-child(3)')?.text()?.replaceAll('\n', '')?.replaceAll('\t', ''),
            myDon: $(element).find('img')?.attr('src')
        }
        cardList.push(cardData);
    });

    return cardList;
}