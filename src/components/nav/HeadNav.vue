<template>
  <!-- 头部 -->
  <header class="bg-dark dk header navbar navbar-fixed-top-xs">
    <!-- 左侧logo及移动端菜单和用户信息控制按钮 -->
    <div class="navbar-header aside-md">
      <a class="btn btn-link visible-xs" @click="toggle_show_leftnav"
         :class="{'active':this.$store.state.global.show_leftNav}">
        <i class="fa fa-bars"></i>
      </a>
      <a href='javascript:' class="navbar-brand" @click="screenfull">
        <img src="../../assets/images/logo.png" class="m-r-sm">SX ERP
      </a>
      <a class="btn btn-link visible-xs" @click="toggle_show_user"
         :class="{'active':this.$store.state.global.show_user}">
        <i class="fa fa-cog"></i>
      </a>
    </div>
    <!-- 活动 -->
    <!--<ul class="nav navbar-nav hidden-xs">
      <li class="dropdown">
        <a href="javascript:" class="dropdown-toggle dker" data-toggle="dropdown">
          <i class="fa fa-building-o"></i>
          <span class="font-bold">活动</span>
        </a>
        <section class="dropdown-menu aside-xl on animated fadeInLeft no-borders lt">
          <div class="wrapper lter m-t-n-xs">
            <a href="#" class="thumb pull-left m-r">
              <img src="../../assets/images/avatar.jpg" class="img-circle">
            </a>
            <div class="clear">
              <a href="#">
                <span class="text-white font-bold">@Mike Mcalidek</span>
              </a>
              <small class="block">Art Director</small>
              <a href="#" class="btn btn-xs btn-success m-t-xs">升级</a>
            </div>
          </div>
          <div class="row m-l-none m-r-none m-b-n-xs text-center">
            <div class="col-xs-4">
              <div class="padder-v"><span class="m-b-xs h4 block text-white">245</span>
                <small class="text-muted">粉丝</small>
              </div>
            </div>
            <div class="col-xs-4 dk">
              <div class="padder-v"><span class="m-b-xs h4 block text-white">55</span>
                <small class="text-muted">喜欢</small>
              </div>
            </div>
            <div class="col-xs-4">
              <div class="padder-v"><span class="m-b-xs h4 block text-white">2,035</span>
                <small class="text-muted">照片</small>
              </div>
            </div>
          </div>
        </section>
      </li>
    </ul>-->
    <!-- 右侧 -->
    <ul class="nav navbar-nav navbar-right hidden-xs nav-user" :class="{'open':this.$store.state.global.show_user}">
      <!-- 通知信息 -->
      <li class="hidden-xs" :class="{'open':this.$store.state.global.show_notification}">
        <a href="javascript:" class="dropdown-toggle dk" @click.stop="toggle_show_notification">
          <i class="fa fa-bell"></i>
          <span class="badge badge-sm up bg-danger m-l-n-sm count" v-show="notification.length">{{notification.length}}</span>
        </a>
        <section class="dropdown-menu aside-xl">
          <section class="panel bg-white">
            <header class="panel-heading b-light bg-light">
              <strong v-if="notification.length">你有 <span class="count">{{notification.length}}</span> 条通知</strong>
              <strong v-else>暂无通知</strong>
            </header>
            <div class="list-group list-group-alt animated fadeInRight">
              <a href="javascript:" class="media list-group-item">
                <span class="pull-left thumb-sm">
                    <img src="../../assets/images/avatar.jpg" alt="John said" class="img-circle">
                </span>
                <span class="media-body block m-b-none">
                  Use awesome animate.css<br>
                  <small class="text-muted">10 minutes ago</small>
                </span>
              </a>
              <a href="javascript:" class="media list-group-item">
                <span class="media-body block m-b-none"> 1.0 initial released<br>
                    <small class="text-muted">1 hour ago</small>
                </span>
              </a>
            </div>
            <footer class="panel-footer text-sm">
              <a href="#" class="pull-right">
                <i class="fa fa-cog"></i>
              </a>
              <a href="#notes" data-toggle="class:show animated fadeInRight">查看全部通知</a>
            </footer>
          </section>
        </section>
      </li>
      <!-- 查询框 -->
      <li class="dropdown hidden-xs">
        <a href="#" @click="logout" class="dropdown-toggle dker" data-toggle="dropdown">
          <i class="fa fa-fw fa-search"></i>
        </a>
        <section class="dropdown-menu aside-xl animated fadeInUp">
          <section class="panel bg-white">
            <form role="search">
              <div class="form-group wrapper m-b-none">
                <div class="input-group">
                  <input type="text" class="form-control" placeholder="查询">
                  <span class="input-group-btn">
                                      <button type="submit" class="btn btn-info btn-icon">
                                          <i class="fa fa-search"></i>
                                      </button>
                                  </span>
                </div>
              </div>
            </form>
          </section>
        </section>
      </li>
      <!-- 账户信息 -->
      <li class="dropdown">
        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                  <span class="thumb-sm avatar pull-left">
                      <img src="../../assets/images/avatar.jpg">
                  </span> John.Smith
          <b class="caret"></b>
        </a>
        <ul class="dropdown-menu animated fadeInRight">
          <span class="arrow top"></span>
          <li><a href="#">设置</a></li>
          <li><a href="profile.html">账户</a></li>
          <li>
            <a href="#">
              <span class="badge bg-danger pull-right">3</span> 通知
            </a>
          </li>
          <li><a href="docs.html">帮助</a></li>
          <li class="divider"></li>
          <li><a href="javascript:" data-toggle="ajaxModal" @click="logout">注销</a></li>
        </ul>
      </li>
    </ul>
  </header>
</template>

<script>
  import screenfull from 'screenfull'
  export default{
    name: 'header-nav',
    data () {
      return {
        notification:[

        ]
      }
    },
    components: {},
    watch: {},
    methods: {
      /**
       * 退出登录
       */
      logout() {
        this.$confirm('你确定退出登录么?', '确认退出', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('remove_userinfo').then(() => {
            this.$message({
              type: 'success',
              message: '成功退出登录',
              showClose: true
            });
            this.$router.push('/signin');
          }).catch(e => console.log('移除用户信息出错:' + e));
        }).catch(() => {
          this.$message({
            message: '已取消',
            showClose: true
          });
        });
      },
      /**
       * 显示隐藏侧边导航 (移动端下)
       * */
      toggle_show_leftnav(){
        this.$store.dispatch('toggle_show_leftnav');
      },
      /**
       * 显示隐藏用户信息 (移动端下)
       * */
      toggle_show_user(){
        this.$store.dispatch('toggle_show_user');
      },
      /**
       * 显示隐藏用户信息 (移动端下)
       * */
      toggle_show_notification(){
        this.$store.dispatch('toggle_show_notification');
      },
      /**
       * 全屏/取消全屏
       * */
      screenfull(){
        if (screenfull.enabled) {
          screenfull.toggle();
        }
      }
    },
    mounted () {
    }
  }
</script>
