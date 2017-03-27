import {gbs} from '@/config/settings.js';
class Store {
    constructor() {
        this.store = window.localStorage;
        this.prefix = gbs.db_prefix;
    }
  /**
   * setter
   * @param  {String} key 键名
   * @param  {Object} value 键值
   * @param  {Function} fn 成功回调
   */
    set(key, value, fn) {
        try {
            value = JSON.stringify(value);
        } catch (e) {
        }

        this.store.setItem(this.prefix + key, value);

        fn && fn();
    }
  /**
   * getter
   * @param  {String} key 键名
   */
    get(key) {
        if (!key) {
            throw new Error('没有找到key。');
        }
        if (typeof key === 'object') {
            throw new Error('key不能是一个对象。');
        }
        let value = this.store.getItem(this.prefix + key);
        if (value !== null) {
            try {
                value = JSON.parse(value);
            } catch (e) {
            }
        }

        return value;
    }
  /**
   * 删除
   * @param  {String} key 键名
   */
    remove(key) {
        this.store.removeItem(this.prefix + key);
    }
}
export default new Store();
