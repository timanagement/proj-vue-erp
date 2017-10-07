/**
 * Created by GiantX on 2017/5/27.
 */
/**
 * v-clickOutSide
 * @desc 点击元素外面才会触发的事件
 * @example
 * ```vue
 * <div v-element-clickOutSide="handleClose">
 * ```
 */
import clickOutSide from './clickOutSide'
/**
 * v-previewImage
 * @desc 点击弹出图片预览
 * @param {String}  url 图片地址
 * @example
 * ```vue
 * <div v-previewImage="url">
 * ```
 */
import previewImage from './previewImage'
/**
 * v-toolTip
 * @desc 鼠标移入展示传入文本
 * @param {String}  modifiers 展示方位 top,bottom,left,right
 * @param {String}  text      弹出文本
 * @example
 * ```vue
 * <div v-toolTip:modifiers="text">
 * ```
 */
import toolTip from './toolTip'
/**
 * v-animateInteger
 * @desc 元素内数字变动执行动画(仅用于定值)
 * @param {String, Number}  num 绑定值
 * @example
 * ```vue
 * <div v-animateInteger="num">
 * ```
 */
import animateInteger from './animateInteger'

export default {
  clickOutSide,
  previewImage,
  toolTip,
  animateInteger
}
