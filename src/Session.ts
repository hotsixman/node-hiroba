import axios from "axios";
import hiroba from "../index";
import createHeader from "./createHeader";

class Session{
    token:string;
    constructor(token:string){
        this.token = token;
    }

    async isLogined(){
        let response = await axios({
            method: 'get',
            url: 'https://donderhiroba.jp/login_select.php',
            headers: createHeader(`_token_v2=${this.token}`)
        });

        return hiroba.isLogined(response);
    }

    async getCurrentLogin(){
        return await hiroba.getCurrentLogin(this.token);
    }
}

export async function session(email:string, password:string):Promise<Session>{
    let token = await hiroba.getSessionToken(email, password);
    return new Session(token);
}