<style scoped>
  .Down {
    position: relative
  }

  .Down img {
    position: absolute;
    top: 50px;
    left: -55px;
    width: 150px;
    z-index: 5;
  }

  .Down:hover img {

    display: block !important

  }
</style>
<template>
  <!-- 头部 -->
  <header class="bg-dark dk header navbar navbar-fixed-top-xs">
    <!-- 左侧logo及移动端菜单和用户信息控制按钮 -->
    <div class="navbar-header aside-md">
      <a class="btn btn-link visible-xs" @click="$store.dispatch('toggle_show_leftNav')"
         :class="{'active':this.$store.state.global.show_leftNav}">
        <i class="fa fa-bars"></i>
      </a>
      <a href='javascript:' class="navbar-brand" @click="handelLogoClick">
        <img src="../../assets/images/logo.png" class="m-r-sm">商翔集团
      </a>
      <a class="btn btn-link visible-xs" @click="show_user = !show_user"
         :class="{'active':show_user}" v-clickOutSide="hide_show_user">
        <i class="fa fa-cog"></i>
      </a>
    </div>
    <!-- 右侧 -->
    <ul class="nav navbar-nav navbar-right m-n  hidden-xs nav-user"
        :class="{'open':show_user}">
      <!-- 安卓下载 -->
      <li class="hidden-xs Down">
        <a href="javascript:">
          <i class="fa fa-android"></i>
        </a>
        <img src="../../assets/images/androidlogo.png" alt="安卓下载" class="hide animated fadeInDown">
      </li>

      <!-- 苹果下载 -->
      <li class="hidden-xs Down">
        <a href="javascript:">
          <i class="fa fa-apple"></i>
        </a>
        <img src="../../assets/images/IOSlogo.jpg" alt="苹果下载" class="hide animated fadeInDown">
      </li>

      <!-- 账户信息 -->
      <li :class="{'open':show_usersetting}" class="dropdown">
        <a href="javascript:" @click="show_usersetting = !show_usersetting" v-clickOutSide="hide_show_usersetting">
          {{this.$store.state.user.userInfo.u_truename}}
          <b class="caret"></b>
        </a>
        <ul class="dropdown-menu animated fadeInRight">
          <span class="arrow top"></span>
          <li><a href="javascript:" @click="upPwdDialog = true">修改密码</a></li>
          <li class="divider"></li>
          <li>
            <router-link to="/Documentation">CSS文档</router-link>
          </li>
          <li>
            <router-link to="/apis">API文档</router-link>
          </li>
          <li class="visible-xs"><a href="javascript:" @click="logout">注销</a></li>
        </ul>
      </li>

      <!-- 退出 -->
      <li class="hidden-xs">
        <a href="javascript:" @click="logout" class="dropdown-toggle dker fa fa-sign-out"></a>
      </li>
    </ul>

    <!-- 修改密码 -->
    <el-dialog title="修改密码"
               v-model="upPwdDialog"
               size="tiny"
               @close="$refs.upPwdForm.resetFields()">
      <el-form :model="upPwdForm"
               :rules="upPwdRules"
               label-width="85px"
               ref="upPwdForm"
               @keyup.native.enter="submitUpPwd">
        <el-form-item label="旧密码" prop="oldPasswd">
          <el-input v-model.trim="upPwdForm.oldPasswd" auto-complete="off" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPasswd">
          <el-input v-model.trim="upPwdForm.newPasswd" auto-complete="off" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="newAgain">
          <el-input v-model.trim="upPwdForm.newAgain" auto-complete="off" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$refs.upPwdForm.resetFields()">重置</el-button>
        <el-button type="primary" @click="submitUpPwd">确定</el-button>
      </div>
    </el-dialog>
  </header>

</template>

<script type='text/ecmascript-6'>
  import screenfull from 'screenfull'
  import {scroll} from 'util'
  import Api from 'api'
  export default{
    name: 'header-nav',
    data() {
      /* 修改密码校验 */
      let oldPwd = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('旧密码不能为空'))
        }
        callback()
      }
      let newPwd = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('请输入新密码'))
        } else if (value.length < 6 || value.length > 16) {
          return callback(new Error('长度应在 6 到 16 个字符'))
        } else if (!/^[0-9a-zA-Z]{6,16}$/.test(value)) {
          return callback(new Error('只能包含字母或数字'))
        } else if (this.upPwdForm.newAgain !== '') {
          this.$refs.upPwdForm.validateField('newAgain')
        }
        callback()
      }
      let conPwd = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('请再次输入新密码'))
        } else if (value.length < 6 || value.length > 16) {
          return callback(new Error('长度在 6 到 16 个字符'))
        } else if (!/^[0-9a-zA-Z]{6,16}$/.test(value)) {
          return callback(new Error('只能包含字母或数字'))
        } else if (value !== this.upPwdForm.newPasswd) {
          return callback(new Error('两次输入密码不一致!'))
        }
        callback()
      }
      return {
        unreadNotice: [],
        upPwdDialog: false,
        upPwdForm: {
          oldPasswd: '',
          newPasswd: '',
          newAgain: ''
        },
        upPwdRules: {
          oldPasswd: [
            {validator: oldPwd, trigger: 'blur'}
          ],
          newPasswd: [
            {validator: newPwd, trigger: 'blur'}
          ],
          newAgain: [
            {validator: conPwd, trigger: 'blur'}
          ]
        },
        show_user: false,
        show_usersetting: false
      }
    },
    methods: {
      hide_show_usersetting() {
        this.show_usersetting = false
      },
      hide_show_user() {
        this.show_user = false
      },
      /**
       * 重置密码
       */
      submitUpPwd() {
        this.$refs.upPwdForm.validate((valid) => {
          if (valid) {
            let para = Object.assign({id: this.$store.state.user.userInfo.u_id}, this.upPwdForm)
            Api.put('/modifypwds', para, res => {
              if (res.data === 'success') {
                this.upPwdDialog = false
                this.$alert('修改成功,请重新登陆', '提示', {
                  confirmButtonText: '确定',
                  callback: () => {
                    this.$store.dispatch('remove_userInfo').then(() => {
                      this.$router.push('/signin')
                    })
                  }
                })
              } else {
                this.$message.error(res.data)
              }
            }, () => {
              this.upPwdDialog = false
            })
          }
        })
      },
      /**
       * 退出登录
       */
      logout() {
        this.$confirm('你确定退出登录么?', '确认退出', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('remove_userInfo').then(() => {
            this.$message({
              type: 'success',
              message: '成功退出登录',
              showClose: true
            })
            this.$router.push('/signin')
          }).catch(e => console.log('移除用户信息出错:' + e))
        }).catch(() => {
        })
      },
      /**
       * PC端全屏/移动端返回顶部
       * */
      handelLogoClick() {
        if (screenfull.enabled && this.$store.state.user.sys === '2') {
          screenfull.toggle()
        } else {
          scroll.inchingScroll(document.body.scrollTop, 0, 4, function (value) {
            document.body.scrollTop = value
          })
        }
      }
    }
  }
</script>
