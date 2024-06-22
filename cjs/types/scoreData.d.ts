import type { Difficulty } from './clearData.js';
export interface ScoreData {
    title: string;
    songNo: string;
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
    play: number;
    clear: number;
    fullcombo: number;
    donderfullcombo: number;
}
export declare const a = 1;
//# sourceMappingURL=scoreData.d.ts.map