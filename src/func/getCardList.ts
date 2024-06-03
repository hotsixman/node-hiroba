import request from "../request"
import parse from "../parse"
import { type CardData } from "../types/cardData";

/**
 * 
 * @param {string} token
 * @returns card datas
 * You should 'Card Login' after use this function. If not, the token will be expires;
 */
export default async function getCardList(token:string): Promise<CardData[]> {
    const body = await request.cardList(token);
    return parse.cardList(body);
}