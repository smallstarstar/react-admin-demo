import axios from 'axios';
import categoryUrl from '../url/categoryUrl';
import commonurl from '../config/commonUrl';


const categoryServices = {
    // 获取分类信息
    async getCategoryList() {
        const url = commonurl.BaseUrl + categoryUrl.getCategoryList;
        return await axios.get(url);
    },

    // 添加分类信息
    async addCategoryName(name, personal) {
        const url = commonurl.BaseUrl + categoryUrl.addCategoryName + '?name=' + name;
        return await axios.post(url, personal);
    },

    // 根据id删除配置信息
    async deleteCategoryNameById(id) {
        const url = commonurl.BaseUrl + categoryUrl.deleteCategoryNameById + '?id=' + id;
        return await axios.delete(url);
    },

    // 根据id编辑种类信息
    async updataCategoryById(id, categoryInfo) {
        const url = commonurl.BaseUrl + categoryUrl.updataCategoryNameById + '?id=' + id;
        return await axios.put(url, categoryInfo);
    },

    // 分页获取图书的种类信息
    async getBookKindfnoByPage(page, size) {
        const url = commonurl.BaseUrl + categoryUrl.getBookKindInfoByPage + '?page=' + page + '&size=' + size;
        return await axios.get(url);
    }
}

export default categoryServices;