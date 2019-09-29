const BookInfoUrl = {
    // 获取图书信息
    getBookInfoByPage:'/api/v1/getBookBy/{page}/{size}',

    // 删除图书信息
    deleteBookInfoById:'/api/v1/deleteBookInfo/{id}',

    // 根据图书的id获取图书的全部信息
    getBookAllInfoById: '/api/v1/getBookInfoDetail/{bookId}'
}

export default BookInfoUrl;