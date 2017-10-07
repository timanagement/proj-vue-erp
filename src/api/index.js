/**
 * Created by giantR on 2017/4/28.
 */

import config from './config'
import store from 'store'

import axios from 'axios'
import $ from 'jquery'

// 接口地址
const HOST = process.env.NODE_ENV === 'development' ? config.DEV_HOST : config.PROD_HOST

/** ajax封装
 * @param {String}    type    请求方法
 * @param {String}    url     请求地址
 * @param {Object}    data    请求数据
 * @param {Function}  fn      成功回调
 * @param {Function}  errfn   失败回调
 * */
let ajax = ''
if (config.AJAX_TYPE === 'jquery') {
  /* 设置全局 AJAX 默认选项。 */
  $.ajaxSetup({
    timeout: config.AJAX_TIMEOUT
  })
  /* jquery方案 */
  ajax = function (type, url, data, fn, errfn) {
    data = Object.assign({}, data);
    data.token = store.state.user.userInfo.token
    data._method = type.toUpperCase()
    $.post(HOST + url, data)
      .done(res => {
        fn && fn(res)
      })
      .fail(err => {
        if (typeof errfn === 'function') {
          errfn(err)
        }
        // 传入ajax对象和当前请求参数
        statusError(err, arguments)
      })
  }
} else {
  /* axios方案 */
  axios.defaults.baseURL = HOST
  axios.defaults.timeout = config.AJAX_TIMEOUT
  axios.defaults.headers.token = store.state.user.userInfo.token
  ajax = function (type, url, data, fn, errfn) {
    data = type === 'get' ? {params: data} : data
    axios[type](url, data).then(res => {
      fn(res.data)
    }).catch(err => {
      if (typeof errfn === 'function') {
        errfn(err)
      }
      // 传入ajax对象和当前请求参数
      statusError(err, arguments)
    })
  }
}

/** 请求错误处理
 * @param {Object} err ajax错误对象
 * @param {Array} arg 请求发生错误时的请求参数
 * */
function statusError(err, arg) {
  let errStatus
  if (config.AJAX_TYPE !== 'jquery') {
    /* axios 特殊处理 */
    if (err.response) {
      errStatus = err.response.status
    } else if (err.request) {
      config.BUS.$notify.error({
        title: 'axios请求错误',
        message: err.request
      });
      return false
    } else {
      config.BUS.$notify.error({
        title: 'axios配置错误',
        message: err.message
      });
      console.log(`axios配置:${err.config}`)
      return false
    }
  } else {
    errStatus = err.status
  }
  switch (errStatus) {
    case 400 :
      config.BUS.$notify.error({
        title: '请求错误',
        message: '请求数据格式发生错误,服务器没有进行新建或修改操作!'
      });
      break
    case 401 :
      config.BUS.$message({
        message: `身份认证失败,请重新登陆!`,
        type: 'warning',
        duration: 1000
      })
      store.dispatch('show_relog_modal')
      break
    case 403 :
      config.BUS.$notify.warning({
        title: '访问被禁止',
        message: '您的访问权限已被限制,如有疑问请联系管理员!'
      });
      break
    case 404 :
      config.BUS.$notify.error({
        title: '404错误',
        message: err.responseText && err.responseText.match(/<h1>(.*)<\/h1>/)[1]
      });
      break
    case 500 :
      config.BUS.$notify.error({
        title: '500错误',
        message: err.responseText && err.responseText.match(/<h1>(.*)<\/h1>/)[1]
      });
      break
    default :
      config.BUS.$notify.error({
        title: '请求错误',
        message: '发生未定义错误,请检查控制台!'
      });
      console.log(err)
  }
}

/* 导出方法 */
export default {
  /* 获取列表 */
  get: function (url, data, fn, errfn) {
    ajax('get', url, data, fn, errfn)
  },
  /* 获取详情 */
  detail: function (url, id, fn, errfn) {
    ajax('get', `${url}/${id}`, {}, fn, errfn)
  },
  /* 添加 */
  post: function (url, data, fn, errfn) {
    ajax('post', url, data, fn, errfn)
  },
  /* 修改 */
  put: function (url, data, fn, errfn) {
    ajax('put', `${url}/${data.id}`, data, fn, errfn)
  },
  /* 删除 */
  delete: function (url, id, fn, errfn) {
    ajax('delete', `${url}/${id}`, {}, fn, errfn)
  },
  /* 配置 */
  ajax: ajax,
  config: config
}

