# SX ERP

> 使用vue构建的自适应企业ERP系统.

**主要技术栈:**
* [vue2.0](https://cn.vuejs.org/v2/guide/)
* [vuex](http://vuex.vuejs.org/zh-cn/)
* [axios](https://github.com/mzabriskie/axios)
* [vue-axios](https://github.com/imcvampire/vue-axios)
* [vue-router](http://router.vuejs.org/zh-cn/)
* [element-ui](http://element.eleme.io/#/zh-CN/component/installation)
* [nprogress](http://ricostacruz.com/nprogress/)
* [nodejs](http://nodejs.cn/)
* [webpack](http://webpackdoc.com/)

**相关教程:**
* [vue教程](https://github.com/GiantZero-x/vue-tutorials)
* [ECMAScript 6 入门](http://es6.ruanyifeng.com/)

## 如何运行

```bash
# 基本环境
# "node" : ">= 4.0.0",
# "npm"  : ">= 3.0.0"
# "git"  : ">= 2.11.0"

# 下载项目
git clone https://github.com/GiantZero-x/SX-ERP.git

# 进入项目目录
cd SX-ERP/

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
├─build                     webpack配置目录
│  ├─build.js                 构建配置
│  ├─check-version.js         node和npm版本校验
│  ├─dev-client.js            webpack热重载配置
│  ├─dev-server.js            开发配置
│  ├─utils.js                 loader工具配置
│  ├─vue-loader.js            vue-loader工具配置
│  ├─webpack.base.config.js   webpack基本配置
│  ├─webpack.dev.config.js    webpack开发配置
│  └─webpack.prod.config.js   webpack生产配置
│
├─config                    项目配置目录
│  ├─index.js                 主配置
│  ├─dev.env.js               开发配置
│  └─prod.env.js              生产配置
│
├─src                       源文件目录
│  ├─assets                   资源目录
│  │  ├─images                  图片目录
│  │  ├─style                   样式目录
│  │  └─ ...            
│  ├─components               组件目录
│  │  ├─nav                     导航组件
│  │  └─ ...            
│  ├─config                   全局配置目录
│  │  ├─index.js                主输出
│  │  ├─request.js              请求配置
│  │  ├─settings.js             主配置
│  │  └─ ...            
│  ├─pages                    页面目录
│  │  ├─common                  通用页面目录
│  │  ├─index.vue               主视图文件
│  │  └─ ...            
│  ├─router                  路由配置目录
│  │  ├─index.vue              主配置
│  │  └─ ...            
│  ├─store                    状态仓库目录
│  │  ├─global                  公共状态
│  │  ├─userinfo                用户信息状态
│  │  ├─index.js                主配置
│  │  └─ ...       
│  ├─util                     工具目录
│  │  ├─store                   存储api
│  │  ├─index.js                主输出
│  │  └─ ...     
│  ├─App.vue                  项目主视图组件
│  └─main.js                  项目主入口文件
│
├─static                    纯静态资源文件目录
│  ├─data                     模拟数据目录
│  ├─ie                       IE兼容性目录
│  ├─splugins                 插件目录
│  └─ ... 
│
├─.babelrc                  babel 配置
├─.editorconfig             编辑器 配置
├─.gitignore                git 上传配置
├─.postcssrc                css 插件配置
├─index.html                项目首页
├─package.json              node 配置
└─README.md                 README 文件
~~~
