const {
    override,
    fixBabelImports,
    addLessLoader
} = require('customize-cra')

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            '@primary-color': '#f2784b'   // 将默认的主题颜色改变#f2784b;
        },
    }),
)