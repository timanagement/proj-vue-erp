/**
 * Created by giantR on 2017/4/1.
 */
export default {
  Home: resolve => require(['./Home.vue'], resolve),
  Untodo: resolve => require(['./Untodo.vue'], resolve),
  Havedo: resolve => require(['./Havedo.vue'], resolve),
  HavedoList: resolve => require(['./HavedoList.vue'], resolve),
  Todo: resolve => require(['./Todo.vue'], resolve)
}
