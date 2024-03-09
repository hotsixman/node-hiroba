# getClearData

## 설명
클리어 데이터를 가져옵니다.

## 파라미터

```ts
export default async function getClearData(token: string, genre?: 1|2|3|4|5|6|7|8):Promise<GetClearDataReturn>
```

```ts
interface Clear{
    crown: string|null,
    badge: string|null
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

class DifficultyClearData{
    difficulty:string;
    clear:Clear;

    constructor(difficulty:string, clear:Clear){
        this.difficulty = difficulty;
        this.clear = clear;
    }
}

interface GetClearDataReturn{
    card:CardData
    clearData:SongClearData[]
}
```

## 예시

```ts
let data = await getClearData(token: 'testtoken', 1)

console.log(data.clearData);
```

## 에러
- `CANNOT_CONNECT`: 연결 오류(대부분 네트워크 오류입니다.)
- `NOT_CARD_LOGINED`: 카드 로그인이 되어있지 않습니다.