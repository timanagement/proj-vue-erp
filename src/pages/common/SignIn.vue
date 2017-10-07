<template>
  <section class="m-t-lg wrapper animated fadeInUp">
    <div class="container aside-xxl">
      <section class="panel panel-default bg-white no-border" :style="signOffset">
        <header class="panel-heading text-center"><img src="../../assets/images/logo_new.png" alt="logo"></header>
        <el-form label-position="left" label-width="0px" class="panel-body wrapper-lg"
                 v-loading="login_loading"
                 element-loading-text="正在登录..."
                 :model='data'
                 :rules="rule_data"
                 ref='data'
                 @keyup.native.enter="login('data')">
          <el-form-item prop='username'>
            <el-select v-model="data.username"
                       filterable
                       allow-create
                       placeholder="用户名">
              <el-option
                      v-for="item in options"
                      :key="item.label"
                      :label="item.label"
                      :value="item.label">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop='password'>
            <el-input type="password"
                      auto-complete="off"
                      size="large"
                      placeholder="密码"
                      v-model='data.password'>
            </el-input>
          </el-form-item>
          <el-form-item class="text-center">
            <el-button type="success" @click='login("data")'>登录</el-button>
            <el-button @click='resetForm("data")'>重置</el-button>

          </el-form-item>
        </el-form>
      </section>
      <div class="text-center padder">
        <p class="text-dark"><strong>浙江商翔网络科技股份有限公司<br>Copyright &copy 2017</strong></p>
      </div>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  import Api from 'api'
  export default{
    name: 'signin',
    data() {
      return {
        /* 开发用户数据 */
        options: [{
          label: '王文军'
        }, {
          label: '郑志恒'
        }, {
          label: '顾重喜'
        }, {
          label: '骆智超'
        }, {
          label: '童仕海'
        }, {
          label: '荆泽'
        }, {
          label: '汪涛'
        }, {
          label: '赵荣'
        }, {
          label: '李放'
        }, {
          label: '朱豪龙'
        }, {
          label: '张秋阳'
        }, {
          label: '徐秋爽'
        }],
        /* 登录框动态偏移 */
        signOffset: {
          marginTop: ''
        },
        /* 登陆状态 */
        login_loading: false,
        /* 登陆信息 */
        data: {
          username: '',
          password: '123456',
          clientType: 2
        },
        /* 校验规则 */
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
          }]
        }
      }
    },
    components: {},
    watch: {},
    methods: {
      // 登录
      login(ref) {
        this.$refs[ref].validate(valid => {
          if (valid) {
            this.login_loading = true
            Api.post('/index/login/login', this[ref], res => {
              if (res.status === 200) {
                this.$store.dispatch('update_userInfo', {
                  user: res.data
                }).then(() => {
                  this.login_loading = false
                  this.$message.success(`欢迎回来: ${res.data.u_truename}`)
                  this.$router.push('/')
                })
              } else if (res.status === 401) {
                this.login_loading = false
                this.$message.error('用户名或密码错误!')
              }
            }, err => {
              console.log(`登陆错误${err}`)
              this.login_loading = false
            })
          }
        })
      },
      // 重置表单
      resetForm(ref) {
        this.$refs[ref].resetFields()
      }
    },
    mounted() {
      /* 设置背景class */
      document.querySelector('html').className = 'bg-signin'
      /* 更新浏览器信息 */
      this.$store.dispatch('update_sys')
      // 设置登录框上外边距
      this.signOffset.marginTop = (parseInt(document.documentElement.clientHeight) / 2 - 220) + 'px'
    }
  }
</script>
