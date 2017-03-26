<template>
  <section id="content" class="m-t-lg wrapper-md animated fadeInUp">
    <div class="container aside-xxl"><a class="navbar-brand block" href="index.html">Notebook</a>
      <section class="panel panel-default bg-white m-t-lg">
        <header class="panel-heading text-center"><strong>Sign in</strong></header>
        <form action="index.html" class="panel-body wrapper-lg">
          <div class="form-group">
            <label class="control-label">Email</label>
            <input type="email" placeholder="test@example.com" class="form-control input-lg" v-model="user.name">
          </div>
          <div class="form-group">
            <label class="control-label">Password</label>
            <input type="password" id="inputPassword" placeholder="Password" class="form-control input-lg"
                   v-model="user.pwd">
          </div>
          <div class="checkbox">
            <label>
              <input type="checkbox">
              Keep me logged in </label>
          </div>
          <a href="#" class="pull-right m-t-xs">
            <small>Forgot password?</small>
          </a>
          <button type="button" @click="submit" class="btn btn-primary">Sign in</button>
        </form>
      </section>
    </div>
  </section>
</template>

<script>
  export default{
    data () {
      return {
        user: {
          name: '',
          pwd: ''
        }
      }
    },
    components: {},
    watch: {},
    methods: {
      submit(){
        if(this.user.name && this.user.pwd){
            localStorage.setItem('user',JSON.stringify(this.user));
            this.$router.replace('/');
        }
      }
    },
    created () {
      document.querySelector('html').className = 'bg-dark';
    }
  }
</script>
