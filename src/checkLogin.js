import { load } from 'cheerio';
export default function checkLogin(response) {
    if (response?.data) {
        let $ = load(response.data);
        if ($('form.login_form').length == 0) { //loginform없음
            return true;
        }
        else { //loginform있음
            return false;
        }
    }
    else {
        return false;
    }
}
//# sourceMappingURL=checkLogin.js.map