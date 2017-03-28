<template>
  <section id="content" class="m-t-lg wrapper-md animated fadeInUp">
    <div class="container aside-xxl"><a class="navbar-brand block" href="javascript:">SX ERP</a>
      <section class="panel panel-default bg-white m-t-lg">
        <header class="panel-heading text-center"><strong>系统登录</strong></header>
        <el-form label-position="left" label-width="0px" class="panel-body wrapper-lg"
                 v-loading="login_actions.disabled"
                 element-loading-text="正在登录..."
                 :model='data'
                 :rules="rule_data"
                 ref='data'>
          <el-form-item prop='username'>
            <el-input type="text" auto-complete="off" placeholder="用户名"
                      v-model='data.username'
                      @keyup.native.enter="login('data')"></el-input>
          </el-form-item>
          <el-form-item prop='password'>
            <el-input type="password" auto-complete="off" placeholder="密码"
                      v-model='data.password'
                      @keyup.native.enter="login('data')"></el-input>
          </el-form-item>
          <el-checkbox :checked='remember.remember_flag'
                       v-model='remember.remember_flag'>记住密码
          </el-checkbox>
          <el-form-item>
            <el-button type="primary" @click='login("data")'>登录</el-button>
            <el-button @click='resetForm("data")'>重置</el-button>

          </el-form-item>
        </el-form>
      </section>
    </div>
  </section>
</template>

<script>
  import {user as UserApi} from '@/config/request.js';
  export default{
    name: 'signin',
    data () {
      return {
        remember: this.$store.state.user.remember,
        login_actions: {
          disabled: false
        },
        data: {
          username: '',
          password: ''
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

          }],
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
            //如果记住密码，提交的信息包括真实token，密码则是假的
            //服务端登录验证优先级：用户名必须，其次先取token，不存在时再取密码
            UserApi.login.call(this, this[ref], data => {
              //登录成功之后，验证是否记住密码，如果记住密码，本地保存记住信息
              //如果没有记住，就初始化本地记住信息
              if (this.remember.remember_flag === true) {
                this.$store.dispatch('update_remember', {
                  remember_flag: this.remember.remember_flag,
                  remember_login_info: {
                    username: this[ref].username,
                    token: data.userinfo.token
                  }
                });
              } else {
                this.$store.dispatch('remove_remember');
              }

              this.$store.dispatch('update_userinfo', {
                userinfo: data.userinfo
              }).then(() => {
                this.login_actions.disabled = false;
                this.$router.push('/');
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
    },
    created () {

    },
    beforeMount(){
      document.querySelector('html').className = 'bg-dark';
    },
    mounted(){
      // 记住密码
      if (this.remember.remember_flag === true) {
        this.data.username = this.remember.remember_login_info.username;
        this.data.password = this.remember.remember_login_info.token.substring(0, 16);
        this.$set(this.data, 'token', this.remember.remember_login_info.token);
      }
    }
  }
</script>
