"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BestScore = exports.DaniData = void 0;
class DaniData {
    constructor(title, daniNo) {
        this.played = false;
        this.bestScore = new BestScore();
        this.bestConditions = [];
        this.title = title;
        this.daniNo = daniNo;
    }
    addBestCondition(condition) {
        this.bestConditions.push(condition);
    }
}
exports.DaniData = DaniData;
class BestScore {
    constructor() {
        this.score = 0;
        this.good = 0;
        this.ok = 0;
        this.bad = 0;
        this.roll = 0;
        this.maxCombo = 0;
        this.hit = 0;
        this.conditions = [];
        this.songRecords = [];
    }
    addCondition(condition) {
        this.conditions.push(condition);
    }
    addSongRecord(songRecord) {
        this.songRecords.push(songRecord);
    }
}
exports.BestScore = BestScore;
