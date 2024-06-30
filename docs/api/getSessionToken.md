# getSessionToken

## Description
You can use this function to get `token` to get data from donderhiroba. 

## Parameters 
```ts
async function hiroba.getSessionToken(email:string,password:string):Promise<string>
```
## Example
```ts
let token = await hiroba.getSessionToken('example@example.com', 'example');
```
## 에러
- `CANNOT_CONNECT`: 연결 오류(대부분 네트워크 오류입니다.)
- `CHECK_ID_PASSWORD`: 아이디와 비밀번호가 올바르지 않습니다.