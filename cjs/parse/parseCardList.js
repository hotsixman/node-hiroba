"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = require("cheerio");
function parseCardList(body) {
    let $ = (0, cheerio_1.load)(body);
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
exports.default = parseCardList;
//# sourceMappingURL=parseCardList.js.map