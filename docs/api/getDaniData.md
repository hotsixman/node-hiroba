# getClearData

## 설명
현재 로그인된 카드의 단위 정보를 가져옵니다.

## 사용법

```ts
export default async function getDaniData(token: string, daniNo?: 1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19):Promise<GetDaniDataReturn>
```

## 예시

```ts
let data = await getDaniData(token: 'testtoken', 1)

console.log(data);
```

## 에러
- `CANNOT_CONNECT`: 연결 오류(대부분 네트워크 오류입니다.)
- `NOT_CARD_LOGINED`: 카드 로그인이 되어있지 않습니다.