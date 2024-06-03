import { CardData } from "./cardData.js";

export type Difficulty = 'easy' | 'normal' | 'hard' | 'oni' | 'ura';

export interface Clear {
    crown: 'played' | 'silver' | 'gold' | 'donderfull' | null;
    badge: 'rainbow' | 'purple' | 'pink' | 'gold' | 'silver' | 'bronze' | 'white' | null;
}

export interface SongClearData {
    title: string;
    songNo: string;
    difficulty: Partial<Record<Difficulty, Clear>>;
}

export interface ClearData {
    card: CardData,
    clearData: SongClearData
}