<template>
  <div class="row m-n">
    <div class="col-sm-4 col-sm-offset-4">
      <div class="text-center m-b-lg">
        <h1 class="h text-white animated fadeInDownBig">404</h1>
      </div>
      <div class="list-group m-b-sm bg-white m-b-lg">
        <router-link to="/" class="list-group-item">
          <i class="fa fa-chevron-right icon-muted"></i>
          <i class="fa fa-fw fa-home icon-muted"></i>
          返回首页
        </router-link>
        <a href="javascript:" class="list-group-item">
          <i class="fa fa-chevron-right icon-muted"></i>
          <i class="fa fa-fw fa-question icon-muted"></i>
          发送邮件
        </a>
        <a href="javascript:" class="list-group-item">
          <i class="fa fa-chevron-right icon-muted"></i>
          <span class="badge">0579 8994 9063</span>
          <i class="fa fa-fw fa-phone icon-muted"></i>
          联系管理员
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'errpage',
    data () {
      return {}
    },
    components: {},
    watch: {},
    methods: {},
    created () {

    }
  }
</script>
