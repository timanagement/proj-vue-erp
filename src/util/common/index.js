/**
 * Created by giantR on 2017/3/28.
 */
export default {
  /** 获取数组总元素个数, 子元素包裹在children中
   * @param {Array} arr 需要遍历的数组
   * */
  getNodesNum: function (arr) {
    let num = 0

    function forChildren(arr) {
      arr.forEach(v => {
        num++
        if (v.hasOwnProperty('children')) {
          forChildren(v.children)
        }
      })
    }

    forChildren(arr)
    return num
  }
}
