import axios from 'axios';
import BookInfoUrl from '../url/bookInfoUrl';
import CommonUrl from '../config/commonUrl';

const BookInfoServices = {
    // 分页获取图书信息
    async getBookInfoByPage(page, size) {
        const url = CommonUrl.BaseUrl + BookInfoUrl.getBookInfoByPage + '?page=' + page + '&size=' + size;
        return await axios.get(url);
    },

    // 删除图书的信息根据id
    async deleletBookInfoById(id) {
        const url = CommonUrl.BaseUrl + BookInfoUrl.deleteBookInfoById + '?id=' + id;
        return await axios.delete(url);
    },

    // 根据图书的id获取图书的全部信息
    async getBookAllInfo(id) {
        const url = CommonUrl.BaseUrl + BookInfoUrl.getBookAllInfoById + '?bookId=' + id;
        return await axios.get(url);
    }
}


export default BookInfoServices;