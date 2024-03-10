import { CardData } from "./cardData";

export interface SongScoreDataInterface {
    title: string;
    songNo: number;
    difficultyScoreData: DifficultyScoreDataInterface[];
}

export interface DifficultyScoreDataInterface {
    difficulty: string;
    crown: string | null;
    badge: string | null;
    score: number;
    ranking: number;
    good: number;
    ok: number;
    bad: number;
    maxCombo: number;
    roll: number;
    count: Count;
}

export interface Count {
    play: number
    clear: number
    fullcombo: number
    donderfullcombo: number
}

export interface GetScoreDataReturn<T extends 'single'|'list', U extends SongScoreDataInterface>{
    card:CardData
    scoreData: T extends 'single'? (null|U) : U[]
}