# isCardLogined

## 설명
axios Response를 인수로 받아, 카드로그인이 되어있는 상태인지 체크합니다.

## 파라미터
```ts
function isLogined(response: AxiosResponse): boolean
```
## 예시
```ts
axios({
    method:'GET',
    url: 'https://donderhiroba.jp'
})
.then((response) => {
    console.log(isLogined(response))//true || false
})
```
## 결과
- true: 
    + 카드 로그인이 된 경우
- false: 
    + response에 data가 없는 경우
    + url이 없는 경우
    + url의 origin이 donderhiroba.jp가 아닌 경우
    + bandainamco id는 로그인이 되었지만 카드 로그인이 되지 않은 경우
