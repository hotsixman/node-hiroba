# getSessionToken

## 설명
이메일과 비밀번호를 인수로 받아, 동더히로바에서 세션 키로 사용되는 _token_v2 쿠기 값을 반환합니다.

## 파라미터
```ts
async function hiroba.getSessionToken(email:string,password:string):Promise<string>
```
## 예시
```ts
let token = await hiroba.getSessionToken('example@example.com', 'example');
```
## 에러
- `CANNOT_CONNECT`: 연결 오류(대부분 네트워크 오류입니다.)
- `CHECK_ID_PASSWORD`: 아이디와 비밀번호가 올바르지 않습니다.