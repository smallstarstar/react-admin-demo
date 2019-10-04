import axios from 'axios';
import LoginUrl from '../../src/url/login.js';
import commonurl from '../config/commonUrl';


const loginServies = {

    // 用户登陆
    async userLogin(username, userpassword) {
        const url = commonurl.BaseUrl + LoginUrl.userLogin + '?userName=' + username + '&userPassword=' + userpassword;
        return await axios.get(url);
    },

    // 分页获取用户信息
    async getUserInfoByPage(page, size) {
        const url = commonurl.BaseUrl + LoginUrl.getUserInfoByPage + '?page=' + page + '&size=' + size;
        return await axios.get(url)
    },

    // 根据用户的id删除用户的个人信息
    async deleteUserInfoSimple(userId) {
        const url = commonurl.BaseUrl + LoginUrl.deleteUserInfo + '?id=' + userId;
        console.log(url)
        return await axios.delete(url);
    }
}

export default loginServies;