<style>
  .el-icon-eye, .el-icon-eye-slash {
    font-family: FontAwesome !important;
  }

  .el-icon-eye:before {
    content: '\f06e';
  }

  .el-icon-eye-slash:before {
    content: '\f070';
  }
</style>
<template>
  <section class="m-t-lg wrapper animated fadeInUp">
    <div class="container aside-xxl">
      <section class="panel panel-default bg-white no-border" :style="signOffset">
        <header class="panel-heading text-center"><img src="../../assets/images/logo_new.png" alt="logo"></header>
        <el-form label-position="left" label-width="0px" class="panel-body wrapper-lg"
                 v-loading="$store.state.global.ajax_loading"
                 element-loading-text="正在登录..."
                 :model='data'
                 :rules="rule_data"
                 ref='data'
                 @keyup.native.enter="login('data')">
          <el-form-item prop='username'>
            <el-input type="text"
                      auto-complete="off"
                      placeholder="用户名"
                      size="large"
                      v-model='data.username'>
            </el-input>
          </el-form-item>
          <el-form-item prop='password'>
            <el-input :type="pwdType"
                      auto-complete="off"
                      :icon="pwdIcon"
                      size="large"
                      placeholder="密码"
                      v-model='data.password'
                      :on-icon-click="handleIconClick">
            </el-input>
          </el-form-item>
          <el-checkbox :checked='remember.remember_flag'
                       v-model='remember.remember_flag'>记住用户名
          </el-checkbox>
          <el-form-item class="text-center">
            <el-button type="success" @click='login("data")'>登录</el-button>
            <el-button @click='resetForm("data")'>重置</el-button>

          </el-form-item>
        </el-form>
      </section>
      <div class="text-center padder">
        <p class="text-dark"><strong>浙江商翔网络科技股份有限公司<br>Copyright &copy; 2017</strong></p>
      </div>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  import {commonApi} from '@/config';
  export default{
    name: 'signin',
    data () {
      return {
        signOffset: {
          marginTop: ''
        },
        pwdType: 'password',
        pwdIcon: 'eye-slash',
        remember: this.$store.state.user.remember,
        login_actions: {
          disabled: false
        },
        data: {
          username: '王文军',
          password: '123456',
          clientType: ''
        },
        rule_data: {
          username: [{
            required: true,
            message: '用户名不能为空！',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '密码不能为空！',
            trigger: 'blur'
          }, {
            min: 6,
            max: 16,
            message: '长度在 6 到 16 个字符',
            trigger: 'blur'

          }]
        }
      }
    },
    components: {},
    watch: {},
    methods: {
      // 登录
      login(ref) {
        this.$refs[ref].validate((valid) => {
          if (valid) {
            this.login_actions.disabled = true;

            commonApi.login.call(this, this[ref], data => {
              //登录成功之后，验证是否记住用户名，如果记住用户名，本地保存记住信息
              //如果没有记住，就初始化本地记住信息
              if (this.remember.remember_flag === true) {
                this.$store.dispatch('update_remember', {
                  remember_flag: this.remember.remember_flag,
                  remember_login_info: {
                    username: this[ref].username,
                  }
                });
              } else {
                this.$store.dispatch('remove_remember');
              }

              this.$store.dispatch('update_userinfo', {
                userinfo: data.data
              }).then(() => {
                this.login_actions.disabled = false;
                this.$message.success(`欢迎回来: ${data.data.u_truename}`);
                this.$router.push('/');
                this.$store.dispatch('hide_popup');
              });
            }, () => {
              this.login_actions.disabled = false;
            })
          }
        });
      },
      // 重置表单
      resetForm(ref) {
        this.$refs[ref].resetFields();
      },

      // 切换显示状态
      handleIconClick(){
        this.pwdType = this.pwdType == 'password' ? 'text' : 'password';
        this.pwdIcon = this.pwdIcon == 'eye' ? 'eye-slash' : 'eye'
      }
    },
    created () {

    },
    beforeMount(){
      document.querySelector('html').className = 'bg-signin';
      this.$store.dispatch('update_sys');
      this.data.clientType = this.$store.state.user.sys;
    },
    mounted(){
      // 记住密码
      if (this.remember.remember_flag === true) {
        this.data.username = this.remember.remember_login_info.username;
      }
      // 设置登录框上外边距
      this.signOffset.marginTop = (parseInt(document.documentElement.clientHeight) / 2 - 220) + 'px'
    }
  }
</script>
