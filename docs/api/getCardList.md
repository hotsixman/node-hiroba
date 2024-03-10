# getCardList

## explanation
Get card list of logined bandai namco id.

:warning: **This function will occur card-logout.**

## usage
```ts
async function getCardList(token:string):Promise<CardData[]>

export interface CardData{
    taikoNumber: number;
    nickname: string;
    myDon: string | undefined;//your my don image link
}
```
## example
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
## errors
- `CANNOT_CONNECT`: axios network error
- `NOT_LOGINED`: not logined bandai namco id.