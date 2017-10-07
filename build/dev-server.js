/*
 * 执行”npm run dev”时候最先执行此文件
 1. 检查node和npm的版本
 2. 引入相关插件和配置
 3. 创建express服务器和webpack编译器
 4. 配置开发中间件（webpack-dev-middleware）和热重载中间件（webpack-hot-middleware）
 5. 挂载代理服务和中间件
 6. 配置静态资源
 7. 启动服务器监听特定端口（8080）
 8. 自动打开浏览器并打开特定网址（localhost:8080）
 */

require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

// 一个可以调用默认软件打开网址、图片、文件等内容的插件
// 这里用它来调用默认浏览器打开dev-server监听的端口，例如：localhost:8888
var opn = require('opn')
var path = require('path')

// 引入nodejs的一个框架express,可以帮助我们快速搭建一个node服务 github https://github.com/expressjs/express
var express = require('express')
var webpack = require('webpack')

// 一个express中间件，用于将http请求代理到其他服务器 https://github.com/chimurai/http-proxy-middleware
// 例：localhost:8080/api/xxx  -->  localhost:3000/api/xxx
// 这里使用该插件可以将前端开发中涉及到的请求代理到API服务器上，方便与服务器对接
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')

// dev-server 监听的端口，默认为config.dev.port设置的端口
var port = process.env.PORT || config.dev.port

// 用于判断是否要自动打开浏览器的布尔变量，当配置文件中没有设置自动打开浏览器的时候其值为 false
var autoOpenBrowser = !!config.dev.autoOpenBrowser

// 获取需要代理的服务api
var proxyTable = config.dev.proxyTable

// 创建 express 实例
var app = express()

// 根据webpack配置创建Compiler对象
var compiler = webpack(webpackConfig)

// webpack-dev-middleware使用compiler对象来对相应的文件进行编译和绑定
// 编译绑定后将得到的产物存放在内存中而没有写进磁盘
// 将这个中间件交给express使用之后即可访问这些编译后的产品文件
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

// webpack-hot-middleware，用于实现热重载功能的中间件 https://github.com/glenjamin/webpack-hot-middleware
var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})

// 当html-webpack-plugin提交之后通过热重载中间件发布重载动作使得页面重载
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// 将 proxyTable 中的代理请求配置挂在到express服务器上 遍历代理的配置信息,并且使用中间件加载进去
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// 当访问找不到的页面的时候，该中间件指定了一个默认的页面返回https://github.com/bripkens/connect-history-api-fallback
app.use(require('connect-history-api-fallback')())

// 使用webpack开发中间件, 即将webpack编译后输出到内存中的文件资源挂到express服务器上
app.use(devMiddleware)

// 将热重载中间件挂在到express服务器上
app.use(hotMiddleware)

// 静态资源的路径,该文件夹下文件不会被编译
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)

// 将静态资源挂到express服务器上
app.use(staticPath, express.static('./static'))

// 应用的地址信息，例如：http://localhost:8088
var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

// webpack开发中间件合法（valid）之后输出提示语到控制台，表明服务器已启动
console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // 如果符合自动打开浏览器的条件，则通过opn插件调用系统默认浏览器打开对应的地址uri
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
