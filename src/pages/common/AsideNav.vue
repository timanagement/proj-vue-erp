<template>
  <!-- .左侧导航 -->
  <aside class="bg-dark lter aside-md hidden-print" id="nav">
    <section class="vbox">
      <section class="w-f scrollable">
        <div class="slim-scroll" data-height="auto" data-disable-fade-out="true"
             data-distance="0" data-size="5px" data-color="#333333">
          <!-- nav -->
          <nav class="nav-primary hidden-xs">
            <el-menu theme="dark" :default-active="$route.path" :unique-opened="true" :router="true">
              <el-submenu v-for="firItem in menuList" v-if="firItem.children" :index="firItem.link" :key="firItem.id">
                <template slot="title"><i class="fa" :class="firItem.icon"></i>{{firItem.name}}</template>
                <el-submenu v-for="secItem in firItem.children" v-if="secItem.children" index="secItem.link" :key="secItem.id">
                  <template slot="title">
                    <i class="fa" :class="secItem.icon?secItem.icon:'fa-circle-o'"></i>{{secItem.name}}
                  </template>
                  <el-menu-item v-for="thiItem in secItem.children" :index="thiItem.link" :key="thiItem.id">
                    <i class="fa" :class="thiItem.icon?thiItem.icon:'fa-circle-o'"></i>{{thiItem.name}}
                  </el-menu-item>
                </el-submenu>
                <el-menu-item v-else :index="secItem.link">
                  <i class="fa" :class="secItem.icon?secItem.icon:'fa-circle-o'"></i>{{secItem.name}}
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="firItem.link"><i class="fa" :class="firItem.icon"></i>{{firItem.name}}</el-menu-item>
            </el-menu>
          </nav>
          <!-- / nav -->
        </div>
      </section>
      <footer class="footer lt hidden-xs b-t b-dark">
        <div id="chat" class="dropup">
          <section class="dropdown-menu on aside-md m-l-n">
            <section class="panel bg-white">
              <header class="panel-heading b-b b-light">Active chats</header>
              <div class="panel-body animated fadeInRight">
                <p class="text-sm">No active chats.</p>
                <p><a href="#" class="btn btn-sm btn-default">Start a chat</a></p>
              </div>
            </section>
          </section>
        </div>
        <div id="invite" class="dropup">
          <section class="dropdown-menu on aside-md m-l-n">
            <section class="panel bg-white">
              <header class="panel-heading b-b b-light"> John
                <i class="fa fa-circle text-success"></i>
              </header>
              <div class="panel-body animated fadeInRight">
                <p class="text-sm">No contacts in your lists.</p>
                <p>
                  <a href="#" class="btn btn-sm btn-facebook">
                    <i class="fa fa-fw fa-facebook"></i> Invite from Facebook
                  </a>
                </p>
              </div>
            </section>
          </section>
        </div>
        <a href="#nav" data-toggle="class:nav-xs"
           class="pull-right btn btn-sm btn-dark btn-icon">
          <i class="fa fa-angle-left text"></i>
          <i class="fa fa-angle-right text-active"></i>
        </a>
        <div class="btn-group hidden-nav-xs">
          <button type="button" title="Chats" class="btn btn-icon btn-sm btn-dark"
                  data-toggle="dropdown" data-target="#chat">
            <i class="fa fa-comment-o"></i>
          </button>
          <button type="button" title="Contacts" class="btn btn-icon btn-sm btn-dark"
                  data-toggle="dropdown" data-target="#invite">
            <i class="fa fa-facebook"></i>
          </button>
        </div>
      </footer>
    </section>
  </aside>
</template>

<script>
  export default{
    name: 'aside-nav',
    data () {
      return {
        menuList: []
      }
    },
    components: {},
    watch: {},
    methods: {},
    created () {
      this.$http.get('leftNav.json').then(res=>this.menuList = res.data).catch(err=>console.log(err))
    }
  }
</script>
