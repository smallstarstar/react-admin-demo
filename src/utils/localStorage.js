/**
 * 封装localStorage
 */
import store from 'store';
const USERINFO = 'userInfo';

const localStorages = {
    saveUser(user) {
        // localStorage.setItem(USERINFO, JSON.stringify(user));
        store.set(USERINFO, user);
    },
    getUser() {
        // return JSON.parse(localStorage.getItem(USERINFO) || '{}')  
        return store.get(USERINFO) || {}
    },
    deleteUser() {
        // localStorage.removeItem(USERINFO)
        store.remove(USERINFO)
    }
}


export default localStorages;