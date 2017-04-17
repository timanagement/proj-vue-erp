<template>
  <div class="vbox" @click="hide_popup">
    <!-- 头部导航 -->
    <head-nav></head-nav>
    <!-- 主体内容 -->
    <section class="hbox stretch">
      <!-- 左侧菜单 -->
      <aside-nav></aside-nav>
      <!-- 中心内容 -->
      <section>
        <!-- 面包屑 -->
        <div class="fixed-top-xs bg-white b-b">
          <el-breadcrumb class="m-sm">
            <!-- 后退 -->
            <span class="pull-left m-r-md visible-xs"><i class="fa fa-chevron-left" @click="$router.go(-1)"></i></span>
            <!-- 前进 -->
            <span class="pull-right visible-xs"><i class="fa fa-chevron-right" @click="$router.go(1)"></i></span>
            <el-breadcrumb-item v-for="item in breadcrumb" :key="item.name">
              <i class="fa m-r-xxs" :class="item.meta.icon"></i>
              {{item.name}}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <section class="vbox">
          <section class="scrollable padder">
            <!--　页面标题　-->
            <div class="m-b-md" v-if="$route.name != '主页'">
              <transition name="custom-classes-transition"
                            enter-active-class="animated fadeInLeft"
                          leave-active-class="animated fadeOutLeft"
                          mode="out-in">
                <h3 class="m-t-sm">{{$route.name}}</h3>
              </transition>
            </div>
            <!-- 页面内容 -->
            <transition name="custom-classes-transition"
                        enter-active-class="animated fadeInUp"
                        leave-active-class="animated fadeOutDown"
                        mode="out-in">
              <router-view></router-view>
            </transition>
          </section>
        </section>
      </section>
    </section>
  </div>
</template>

<script>
  import {nav} from '@/components'
  export default{
    name: 'index',
    data () {
      return {}
    },
    components: {
      'head-nav': nav.HeadNav,
      'aside-nav': nav.AsideNav,
    },
    watch: {},
    computed: {
      breadcrumb () {
        let list = [];
        this.$route.matched.forEach(item => {
          item.name && list.push(item);
        });
        return list;
      }
    },
    methods: {
      /**
       * 隐藏小弹窗
       * */
      hide_popup(){
        this.$store.dispatch('hide_popup');
      },
    },
    created () {
      this.$store.dispatch('update_sys');
      document.querySelector('html').className = 'app';
    }
  }
</script>

<style scoped>
  section.stretch.hbox > section{
    transition: transform 0.2s ease-in-out;
  }
</style>
