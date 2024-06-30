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
- `CANNOT_CONNECT`
- `INVALID_ID_PASSWORD`