import { CompeDate } from "../class/compeDate.js";
import { Difficulty } from "./clearData";

export type CompeData = (CompeDetail & { ranking: RankingData[]; })

export interface CompeDetail {
  title: string;
  hostNickname: string;
  hostTaikoNo: string;
  totalEntry: number;
  startDate: CompeDate;
  endDate: CompeDate;
  songList: CompeSongData[];
}

export interface CompeSongData {
  songName: string;
  difficulty: Difficulty;
  speed?: number;
  doron?: boolean;
  abekobe?: boolean;
  random?: 'kimagure' | 'detarame' | false;
}

export interface RankingData {
  rank: number;
  entryNickName: string;
  entryTaikoNo: string;
  totalScore: number;
  songScore: { title: string; score: number; }[];
}

