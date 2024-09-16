import { Difficulty } from "./clearData";

export interface CompeData {
  title: string;
  hostId: string;
  totalEntry: number;
  startDate: string;
  endDate: string;
  songList : SongData[];
  entryList : EntryData[];
}

export interface SongData {
  songName: string;
  difficulty: Difficulty;
  speed: number;
  doron: boolean;
  abekobe: boolean;
  detarame: boolean;
}

export interface EntryData {
  entryId: string;
  songScore: Record<string, number>[];
}

