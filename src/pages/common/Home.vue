<template>
  <section class="vbox" @click="hide_popup">
    <head-nav></head-nav>
    <!-- 主体内容 -->
    <section>
      <section class="hbox stretch">
        <aside-nav></aside-nav>
        <section id="content">
          <section class="vbox">
            <!-- 主视图 -->
            <router-view></router-view>
          </section>
        </section>

        <!-- 右侧隐藏消息列表 -->
        <aside class="bg-light lter b-l aside-md hide" :class="{'show animated fadeInRight':this.$store.state.global.show_all_notification}" id="notes">
          <div class="wrapper">Notification</div>
        </aside>
      </section>
    </section>
  </section>
</template>

<script>
  import {nav} from '@/components'
  export default{
    name: 'home',
    data () {
      return {}
    },
    components: {
      'head-nav':nav.HeadNav,
      'aside-nav':nav.AsideNav,
    },
    watch: {},
    methods: {
      /**
       * 隐藏小弹窗
       * */
      hide_popup(){
        /* 隐藏通知信息 */
        this.$store.dispatch('hide_notification');
      },
    },
    created () {
      document.querySelector('html').className = 'app';
    }
  }
</script>
