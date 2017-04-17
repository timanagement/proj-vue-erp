/**
 * Created by giantR on 2017/4/7.
 */
/* 不属于任何模块API */
import ajax from '../request'
export default {
  /**
   * 登录
   * @param {object}    data          参数
   * @param {string}    data.username 登陆用户名
   * @param {string}    data.password 登陆密码
   * @param {function}  fn            成功回调
   * @param {Function}  errFn         失败回调
   */
  login(data, fn, errFn) {
    ajax.call(this, 'post', '/index/login/login', data, fn, true, errFn);
  },

  /* ************** 增删改查(开始) ************** */
  /**
   * 增加/修改
   * @param  {String}   path  接口
   * @param  {object}   data  增加/修改数据
   * @param  {Function} fn    成功回调
   * */
  postData(path, data, fn){
    ajax.call(this, 'put', path, data, fn);
  },
  /**
   * 删除
   * @param  {String}   path  接口
   * @param  {object}   data  删除数据参数
   * @param  {Function} fn    成功回调
   * */
  deleteData(path, data, fn){
    ajax.call(this, 'delete', path, data, fn);
  },
  /**
   * 查找/获取数据
   * @param  {String}   path  接口
   * @param  {object}   data  查找数据参数
   * @param  {Function} fn    成功回调
   * */
  getData(path, data, fn){
    ajax.call(this, 'get', path, data, fn);
  },
  /* ************** 增删改查(结束) ************** */
}
