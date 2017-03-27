<template>
  <section class="vbox">
    <head-nav></head-nav>
    <!-- 主体内容 -->
    <section>
      <section class="hbox stretch">
        <aside-nav></aside-nav>
        <!-- 主视图 -->
        <router-view></router-view>
        <!-- 右侧隐藏消息列表 -->
        <aside class="bg-light lter b-l aside-md hide" id="notes">
          <div class="wrapper">Notification</div>
        </aside>
      </section>
    </section>
  </section>
</template>

<script>
  import {HeadNav, AsideNav} from '@/components/nav/'
  export default{
    name: 'home',
    data () {
      return {}
    },
    components: {HeadNav, AsideNav},
    watch: {},
    methods: {},
    created () {
      document.querySelector('html').className = 'app';
    }
  }
</script>
