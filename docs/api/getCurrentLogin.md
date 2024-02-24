# getClearData

## 설명
현재 로그인된 카드 데이터를 가져옵니다.

## 파라미터

```ts
export default async function getCurrentLogin(token:string):Promise<CardData>
```

## 예시

```ts
let data = await getCurrentLogin(token: 'testtoken')

console.log(data.nickname);//테스트닉넴
```

## 에러
- `CANNOT_CONNECT`: 연결 오류(대부분 네트워크 오류입니다.)
- `NOT_CARD_LOGINED`: 카드 로그인이 되어있지 않습니다.