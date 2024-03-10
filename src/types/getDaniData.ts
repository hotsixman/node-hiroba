import { CardData } from "./cardData";

export type DaniNo = 1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19

export class DaniData {
    title: string;
    daniNo: number;
    played: boolean = false;
    bestScore: BestScore = new BestScore()
    bestConditions: Condition[] = []

    constructor(title: string, daniNo: number) {
        this.title = title;
        this.daniNo = daniNo;
    }

    addBestCondition(condition: Condition) {
        this.bestConditions.push(condition);
    }
}

export class BestScore {
    score: number = 0;
    good: number = 0;
    ok: number = 0;
    bad: number = 0;
    roll: number = 0;
    maxCombo: number = 0;
    hit: number = 0;
    conditions: (SingleCondition | MultiCondition)[] = [];
    songRecords: SongRecord[] = [];

    addCondition(condition: SingleCondition | MultiCondition) {
        this.conditions.push(condition)
    }

    addSongRecord(songRecord: SongRecord) {
        this.songRecords.push(songRecord);
    }
}

export interface Condition {
    name: string;
}

export interface SingleCondition extends Condition {
    type: 'single'
    cutoff: number
    record: number
}

export interface MultiCondition extends Condition {
    type: 'multi'
    records: MultiConditionRecord[]
}

export interface MultiConditionRecord {
    cutoff: number
    record: number
}

export interface SongRecord {
    title: string
    difficulty: string
    good: number
    ok: number
    bad: number
    roll: number
    maxCombo: number
    hit: number
}

export interface  GetDaniDataReturn<T extends DaniNo|undefined>{
    card:CardData,
    daniData: T extends DaniNo? (DaniData|null) : DaniData[]
}