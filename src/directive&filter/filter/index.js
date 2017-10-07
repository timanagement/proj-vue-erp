/**
 * Created by GiantX on 2017/5/27.
 */
/** checkType
 * @desc 判断详情页类型
 * @param {String} v 接收a/u/c/v
 * */
import checkType from './checkType'

/** fileIcon
 *  @desc 根据文件地址后缀返回对应图标
 *  @param {String} v url地址
 *  */
import fileIcon from './fileIcon'


/** opType
 *  @desc 根据op判断流程中文
 *  @param {String} op 流程简称
 *  */
import opType from './opType'

export default {
  checkType,
  fileIcon,
  opType
}
