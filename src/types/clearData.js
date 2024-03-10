"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DifficultyClearData = exports.SongClearData = void 0;
class SongClearData {
    constructor(title, songNo) {
        this.difficulty = [];
        this.title = title;
        this.songNo = songNo;
    }
    addDifficulty(d) {
        this.difficulty.push(d);
    }
}
exports.SongClearData = SongClearData;
class DifficultyClearData {
    constructor(difficulty, clear) {
        this.difficulty = difficulty;
        this.clear = clear;
    }
}
exports.DifficultyClearData = DifficultyClearData;
