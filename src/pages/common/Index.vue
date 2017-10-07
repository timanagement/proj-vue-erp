<template>
  <section class="vbox">
    <!-- 头部导航 -->
    <head-nav></head-nav>
    <!-- 主体内容 -->
    <section>
      <section class="hbox stretch">
        <!-- 左侧菜单 -->
        <aside-nav></aside-nav>
        <!-- 中心内容 -->
        <section @click="$store.dispatch('hide_leftNav')">
          <section class="vbox">
            <section class="scrollable padder m-b-sm">
              <!-- 面包屑 -->
              <el-breadcrumb class="breadcrumb no-border no-radius b-b b-light pull-in">
                <el-breadcrumb-item v-for="item in breadcrumb" :key="item.name">
                  <i class="fa m-r-xxs" :class="item.meta.icon"></i>
                  {{item.name}}
                </el-breadcrumb-item>
              </el-breadcrumb>
              <!-- 页面内容 -->
              <transition name="custom-classes-transition"
                          enter-active-class="animated fadeInRight"
                          leave-active-class="animated fadeOutLeft"
                          mode="out-in">
                <router-view></router-view>
              </transition>
            </section>
          </section>
        </section>
      </section>
    </section>
    <div class="modal" v-if="$store.state.user.reLogFlag" style="display: block;">
      <div class="modal-over">
        <div class="modal-center animated fadeInUp text-center" style="width:200px;margin:-80px 0 0 -100px;">
          <div class="thumb-md"><img src="../../assets/images/avatar_default.jpg" class="img-circle b-a b-light b-3x">
          </div>
          <p class="text-white h4 m-t m-b">{{$store.state.user.userInfo.u_truename}}</p>
          <div class="input-group">
            <input type="password" v-model.trim="reLogData.password" class="form-control text-sm"
                   placeholder="请输入密码以重新登录" @keyup.enter="reLogSubmit">
            <span class="input-group-btn">
        <button class="btn btn-success" type="button" @click="reLogSubmit"><i class="fa fa-arrow-right"></i></button>
      </span>
          </div>
          <button type="button" class="btn btn-link" @click="reLogCancel">切换账号
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
<script type="text/ecmascript-6">
  import {nav} from 'components'
  import Api from 'api'
  export default{
    name: 'index',
    data() {
      return {
        // 重新登陆数据
        reLogData: {
          username: this.$store.state.user.userInfo.u_truename,
          password: '',
          clientType: 2
        },
        // 重新登录剩余次数
        reLogLeft: 3
      }
    },
    components: {
      'head-nav': nav.HeadNav,
      'aside-nav': nav.AsideNav
    },
    watch: {},
    computed: {
      breadcrumb() {
        let list = []
        this.$route.matched.forEach(item => {
          item.name && list.push(item)
        })
        return list
      }
    },
    methods: {
      // 再登陆
      reLogSubmit() {
        if (this.reLogData.password !== '') {
          if (this.reLogLeft < 1) {
            this.$message.error('已达重试次数上限,返回登陆页面!')
            this.reLogCancel()
          } else {
            Api.post('/index/login/login', this.reLogData, res => {
              if (res.status === 200) {
                this.$store.dispatch('update_userInfo', {
                  user: res.data
                }).then(() => {
                  this.$store.dispatch('show_relog_modal')
                  location.reload()
                })
              } else if (res.status === 401) {
                this.$message.error(`密码错误,剩余重试次数:${this.reLogLeft--}`)
                this.reLogData.password = ''
              }
            }, err => {
              this.$message.error('登陆错误!')
              console.log(`登陆错误:${err}`)
            })
          }
        }
      },
      // 退回登陆
      reLogCancel() {
        this.$store.dispatch('remove_userInfo').then(() => {
          this.$router.push('/signin')
          this.$store.dispatch('hide_relog_modal')
        })
      }
    },
    created() {
      this.$store.dispatch('update_sys')
      document.querySelector('html').className = 'app'
    }
  }
</script>

<style scoped>
  section.stretch.hbox > section {
    transition: transform 0.2s ease-in-out
  }
</style>
