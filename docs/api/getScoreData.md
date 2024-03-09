# getScoreData

## 설명
점수 데이터를 가져옵니다.

## 사용법

```ts
export default async function getScoreData(token: string, option?:{songNo:number}|{split:number}):Promise<GetScoreDataReturn>
```

- songNo가 특정되지 않으면 모든 곡의 점수데이터를 가져옵니다.
  
  매우 오래걸리니 주의하세요.
- split이 설정되지 않으면 모든 곡의 데이터를 20개씩 받아옵니다.

## 예시

```ts
let data = await getScoreData(token: 'testtoken', {songNo:1})

console.log(data.clearData);
```

## 에러
- `CANNOT_CONNECT`: 연결 오류(대부분 네트워크 오류입니다.)
- `NOT_CARD_LOGINED`: 카드 로그인이 되어있지 않습니다.