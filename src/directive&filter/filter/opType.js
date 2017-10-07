/**
 * Created by GiantX on 2017/5/26.
 */
const opArr = {
  yk: {
    name: '日常立项'
  },
  jk: {
    name: '借款申请'
  },
  bx: {
    name: '行政报销'
  },
  yw: {
    name: '业务报销'
  },
  fd: {
    name: '放单申请'
  },
  bk: {
    name: '补卡申请'
  },
  wr: {
    name: '工作总结'
  },
  zz: {
    name: '转正申请'
  },
  pu: {
    name: '公积金申请'
  },
  wl: {
    name: '资金往来'
  },
  nt: {
    name: '公告审批'
  },
  ss: {
    name: '社保申请'
  },
  hc: {
    name: '岗位调动'
  },
  hr: {
    name: '人力需求'
  },
  de: {
    name: '外来文件审批'
  },
  mpsq: {
    name: '名片申请'
  },
  fy: {
    name: '费用修改'
  },
  wx: {
    name: '维修申请'
  },
  qj: {
    name: '请假单'
  },
  jb: {
    name: '加班单'
  },
  wq: {
    name: '外出签卡'
  },
  yc: {
    name: '内部车辆'
  },
  wqyc: {
    name: '外租用车'
  },
  wj: {
    name: '文件立项'
  },
  bf: {
    name: '报废申请'
  },
  sy: {
    name: '转试用申请'
  },
  lz: {
    name: '离职申请'
  },
  rf: {
    name: '销假单'
  },
  gz: {
    name: '盖章申请'
  },
  jm: {
    name: '应收减免'
  },
  cc: {
    name: '出差申请'
  },
  sg: {
    name: '申购申请'
  },
  ly: {
    name: '领用申请'
  },
  xz: {
    name: '薪资调整'
  },
  fc: {
    name: '油费补贴'
  },
  lf: {
    name: '文件借用'
  },
  qs: {
    name: '请示申请'
  },
  rm: {
    name: '还款申请'
  },
  dc: {
    name: '成交客户'
  },
  kh: {
    name: '客户新建'
  },
  om: {
    name: '销售订单管理'
  },
  sc: {
    name: '销售合同管理'
  },
  th: {
    name: '销售退货管理'
  },
  td: {
    name: '出口托单'
  },
  bg: {
    name: '提单发放'
  }
}
export default (v) => {
  return opArr[v] ? opArr[v].name : `未定义op:${v}`
}
