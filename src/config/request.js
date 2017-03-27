import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);

//导入封装的回调函数
import {cbs, gbs} from './settings.js';

//动态设置本地和线上接口域名
Vue.axios.defaults.baseURL = gbs.host;


/**
 * 封装axios的通用请求
 * @param  {string}     type        get或post
 * @param  {string}     url         请求的接口URL
 * @param  {object}     data        传的参数，没有则传空对象
 * @param  {Function}   fn          成功回调
 * @param  {boolean}    tokenFlag   是否需要携带token参数，为true，不需要；false，需要。一般除了登录，都需要
 * @param  {Function}   errFn       失败回调
 */
const ajax = function (type, url, data, fn, tokenFlag, errFn) {

  // 分发显示加载样式任务
  this.$store.dispatch('show_loading');

  // tokenFlag为假时设置data的token
  if (tokenFlag !== true) {
    data.token = this.$store.state.user.userinfo.token;
  }
  // 设置传参的格式
  data = type === 'get' ? {params: data} : data;

  Vue.axios[type](url, data).then((res) => {
    if (res.data.status === 200) {
      fn(res.data.data);
    } else {
      //调用全局配置错误回调
      cbs.statusError.call(this, res.data);

      if (tokenFlag === true) {
        errFn && errFn.call(this);
      }
    }
    this.$store.dispatch('hide_loading');
  }).catch((err) => {
    //调用全局配置ajax请求网络出错时回调
    this.$store.dispatch('hide_loading');
    cbs.requestError.call(this, err);
    errFn && errFn.call(this);
  });
};

/**
 * 导出所有模块需要用到接口
 * 变量名：模块名
 * 变量中的方法：当前模块需要用的接口
 * @type {Object}
 */

/**
 * 用户信息
 */
const user = {
    /**
     * 登录
     * @param {object}    data          参数
     * @param {string}    data.username 登陆用户名
     * @param {string}    data.password 登陆密码
     * @param {function}  fn            成功回调
     * @param {Function}  errFn         失败回调
     */
    login(data, fn, errFn) {
      ajax.call(this, 'get', 'user.json', data, fn, true, errFn);
    },

    /**
     * 获取用户列表
     * @param   {object}    data          参数
     * @param   {string}    data.username 用户名-搜索
     * @param   {string}    data.email    邮箱-搜索
     * @param   {Function}  fn            成功回的回调
     */
    selectUser(data, fn) {
      ajax.call(this, 'get', '/User/selectUser', data, fn);
    },

    /**
     * 添加修改用户公用接口
     * @param {object}   data 参数
     * @param {string} data.id 用户ID-修改时必须
     * @param {string} data.username 用户名
     * @param {string} data.email 邮箱
     * @param {string} data.sex 性别
     * @param {string} data.birthday 生日
     * @param {string} data.address 住址
     * @param {string} data.status 状态
     * @param {function} fn   成功回调
     */
    saveUser(data, fn) {
      ajax.call(this, 'post', '/User/saveUser', data, fn);
    },

    /**
     * 删除用户
     * @param  {object}   data 参数
     * @param {string} data.id 需要删除的用户ID，批量删除时，值为以逗号分开的ID字符串
     * @param  {Function} fn   成功回调
     */
    deleteUser(data, fn) {
      ajax.call(this, 'post', '/User/deleteUser', data, fn);
    },

    /**
     * 获取用户信息
     * @param  {string}   id 用户ID
     * @param  {Function} fn 成功回调
     */
    findUser(id, fn) {
      ajax.call(this, 'get', '/User/findUser', {
        id: id
      }, fn);
    },


    /**
     * 修改密码
     * @param  {object}   data 参数
     * @param {string} data.old_password 旧密码
     * @param {string} data.password 新密码
     * @param {string} data.password_confirm 确认密码
     * @param  {Function} fn   成功回调
     */
    updPass(data, fn) {
      ajax.call(this, 'post', '/User/updatePass', data, fn);
    },

    /**
     * 设置权限
     * @param  {object}   data 参数
     * @param {string} data.id 数据ID
     * @param {string} data.login_style 登录方式，1：单点登录；2：多点登录
     * @param {string} data.disabled_update_pass 不允许修改密码的用户ID，以逗号隔开
     * @param  {Function} fn   成功回调
     */
    accessUser(data, fn) {
      ajax.call(this, 'post', '/User/accessUser', data, fn);
    }
  },

  /**
   * 系统设置
   */
  system = {
    /**
     * 获取系统设置信息
     * @param  {Function} fn 成功回调
     */
    getSetting(fn) {
      ajax.call(this, 'get', '/System/getSetting', {}, fn);
    },

    /**
     * 修改系统设置信息
     * @param  {object}   data 参数
     * @param  {Function} fn   成功回调
     */
    updateSetting(data, fn) {
      ajax.call(this, 'post', '/System/updateSetting', data, fn);
    }
  };

export {user, system}


