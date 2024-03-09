# getCardList

## 설명
카드 리스트를 가져옵니다.

## 파라미터
```ts
async function getCardList(token:string):Promise<CardData[]>
```
## 예시
```ts
let token = await hiroba.getCardList('exampletoken');
```
## 에러
- `CANNOT_CONNECT`: 연결 오류(대부분 네트워크 오류입니다.)
- `NOT_LOGINED`: 로그인이 되어있지 않습니다.

## 주의사항
이 함수를 사용하면 해당 토큰은 카드 로그인이 풀립니다.

카드 로그인이 풀린 상태에서 다른 페이지에 요청을 보내면 해당 토큰은 무효가 됩니다(로그인이 풀림).

따라서 이 함수를 사용한 후에는 반드시 다시 카드로그인을 해주십시오.