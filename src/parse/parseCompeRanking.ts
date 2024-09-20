import { load } from "cheerio";
import { RankingData } from "../types/compeData";

export default function parseCompeRanking(body: string): RankingData[] | null {
    const $ = load(body);

    if($('header > h1').text().trim() === 'エラー'){
        return null;
    }

    const rankingDatas: RankingData[] = [];

    $('.festivalRankThumbList').each((i, e) => {
        const rankingData: RankingData = {
            rank: Number($(e).find('.compeRankingText').text().trim().replace('位', '')),
            entryNickName: $(e).find('.player-info div').text().trim().split('\n')[0],
            entryTaikoNo: $(e).find('.player-info img').attr()?.src?.replace(/^(.*)mydon_([0-9]*)$/, '$2') ?? '',
            totalScore: 0,
            songScore: []
        }

        const parsedTotalScore = $(e).find('.player-info div').text().trim().split('\n')[1].trim().replace('点', '');
        if(parsedTotalScore !== "スコア未登録"){
            rankingData.totalScore = Number(parsedTotalScore);
        }

        $(e).find('.block > div').each((i, e) => {
            const title = $(e).find('p:nth-last-child(3)').text().trim();
            const parsedSongScore = $(e).find('p:nth-last-child(2)').text().trim().replace('点', '');

            let score = 0;
            if(parsedSongScore !== "スコア未登録"){
                score = Number(parsedSongScore)
            }

            rankingData.songScore.push({
                title,
                score
            })
        })

        rankingDatas.push(rankingData)
    })

    return rankingDatas;
}