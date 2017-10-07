/**
 * Created by GiantX on 2017/5/26.
 */
/* 没有在css中定义过的文件后缀放在这里 */
const EX_TYPE = {
  jpeg: 'jpg',
  docx: 'doc',
  xlsx: 'xls'
}
/* 判断文件类型 */
export default (v) => {
  if (v.indexOf('.') === -1) {
    return ''
  }
  v = v.split('.')
  v = v[v.length - 1].toLowerCase()
  return `fi-${EX_TYPE[v] || v}`
}
