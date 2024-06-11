export type Difficulty = 'easy' | 'normal' | 'hard' | 'oni' | 'ura';
export interface Clear {
    crown: 'played' | 'silver' | 'gold' | 'donderfull' | null;
    badge: 'rainbow' | 'purple' | 'pink' | 'gold' | 'silver' | 'bronze' | 'white' | null;
}
export interface ClearData {
    title: string;
    songNo: string;
    difficulty: Partial<Record<Difficulty, Clear>>;
}
//# sourceMappingURL=clearData.d.ts.map