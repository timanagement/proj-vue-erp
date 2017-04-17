# SX ERP

> 使用vue构建的自适应企业ERP系统.

## 相关配置
API端口 > 192.168.17.50:808  
主页端口 > 192.168.17.50:809  

布局文档 查看app/static/Notebook/doc.html 在浏览器中打开  
组件文档 查看[element-ui](http://element.eleme.io/#/zh-CN/component/installation)

**主要技术栈:**
* [vue2.0](https://cn.vuejs.org/v2/guide/)
* [vuex](http://vuex.vuejs.org/zh-cn/)
* [axios](https://github.com/mzabriskie/axios)
* [vue-router](http://router.vuejs.org/zh-cn/)
* [element-ui](http://element.eleme.io/#/zh-CN/component/installation)
* [nprogress](http://ricostacruz.com/nprogress/)
* [nodejs](http://nodejs.cn/)
* [webpack](http://webpackdoc.com/)
* [font-awesome](http://fontawesome.io/icons/)

**相关教程:**
* [vue教程](https://github.com/GiantZero-x/vue-tutorials)
* [ECMAScript 6 入门](http://es6.ruanyifeng.com/)

## 如何运行

```bash
# 基本环境
# "node" : ">= 4.0.0",
# "npm"  : ">= 3.0.0"

# (svn)checkout 
svn://192.168.17.50/wap

# 打开控制台,进入开发目录
cd app

# 安装依赖
npm install

# 如果使用淘宝 cnpm 镜像(https://npm.taobao.org/)则使用 
cnpm install

# 启动开发服务,成功执行后会自动打开浏览器并访问http://localhost:8088
npm run dev

# 打包项目生成dist目录
npm run build

# 打包项目生成dist目录,同时生成报告
npm run build --report
```

## 项目结构
~~~
SX-ERP 项目主目录
├─app                        项目源文件
│  ├─build                      webpack配置目录
│  │  ├─build.js                    构建配置
│  │  ├─check-version.js            node和npm版本校验
│  │  ├─dev-client.js               webpack热重载配置
│  │  ├─dev-server.js               开发配置
│  │  ├─utils.js                    loader工具配置
│  │  ├─vue-loader.js               vue-loader工具配置
│  │  ├─webpack.base.config.js      webpack基本配置
│  │  ├─webpack.dev.config.js       webpack开发配置
│  │  └─webpack.prod.config.js      webpack生产配置
│  │
│  ├─config                     编译打包基础配置目录
│  │  ├─index.js                    主配置
│  │  ├─dev.env.js                  开发配置
│  │  └─prod.env.js                 生产配置
│  │
│  ├─src                        源文件目录
│  │  ├─assets                      资源目录
│  │  │  ├─images                       图片目录
│  │  │  └─style                        样式目录
│  │  │
│  │  ├─components                  组件目录
│  │  │  ├─index.js                     组件输出文件
│  │  │  ├─nav                          导航组件
│  │  │  └─lsitItem                     列表项组件
│  │  │
│  │  ├─config                      全局配置目录
│  │  │  ├─api                          api目录  
│  │  │  │  ├─common.js                     公共api
│  │  │  │  ├─home.js                       主页api
│  │  │  │  ├─administration.js             行政api
│  │  │  │  └─system.js                     系统api
│  │  │  └─index.js                     api及全局配置输出文件
│  │  │  └─request.js                   ajax封装
│  │  │  └─setting.js                   ajax配置
│  │  │
│  │  ├─pages                       页面目录
│  │  │  ├─administration               行政事务
│  │  │  ├─common                       通用页面
│  │  │  ├─home                         主页
│  │  │  └─ ...            
│  │  ├─router                      路由配置目录
│  │  │  ├─administration.js            行政报销路由
│  │  │  ├─home.js                      主页路由
│  │  │  ├─index.js                     主路由
│  │  │  └─ ...            
│  │  ├─store                       状态仓库目录
│  │  │  ├─global                       公共状态
│  │  │  ├─userinfo                     用户信息状态
│  │  │  └─ ...       
│  │  ├─util                        工具目录
│  │  │  ├─storage                      存储api
│  │  │  ├─scroll                       滚动api
│  │  │  └─ ...     
│  │  ├─App.vue                     项目主视图组件
│  │  └─main.js                     项目主入口文件
│  │
│  ├─static                     纯静态资源文件目录
│  │  ├─Notebook                    模版源码
│  │  ├─images                      图片
│  │  ├─data                        静态模拟数据目录
│  │  ├─ie                          IE兼容性目录
│  │  ├─plugins                     插件目录
│  │  └─ ... 
│  │
│  ├─.babelrc                   babel 配置
│  ├─.editorconfig              编辑器 配置
│  ├─.gitignore                 git 上传配置
│  ├─.postcssrc                 css 插件配置
│  ├─index.html                 项目首页
│  └─package.json               node 配置
├─index.html                打包后主页
├─static                    打包后资源文件
└─README.md                 README 文件
~~~

## 约定
*   项目开发使用webStorm或是phpStorm
    *   安装editorConfig插件以保证项目代码风格统一
    *   安装vue插件以保证对vue文件的支持
*   项目开发过程中的同步文件尽量在功能做完后统一同步,并且写明commit信息
*   项目布局方面使用bootstrap的栅格系统以保证pc移动端自适应显示
*   内容组件方面使用element-ui以保证统一显示
