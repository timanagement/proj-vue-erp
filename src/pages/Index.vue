<template>
  <section class="vbox">
    <header-nav></header-nav>
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
  import HeaderNav from '@/pages/common/HeadNav'
  import AsideNav from '@/pages/common/AsideNav'
  export default{
    data () {
      return {}
    },
    components: {HeaderNav, AsideNav},
    watch: {},
    methods: {},
    created () {
      document.querySelector('html').className = 'app';
    }
  }
</script>
