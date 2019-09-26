const menuList = [
    {
        title: "用户信息",
        icon: 'user',
        path: '/user',
        index:'1'
    },
    {
        title: "角色信息",
        icon: 'team',
        path: '/role',
        index:'2'
    },
    {
        title: '产品架构',
        icon: 'chrome',
        path: '/product',
        index:'3',
        children: [
            {
                title: '产品一',
                icon: 'apple',
                path: '/productOne',
                index:'3-1',
            },
            {
                title: '产品二',
                icon: 'android',
                path: '/productTwo',
                index:'3-2'
            }
        ]
    }
]

export default menuList;