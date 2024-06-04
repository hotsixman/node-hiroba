import type { Difficulty } from './clearData.js';

export interface ScoreData {
    title: string;
    songNo: number;
    difficulty: Partial<Record<Difficulty, DifficultyScoreData>>;
}

export interface DifficultyScoreData {
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

export const a = 1