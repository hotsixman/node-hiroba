export default class HirobaError extends Error{
    code:string;

    constructor(message:string, code:string){
        super(message);
        this.code = code;
    }
}