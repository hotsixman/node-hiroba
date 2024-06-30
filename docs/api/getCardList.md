# getCardList

## Explanation
Get card list of logined bandai namco id.

:warning: **This function will occur card-logout.**

## Usage
```ts
async function getCardList(token:string):Promise<CardData[]>

export interface CardData{
    taikoNumber: number;
    nickname: string;
    myDon: string | undefined;//your my don image link
}
```
## Example
```ts
let cardList = await hiroba.getCardList('exampletoken');
/*
[
  {
    taikoNumber: 123456790,
    nickname: 'どんちゃん',
    myDon: 'https://img.taiko-p.jp/imgsrc.php?v=&kind=mydon&fn=123456790'
  },
  {
    taikoNumber: 123456791,
    nickname: 'かっちゃん',
    myDon: 'https://img.taiko-p.jp/imgsrc.php?v=&kind=mydon&fn=123456791'
  }
]
*/
```
## Errors
- `CANNOT_CONNECT`
- `NOT_LOGINED`