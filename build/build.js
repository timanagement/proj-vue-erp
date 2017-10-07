/*
 *执行”npm run build”的时候首先执行的是此文件
 1. loading动画
 2. 删除创建目标文件夹
 3. webpack编译
 4. 输出信息
 */

// 检查NodeJS和npm的版本
require('./check-versions')()

// 设置NODE环境变量为生产环境
process.env.NODE_ENV = 'production'

// 一个终端状态显示插件
var ora = require('ora')

// 执行Unix命令删除的插件
var rm = require('rimraf')

// 引入nodejs的path模块，进行一些路径的操作，详情可以查看node官方的api
var path = require('path')

// 用于在控制台输出带颜色字体的插件
var chalk = require('chalk')

// 引入node为webpack提供的一个模块服务 github https://github.com/webpack/webpack
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')

// 开启loading动画
var spinner = ora('building for production...')
spinner.start()


// 递归删除旧的目标文件夹
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
