import getSessionToken from "./src/getSessionToken";
import getCardList from "./src/getCardList";

getSessionToken('huheurim@gmail.com', 'spasname0_')
.then(getCardList)
.then(cardList => {console.log(cardList)})