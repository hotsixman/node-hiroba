import { CardData } from "./cardData";

export interface Clear {
    crown: 'played' | 'silver' | 'gold' | 'donderfull' | null,
    badge: 'rainbow' | 'purple' | 'pink' | 'gold' | 'silver' | 'bronze' | 'white' | null
}

export class SongClearData {
    title: string;
    songNo: number;
    difficulty: DifficultyClearData[] = [];

    constructor(title: string, songNo: number) {
        this.title = title;
        this.songNo = songNo;
    }

    addDifficulty(d: DifficultyClearData) {
        this.difficulty.push(d);
    }
}

export class DifficultyClearData {
    difficulty: string;
    clear: Clear;

    constructor(difficulty: string, clear: Clear) {
        this.difficulty = difficulty;
        this.clear = clear;
    }
}

export interface GetClearDataReturn {
    card: CardData
    clearData: SongClearData[]
}