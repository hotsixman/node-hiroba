# getClearData

## explanation
Get clear data of your card-logined card.

## usage

```ts
export default async function getClearData(token: string, genre?: 1|2|3|4|5|6|7|8):Promise<GetClearDataReturn>
```

```ts
interface GetClearDataReturn{
    card:CardData
    clearData:SongClearData[]
}

class SongClearData{
    title:string;
    songNo:number;
    difficulty: DifficultyClearData[] = [];

    constructor(title:string, songNo:number){
        this.title = title;
        this.songNo = songNo;
    }

    addDifficulty(d: DifficultyClearData){
        this.difficulty.push(d);
    }
}

interface Clear{
    crown: string|null,
    badge: string|null
}

class DifficultyClearData{
    difficulty:string;
    clear:Clear;

    constructor(difficulty:string, clear:Clear){
        this.difficulty = difficulty;
        this.clear = clear;
    }
}
```

## example

```ts
let data = await getClearData(token: 'testtoken', 1)

/*
{
  card: {
    nickname: 'example',
    taikoNumber: 1234567890,
    myDon: 'https://img.taiko-p.jp/imgsrc.php?v=&kind=mydon&fn=mydon_1234567890'
  },
  clearData: [
    SongClearData { difficulty: [Array], title: 'アイドル', songNo: 1209 },
    SongClearData {
      difficulty: [Array],
      title: '逆戦 NI ZHAN',
      songNo: 1188
    },
    SongClearData {
      difficulty: [Array],
      title: 'Love You',
      songNo: 1187
    },
    SongClearData {
      difficulty: [Array],
      title: 'Surges',
      songNo: 1213
    },
    ...
  ]
}
*/
```

## errors
- `CANNOT_CONNECT`: axios network error
- `NOT_CARD_LOGINED`: not card-logined