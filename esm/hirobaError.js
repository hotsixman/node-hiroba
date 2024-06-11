export default class HirobaError extends Error {
    code;
    constructor(code) {
        super(code);
        this.code = code;
    }
}
//# sourceMappingURL=hirobaError.js.map