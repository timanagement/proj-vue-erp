import axios from 'axios';

//导入封装的回调函数
import {cbs, gbs} from './settings';

//动态设置本地和线上接口域名
axios.defaults.baseURL = gbs.host;

/**
 * 封装axios的通用请求
 * @param  {string}     type        get或post
 * @param  {string}     url         请求的接口URL
 * @param  {object}     data        传的参数，没有则传空对象
 * @param  {Function}   fn          成功回调
 * @param  {boolean}    tokenFlag   是否需要携带token参数，为true，不需要；false，需要。一般除了登录，都需要
 * @param  {Function}   errFn       失败回调
 */
export default function (type, url, data, fn, tokenFlag, errFn) {

  // 分发显示加载样式
  this.$store.dispatch('show_loading');

  // 使用call调用此方法,this为调用此方法的vue组件
  // tokenFlag为假时设置data的token
  if (tokenFlag !== true) {
    data.token = this.$store.state.user.userinfo.token;
  }
  // 设置传参的格式
  data = type === 'get' ? {params: data} : data;

  axios[type](url, data).then((res) => {
    // 状态码为200 表示成功,执行成功回调
    if (res.status === 200) {
      fn(res.data);
    } else {
      // 否则调用全局配置错误回调
      cbs.statusError.call(this, res);

      // 额外的登录错误回调
      if (tokenFlag === true) {
        errFn && errFn.call(this);
      }
    }
    // 分发隐藏加载样式
    this.$store.dispatch('hide_loading');
  }).catch((err) => {
    // 分发隐藏加载样式
    this.$store.dispatch('hide_loading');
    //调用全局配置ajax请求网络出错时回调
    cbs.requestError.call(this, err, url);
    errFn && errFn.call(this);
  });
};

