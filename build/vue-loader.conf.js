var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'

// 输出vue-loader配置
module.exports = {
  // 调用utils css加载器
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
  })
  // 编译css之后自动添加前缀 已移植到 .postcssrc.js 在package.json中配置
  /*postcss: [
   require('autoprefixer')({
   browsers: ['last 2 versions']
   })
   ]*/
}
