<style scoped>
  .Down {
    position: relative;
  }
  .Down img {
    position: absolute;
    top: 50px;
    left: -55px;
    width: 150px;
    z-index: 5;
  }
  .Down:hover img {

    display: block !important;

  }
</style>
<template>
  <!-- 头部 -->
  <header class="bg-dark dk header navbar navbar-fixed-top-xs">
    <!-- 左侧logo及移动端菜单和用户信息控制按钮 -->
    <div class="navbar-header aside-md">
      <a class="btn btn-link visible-xs" @click.stop="toggle_show_leftnav"
         :class="{'active':this.$store.state.nav.show_leftNav}">
        <i class="fa fa-bars"></i>
      </a>
      <a href='javascript:' class="navbar-brand" @click="screenfull">
        <img src="../../assets/images/logo.png" class="m-r-sm">商翔集团
      </a>
      <a class="btn btn-link visible-xs" @click.stop="toggle_show_user"
         :class="{'active':this.$store.state.nav.show_user}">
        <i class="fa fa-cog"></i>
      </a>
    </div>
    <!-- 右侧 -->
    <ul class="nav navbar-nav navbar-right m-n  hidden-xs nav-user"
        :class="{'open':this.$store.state.nav.show_user}">
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
      <li :class="{'open':this.$store.state.nav.show_usersetting}" class="dropdown">
        <a href="javascript:" @click="toggle_show_usersetting">
          <!--<span class="thumb-sm avatar pull-left">
              <img :src="this.$store.state.user.userinfo.avatar">
          </span>--> {{this.$store.state.user.userinfo.u_truename}}
          <b class="caret"></b>
        </a>
        <ul class="dropdown-menu animated fadeInRight">
          <span class="arrow top"></span>
          <li><a href="javascript:" @click="upPwdDialog = true;">修改密码</a></li>
          <li class="divider"></li>
          <li>
            <router-link to="/Documentation">CSS文档</router-link>
          </li>
          <li>
            <router-link to="/API">API文档</router-link>
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
    <el-dialog title="修改密码" v-model="upPwdDialog" size="tiny" @close="$refs.upPwdForm.resetFields()">
      <el-form :model="upPwdForm" :rules="upPwdRules" label-width="85px" ref="upPwdForm">
        <el-form-item label="原密码" prop="oldPwd">
          <el-input v-model="upPwdForm.oldPwd" auto-complete="off" type="password"
                    @keyup.native.enter="submitUpPwd('upPwdForm')"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPwd">
          <el-input v-model="upPwdForm.newPwd" auto-complete="off" type="password"
                    @keyup.native.enter="submitUpPwd('upPwdForm')"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="conPwd">
          <el-input v-model="upPwdForm.conPwd" auto-complete="off" type="password"
                    @keyup.native.enter="submitUpPwd('upPwdForm')"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$refs.upPwdForm.resetFields()">重置</el-button>
        <el-button type="primary" @click="submitUpPwd('upPwdForm')">确定</el-button>
      </div>
    </el-dialog>
  </header>

</template>

<script type="text/ecmascript-6">
  import screenfull from 'screenfull'
  import list from '../list'
  import {commonApi} from '@/config'
  export default{
    name: 'header-nav',
    data () {
      /*　修改密码校验　*/
      let oldPwd = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('密码不能为空'));
        }
        else if (value.length < 6 || value.length > 16) {
          return callback(new Error('长度在 6 到 16 个字符'))
        }
        callback()
      };
      let newPwd = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入新密码'));
        } else if (value.length < 6 || value.length > 16) {
          return callback(new Error('长度在 6 到 16 个字符'))
        } else if (this.upPwdForm.conPwd !== '') {
          this.$refs.upPwdForm.validateField('conPwd');
        }
        callback();
      };
      let conPwd = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('请再次输入密码'));
        } else if (value.length < 6 || value.length > 16) {
          return callback(new Error('长度在 6 到 16 个字符'))
        } else if (value !== this.upPwdForm.newPwd) {
          return callback(new Error('两次输入密码不一致!'));
        }
        callback();
      };
      return {
        unreadNotice: [],
        upPwdDialog: false,
        upPwdForm: {
          oldPwd: '',
          newPwd: '',
          conPwd: ''
        },
        upPwdRules: {
          oldPwd: [
            {validator: oldPwd, trigger: 'blur'}
          ],
          newPwd: [
            {validator: newPwd, trigger: 'blur'}
          ],
          conPwd: [
            {validator: conPwd, trigger: 'blur'}
          ],

        }
      }
    },
    components: {
      'notification-item': list.NotificationItem
    },
    watch: {},
    methods: {
      /**
       * 重置密码
       */
      submitUpPwd(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let para = Object.assign({}, this.upPwdForm);
            commonApi.postData.call(this, '/common/upPwd', para, () => {
              this.$message({
                message: '修改成功,请重新登陆',
                type: 'success'
              });
              this.$store.dispatch('remove_userinfo').then(() => {
                this.upPwdDialog = false;
                this.$router.push('/signin');
              });
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
       * 显示隐藏用户设置
       * */
      toggle_show_usersetting(e){
        this.$store.state.user.sys == '2' && e.stopPropagation();
        this.$store.dispatch('toggle_show_usersetting');
      },
      /**
       * 全屏/取消全屏
       * */
      screenfull(){
        if (screenfull.enabled) {
          screenfull.toggle();
        }
      },
    },
    beforeMount () {
    },
  }
</script>
