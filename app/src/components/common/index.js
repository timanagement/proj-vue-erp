/**
 * Created by giantR on 2017/4/12.
 */
export default {
  /** 选择所有员工弹窗
   * prop:
   *    model   设置为true时显示弹窗   {Boolean}   必选
   *    data    目标字段所在的对象     {Object}    必选
   *    uname   目标对象中姓名字段名,  {String}    可选    默认uname
   *    uid     目标对象中姓名id字段名 {String}    可选    默认uid
   *
   * el:
   *  <choose-user v-model="showChooseUser" :data="editData"></choose-user>
   * */
  ChooseUser: require('./ChooseUser.vue'),
  /** 选择所有部门弹窗
   * prop:
   *    model   设置为true时显示弹窗    {Boolean}     必选
   *    data    目标字段所在的对象       {Object}      必选
   *    dname   目标对象中部门名称字段名 {String}     可选    默认dname
   *    did     目标对象中部门id字段名   {String}     可选    默认did
   *
   * el:
   *  <choose-dept v-model="showChooseDept" :data="editData"></choose-dept>
   * */
  ChooseDept: require('./ChooseDept.vue')
}
