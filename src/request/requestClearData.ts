import axios from "axios";
import createHeader from "../createHeader.js";
import getCurrentLogin from "../func/getCurrentLogin.js";
import HirobaError from "../hirobaError.js";
import checkLogin from "../parse/checkLogin.js";

export default async function requestClearData(token: string, genre?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8): Promise<string[]> {
    if (genre) {
        try {
            const response = await axios({
                method: 'get',
                url: 'https://donderhiroba.jp/score_list.php?genre=' + genre,
                headers: createHeader('_token_v2=' + token)
            })
            if (!checkLogin(response)) throw new HirobaError('NOT_LOGINED');
            return [response.data as string];
        }
        catch (err: any) {
            console.warn(err.message);
            throw new HirobaError('CANNOT_CONNECT');
        }
    }
    else {
        const genres = [1, 2, 3, 4, 5, 6, 7, 8];
        const responses: string[] = [];

        for (const genre of genres) {
            try {
                const response = await axios({
                    method: 'get',
                    url: 'https://donderhiroba.jp/score_list.php?genre=' + genre,
                    headers: createHeader('_token_v2=' + token)
                })
                if (!checkLogin(response)) throw new HirobaError('NOT_LOGINED');
                responses.push(response.data as string);
            }
            catch (err: any) {
                console.warn(err.message);
                throw new HirobaError('CANNOT_CONNECT');
            }
        }

        return responses;
    }
}