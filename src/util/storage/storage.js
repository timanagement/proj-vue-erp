import config from '@/api/config'

export default class Storage {
  /**
   *  构造函数
   *  @param {string} type 存储类型 可选,session 默认 local
   * */
  constructor(type) {
    this.storage = type === 'session' ? window.sessionStorage : window.localStorage
    this.prefix = config.PREFIX
  }
  /**
   * setter
   * @param  {String} key 键名
   * @param  {Object} value 键值
   * @param  {Function} fn 成功回调
   */
  set(key, value, fn) {
    try {
      value = JSON.stringify(value)
    } catch (e) {
    }
    this.storage.setItem(this.prefix + key, value)
    fn && fn()
  }
  /**
   * getter
   * @param  {String} key 键名
   */
  get(key) {
    if (!key) {
      throw new Error('没有找到key。')
    }
    if (typeof key === 'object') {
      throw new Error('key不能是一个对象。')
    }
    let value = this.storage.getItem(this.prefix + key)
    if (value !== null) {
      try {
        value = JSON.parse(value)
      } catch (e) {
      }
    }
    return value
  }
  /**
   * 删除
   * @param  {String} key 键名
   */
  remove(key) {
    this.storage.removeItem(this.prefix + key)
  }
}
