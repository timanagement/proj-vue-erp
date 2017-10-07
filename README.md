# ERP

> 使用vue构建的自适应企业ERP系统.

## 相关配置
API端口(开发) > 192.168.17.50:808  
API端口(外网) >   
主页端口(开发) > 192.168.17.50:809  
主页端口(本地) > localhost:8095

布局文档 查看static/Notebook/doc.html 在浏览器中打开  
组件文档 查看[element-ui](http://element.eleme.io/#/zh-CN/component/installation)

API,CSS文档,登陆后->右上角->用户名点击->下拉菜单

**主要技术栈:**
* [vue2.0](https://cn.vuejs.org/v2/guide/)
* [vuex](http://vuex.vuejs.org/zh-cn/)
* ~~[axios](https://github.com/mzabriskie/axios)~~
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

# 安装依赖
npm install

# 如果使用淘宝 cnpm 镜像(https://npm.taobao.org/)则使用 
cnpm install

# 启动开发服务,成功执行后会自动打开浏览器并访问http://localhost:8095
npm run dev

# 打包项目生成dist目录(当前功能开发完成后再进行打包)
npm run build

# 打包项目生成dist目录,同时生成报告
npm run build --report
```

## 项目结构
~~~
#项目主目录
wap
├─build                      webpack配置目录
│  ├─build.js                    构建配置
│  ├─check-version.js            node和npm版本校验
│  ├─dev-client.js               webpack热重载配置
│  ├─dev-server.js               开发配置
│  ├─utils.js                    loader工具配置
│  ├─vue-loader.js               vue-loader工具配置
│  ├─webpack.base.config.js      webpack基本配置
│  ├─webpack.dev.config.js       webpack开发配置
│  └─webpack.prod.config.js      webpack生产配置
│
├─config                     项目配置目录
│  ├─index.js                    主配置
│  ├─dev.env.js                  开发配置
│  └─prod.env.js                 生产配置
│
├─dist                       发布目录
│
├─src                        源文件目录
│  ├─api                         请求配置目录
│  │  ├─config.js                    配置文件  
│  │  └─index.js                     api导出文件
│  │
│  ├─assets                      资源目录
│  │  ├─images                       图片目录
│  │  └─style                        样式目录
│  │
│  ├─components                  组件目录
│  │  ├─index.js                     导出文件
│  │  ├─util.vue                     表单常用控件
│  │  ├─nav                          导航组件
│  │  ├─chooseData                   弹窗选择组件
│  │  └─common                       页面通用组件
│  │
│  ├─directive&filter            指令及过滤器目录
│  │  │─index.js                     导出文件
│  │  │─directive                    指令目录
│  │  └─filter                       过滤器目录
│  │
│  ├─mixins                     混入目录
│  │  │─index.js                     导出文件
│  │  │─commonCheck.js               通用详情
│  │  │─commonList.js                通用列表
│  │  │─applyCheck.js                申请详情
│  │  └─applyList.js                 申请列表
│  │
│  ├─pages                       页面目录
│  │  ├─administration               行政事务
│  │  ├─applyLists                   流程功能页面
│  │  ├─common                       通用页面
│  │  ├─home                         主页
│  │  ├─system                       系统管理
│  │  └─index.js                     导出文件
│  │              
│  ├─router                      路由配置目录
│  │  ├─administration.js            行政报销路由
│  │  ├─applyLists.js                流程功能路由
│  │  ├─home.js                      主页路由
│  │  ├─index.js                     主路由
│  │  └─system.js                    系统管理路由            
│  │              
│  ├─store                       状态仓库目录
│  │  ├─global                       公共状态
│  │  ├─userinfo                     用户信息状态
│  │  └─index.js                     导出文件     
│  │         
│  ├─util                        工具目录
│  │  ├─common                       通用方法
│  │  ├─storage                      本地存储方法
│  │  ├─scroll                       滚动方法
│  │  ├─dom.js                       dom操作方法
│  │  └─index.js                     导出文件
│  │       
│  ├─App.vue                     主视图组件
│  └─main.js                     主入口文件
│
├─static                     纯静态资源文件目录
│  ├─images                      图片
│  ├─plugins                     插件目录
│  └─ ... 
│
├─.babelrc                   babel 配置
├─.editorconfig              编辑器 配置
├─.eslintignore              eslint 忽视配置
├─.eslintrc.js               eslint 配置
├─.gitignore                 git 上传配置
├─.postcssrc                 css 插件配置
├─index.html                 项目首页
├─package.json               node 配置
└─README.md                  README 文件
~~~

## 规范
*   项目开发使用webStorm或是phpStorm
    *   安装editorConfig和ESlint插件以保证项目代码风格统一
    *   安装vue插件以保证对vue文件的支持
    
*   项目开发过程中的同步文件尽量在功能做完后统一同步,并且写明commit信息

*   命名 - 变量:
    *   命名仅限于数字字母字符以及下划线
    *   变量命名使用驼峰式,首字母小写,每个单词首字母大写;变量名的第一个单词应当是一个名词(而非动词)以避免同函数混淆;不要在变量命名中使用下划线.
```javascript
// 正确
var accountNumber = "8401-1"
```
 
*   命名 - 函数:
    *   基本同变量,但函数名的第一个单词应当是一个动词(而非名词)以避免同变量混淆.
```javascript
// 正确
function doSomething () {
  // 代码
}
```
*   命名 - 构造函数:
    *   通过new运算符创建新对象的函数,也应当以驼峰式命名,并且首字母大写;名称应当以非动词开头.
```javascript
// 正确
function MyObject () {
  // 代码
}
```
*   命名 - 常量:
    *   所有字母大写,不同单词之间用单个下划线隔开.
```javascript
// 正确
var TOTAL_COUNT = 10
```
*   命名 - 对象:
    *   同变量命名,对象的方法同函数命名;如果属性或方法是私有的,应当在之前加一个下划线.
```javascript
// 正确
var object = {
  _count: 10,
  
  _getCount: function() {
    return this._count
  }
}
```
    

