import request from "../request.js";
import parse from "../parse.js";
import { type CardData } from "../types/cardData.js";

/**
 * 
 * @param {string} token
 * @returns card datas
 * You should 'Card Login' after use this function. If not, the token will be expires;
 */
export default async function getCardList(token:string): Promise<CardData[]> {
    const body = await request.requestCardList(token);
    return parse.parseCardList(body);
}