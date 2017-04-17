/**
 * Created by giantR on 2017/4/7.
 */
/* 获取数据相关API */
import ajax from '../request'
export default {
  /**
   * 获取用户列表
   * @param  {Function} fn 成功回调
   */
  getAllUser(fn) {
    ajax.call(this, 'get', '/getter/getAllUser', {}, fn);
  },
}
