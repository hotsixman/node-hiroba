import axios from "axios";
import createHeader from "../createHeader.js";
import checkLogin from "../parse/checkLogin.js";

export default async function getCurrentLogin(token:string): Promise<boolean> {
    const response = await axios.get("https://donderhiroba.jp", {
        headers: createHeader(`_token_v2=${token}`)
    })

    return checkLogin(response);
}