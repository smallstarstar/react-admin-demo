import axios from 'axios';
import LoginUrl from '../../src/url/login.js';
import commonurl from '../config/commonUrl';


const loginServies = {
    async userLogin(username, userpassword) {
        const url = commonurl.BaseUrl + LoginUrl.userLogin + '?userName=' + username + '&userPassword=' + userpassword;
        return await axios.get(url);
    },
    async getUserInfoByPage(page, size) {
        const url = commonurl.BaseUrl + LoginUrl.getUserInfoByPage + '?page=' + page + '&size=' + size;
        return await axios.get(url)
    }
}

export default loginServies;