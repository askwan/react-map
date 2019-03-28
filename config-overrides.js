// antd按需导入及文件绝对路径配置。
const { override, fixBabelImports, addWebpackAlias } = require('customize-cra');
const path = require('path')
module.exports = override(
  addWebpackAlias({
    '@': path.resolve(__dirname, "src")
  }),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css'
  })
)

