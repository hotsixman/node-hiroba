import { load } from 'cheerio';
export default function checkLogin(response) {
    if (response?.data) {
        let $ = load(response.data);
        if ($('form.login_form').length == 0) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}
