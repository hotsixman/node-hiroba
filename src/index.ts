import request from "./request.js";
import parse from "./parse.js";
import func from "./func.js";
import checkNamcoLogin from "./parse/checkNamcoLogin.js";
import checkLogin from "./parse/checkLogin.js";
import HirobaError from "./hirobaError.js";

const hiroba = func;

export default hiroba;

export {
    request,
    parse
}

export { checkNamcoLogin };
export { checkLogin };
export { HirobaError };