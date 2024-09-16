import { load } from "cheerio";
import { CompeData, EntryData, SongData } from "../types/compeData";

export default function parseCompeData(detailData: string, rankingData: string): CompeData | null {
  const compeData: CompeData = {
    title: '',
    hostId: '',
    totalEntry: 0,
    startDate: '',
    endDate: '',
    songList : [],
    entryList : [],
  }

  const $ = load(detailData);

  const parseHostId = $('#compeDetail > ul.festivalThumbList > li > section > a').attr('href')?.split('=')[1]; 
  let parseTitle = $('#compeDetail > ul.festivalThumbList > li > section > aside > div > ul > li:nth-child(1)').text(); 
  let parseEntry = $('#compeDetail > ul.festivalThumbList > li > section > aside > div > ul > li:nth-child(3)').text(); 
  let parseStartDate = $('#compeDetail > ul.festivalThumbList > li > section > aside > div > ul > li:nth-child(4)').text(); 
  let parseEndDate = $('#compeDetail > ul.festivalThumbList > li > section > aside > div > ul > li:nth-child(5)').text(); 
  let parseSonglist = $('#compeDetail').html()?.split('songList').slice(1); 

  if(parseHostId === null || parseHostId === undefined) {
    return null;
  }

  parseTitle = convertText(parseTitle.replace('大会名：', ''));
  parseEntry = convertText(parseEntry.replace('人数：', '').split('人')[0]);
  parseStartDate = convertText(parseStartDate.replace('期間：', '').replace('～', ''));
  parseEndDate = convertText(parseEndDate);

  compeData.hostId = parseHostId; 
  compeData.title = parseTitle; 
  compeData.totalEntry = Number(parseEntry);
  compeData.startDate = parseStartDate;
  compeData.endDate = parseEndDate;

  compeData.songList = getSongList(parseSonglist as string[]);
  compeData.entryList = getEntryList(rankingData);

  return compeData;
}

function convertText(text : string) : string {
  return text.replaceAll('\n', '').replaceAll('\t', '');
}

function getSongList(parseSonglist : string[]) : SongData[] {
  const result : SongData[] = [];
  const level = ['easy', 'normal', 'hard', 'oni', 'ura'];

  for(let item of parseSonglist) {
    const song = {
      songName: '',
      difficulty: 'oni',
      speed: 0,
      doron: true,
      abekobe: true,
      detarame: true,
    }

    item = convertText(item);

    const songName = item.split('songName ')[1].split('</')[0].split('>')[1]
    const levelInedx = Number(item.split('level_button_')[1].split('_')[1])
    const speedKey = item.split('image/sp/640/status')[1].split('_')[2]

    song.songName = songName;
    song.difficulty = level[levelInedx - 1];
    song.speed = getSpeedData(speedKey);

    if(item.includes("option_button_doron_normal_")) {
      song.doron = false
    }
    if(item.includes("option_button_abekobe_normal_")) {
      song.abekobe = false
    }
    if(item.includes("option_button_detarame_normal_")) {
      song.detarame = false
    }

    result.push(song as SongData);
  }

  return result;
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

function getEntryList(rankingData : string) : EntryData[] {
  const result : EntryData[] = [];

  const $ = load(rankingData);
  let parseRanklist = $('#compeRanking').html()?.split('festivalRankThumbList').slice(1); 

  for(let item of parseRanklist as string[]) {
    const entry = {
      entryId: '',
      songScore: [] as Record<string, number>[]
    }

    item = convertText(item);
    
    const entryId = item.split('user_profile.php?taiko_no=')[1].split("'")[0]
    const scoreList = item.split('class="block"')[1].split('</div>').slice(0, 3)

    for(let scoreItem of scoreList as string[]) {
      let input = {} as Record<string, number>;

      const scoreName = scoreItem.split('<p>')[1].split('</p>')[0];
      const score = Number(scoreItem.split('<p>')[2].split('点')[0]);

      input[scoreName] = score;
      entry.songScore.push(input);
    }

    entry.entryId = entryId;

    result.push(entry as EntryData)
  }

  return result;
}