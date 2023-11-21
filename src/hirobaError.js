export default class HirobaError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}
