/*
 * webpack基本配置文件
 1. 配置webpack编译入口
 2. 配置webpack输出路径和命名规则
 3. 配置模块resolve规则
 4. 配置不同类型模块的处理规则
 */
var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

// 给出正确的绝对路径
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  // 配置webpack编译入口
  entry: {
    // app: './src/main.js'
    // 用于兼用ie9以上浏览器
    app: ["babel-polyfill", "./src/main.js"]
  },
  // 配置webpack输出路径和命名规则
  output: {
    // 路径，从config/index读取的，值为：工程目录下的dist目录，需要的自定义的也可以去修改
    path: config.build.assetsRoot,
    // webpack输出bundle文件命名格式
    filename: '[name].js',
    // 发布路径，这里是的值为/，正式生产环境可能是服务器上的一个路径,也可以自定义
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  // 配置模块如何被解析，就是import或者require的一些配置
  resolve: {
    // 自动resolve的扩展名
    extensions: ['.js', '.vue', '.json'],
    // 创建路径别名，有了别名之后引用模块更方便，例如
    // import Vue from 'vue/dist/vue.common.js'可以写成 import Vue from 'vue'
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'api': path.resolve(__dirname, '../src/api'),
      'components': path.resolve(__dirname, '../src/components'),
      'mixins': path.resolve(__dirname, '../src/mixins'),
      'pages': path.resolve(__dirname, '../src/pages'),
      'store': path.resolve(__dirname, '../src/store'),
      'util': path.resolve(__dirname, '../src/util'),
      'index-less$': path.resolve(__dirname, '../src/assets/style/index.less'),
      'layer': path.resolve(__dirname, '../static/plugins/layer/layer.js')
    }
  },
  // 配置不同类型模块的处理规则
  module: {
    rules: [
      // 对所有.vue.js文件首先使用eslint-loader检验代码规范
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      // 对所有.vue文件使用vue-loader
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      // 对src和test文件夹下的.js文件使用babel-loader
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      // 对图片资源文件使用url-loader，query.name指明了输出的命名规则, query比较特殊，当大小超过10kb的时候，会单独生成一个文件，文件名的生成规则是utils提供的方法，当小于10kb的时候，就会生成一个base64串放入js文件中
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      // 对字体资源文件使用url-loader，query.name指明了输出的命名规则
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
