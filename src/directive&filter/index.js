/**
 * Created by GiantX on 2017/5/5.
 */
import Vue from 'vue'
import Directives from './directive'
import Filter from './filter'

Object.keys(Directives).forEach(key => {
  Vue.directive(key, Directives[key])
})

Object.keys(Filter).forEach(key => {
  Vue.filter(key, Filter[key])
})
