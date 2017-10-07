/**
 * Created by giantR on 2017/4/28.
 */
import Vue from 'vue'
export default {
  // 开发地址
  DEV_HOST: 'http://192.168.17.50:808',
  // 生产地址
  PROD_HOST: 'http://122.226.54.202:808',
  // ajax插件
  AJAX_TYPE: 'jquery',
  // 请求超时时间（毫秒）
  AJAX_TIMEOUT: 1000 * 15,
  // 本地存储的key前缀
  PREFIX: 'sx_admin_',
  // 公共bus组件
  BUS: new Vue()
}
