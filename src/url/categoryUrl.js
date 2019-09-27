const categoryUrl = {

    // 获取种类名称
    getCategoryList: '/api/v1/getKindName',
    // 添加种类信息
    addCategoryName: '/api/v1/saveKindName/{name}',
    // 删除种类信息
    deleteCategoryNameById: '/api/v1/deleteKindName/{id}',
    // 编辑种类信息
    updataCategoryNameById:'/api/v1/upDataKindName/{id}'
}

export default categoryUrl;