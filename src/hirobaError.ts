import { HirobaErrorCode } from "./types/errorCodes.js";

export default class HirobaError extends Error{
    code:string;

    constructor(code:HirobaErrorCode){
        super(code);
        this.code = code;
    }
}