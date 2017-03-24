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
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')

// 开启loading动画
var spinner = ora('building for production...')
spinner.start()

// 递归删除旧的目标文件夹
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  // 没有出错则进行webpack再编译
  webpack(webpackConfig, function (err, stats) {
    // 停止loading动画
    spinner.stop()
    if (err) throw err
    // 没有出错则输出相关信息
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
