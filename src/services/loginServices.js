import axios from 'axios';
import LoginUrl from '../../src/url/login.js';

const commonurl = 'http://localhost:8666';


/**
 * axios 相应拦截器
 */
axios.interceptors.response.use((response) => {
    return response.data;
});

const loginServies = {
    async userLogin(username, userpassword) {
        const url = commonurl + LoginUrl.userLogin + '?userName=' + username + '&userPassword=' + userpassword;
        return await axios.get(url);
    },
    async getUserInfoByPage(page, size) {
        const url = commonurl + LoginUrl.getUserInfoByPage + '?page=' + page + '&size=' + size;
        return await axios.get(url)
    }
}

export default loginServies;