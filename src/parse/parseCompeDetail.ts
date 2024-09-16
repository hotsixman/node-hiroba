import { load } from "cheerio";
import type { CompeDetail, CompeSongData } from "../types/compeData.js";
import { Difficulty } from "../types/clearData";

export default function parseCompeDetail(body: string): CompeDetail {
    const $ = load(body);

    const compeDetail: CompeDetail = {
        title: $('#compeDetail > ul.festivalThumbList > li > section > aside > div > ul > li:nth-child(1)').text().replace('大会名：', '').trim(),
        hostNickname: $("#compeDetail > ul.festivalThumbList > li:nth-child(2)").text(),
        hostTaikoNo: $('#compeDetail > ul.festivalThumbList > li > section > a').attr('href')?.split('=')[1] ?? '',
        totalEntry: Number($('#compeDetail > ul.festivalThumbList > li > section > aside > div > ul > li:nth-child(3)').text().replace('人数：', '').split('人')[0]),
        startDate: parseDate($('#compeDetail > ul.festivalThumbList > li > section > aside > div > ul > li:nth-child(4)').text().replace('期間：', '').replace('～', '').trim()),
        endDate: parseDate($('#compeDetail > ul.festivalThumbList > li > section > aside > div > ul > li:nth-child(5)').text().trim()),
        songList: []
    }

    if(compeDetail.startDate.getTime() > compeDetail.endDate.getTime()){
        compeDetail.endDate.setFullYear(compeDetail.endDate.getFullYear() + 1)
    }

    const difficultyArray: Difficulty[] = ['easy', 'normal', 'hard', 'oni', 'ura'];

    $('li.contentBox.mypageSongListArea').each((i, e) => {
        const imgs = $(e).find('img');
        const compeSongData: CompeSongData = {
            songName: $(e).find('.songName').text().trim(),
            difficulty: difficultyArray[Number(imgs[0].attribs.src.replace(/image\/sp\/640\/level_button_(.*)_([0-9])_640.png/, '$2')) - 1],
        }

        //배속
        if(imgs[1].attribs.src && !imgs[1].attribs.src.includes("blank")){
            compeSongData.speed = getSpeedData(imgs[1].attribs.src.split('image/sp/640/status')[1].split('_')[2])
        }
        //도롱
        if(imgs[2].attribs.src && !imgs[2].attribs.src.includes("blank")){
            if(imgs[2].attribs.src.includes("option_button_doron_normal_")){
                compeSongData.doron = false;
            }
            else{
                compeSongData.doron = true;
            }
        }
        //아베코베
        if(imgs[3].attribs.src && !imgs[3].attribs.src.includes("blank")){
            if(imgs[3].attribs.src.includes("option_button_abekobe_normal_")){
                compeSongData.abekobe = false;
            }
            else{
                compeSongData.abekobe = true;
            }
        }
        //랜덤
        if(imgs[4].attribs.src && !imgs[4].attribs.src.includes("blank")){
            if(imgs[4].attribs.src.includes("image/sp/640/option_button_kimagure")){
                compeSongData.random = "kimagure";
            }
            else if (imgs[4].attribs.src.includes("image/sp/640/option_button_detarame")){
                compeSongData.random = "detarame";
            }
            else{
                compeSongData.random = false;
            }
        }


        compeDetail.songList.push(compeSongData);
    });

    return compeDetail;
}

function parseDate(dateString: string): Date {
    let [month, other] = dateString.split('/');
    let [day, other2] = other.split(/\s/);
    let [hour, minute, second] = other2.split(':');

    const date = new Date();
    date.setMonth(Number(month), Number(day));
    date.setHours(Number(hour), Number(minute), Number(second));

    return date;
}

function getSpeedData(key : string) : number {
    switch(key) {
      case 'a3' : return 2.0;
      case 'a4' : return 3.0;
      case 'a5' : return 4.0;
      case 'a11' : return 1.1;
      case 'a12' : return 1.2;
      case 'a13' : return 1.3;
      case 'a14' : return 1.4;
      case 'a15' : return 1.5;
      case 'a16' : return 1.6;
      case 'a17' : return 1.7;
      case 'a18' : return 1.8;
      case 'a19' : return 1.9;
      case 'a25' : return 2.5;
      case 'a35' : return 3.5;
    }
    return 1.0
  }
  