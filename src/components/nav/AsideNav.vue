<template>
  <!-- .左侧导航 -->
  <aside class="bg-dark lter aside-md hidden-print"
         :class="{'nav-off-screen':this.$store.state.global.show_leftNav,'nav-xs':this.$store.state.global.show_leftNav}">
    <section class="vbox">
      <section class="w-f scrollable">
        <!-- nav -->
        <nav class="nav-primary hidden-xs">
          <el-menu theme="dark"
                   :default-active="$route.path"
                   unique-opened
                   v-loading="listLoading"
                   router>
            <el-submenu v-for="firItem in leftNav" v-if="firItem.children" :index="firItem.path"
                        :key="firItem.id">
              <template slot="title"><i class="fa" :class="firItem.icon"></i>{{firItem.name}}</template>
              <el-submenu v-for="secItem in firItem.children"
                          v-if="secItem.children"
                          :index="secItem.path"
                          :key="secItem.id">
                <template slot="title">
                  <i class="fa" :class="secItem.icon?secItem.icon: 'fa-circle-o'"></i>{{secItem.name}}
                </template>
                <el-menu-item v-for="thiItem in secItem.children" :index="thiItem.path"
                              :key="thiItem.id">
                  <i class="fa" :class="thiItem.icon?thiItem.icon:'fa-circle-o'"></i>{{thiItem.name}}
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="secItem.path" :key="secItem.id">
                <i class="fa" :class="secItem.icon?secItem.icon:'fa-circle-o'"></i>{{secItem.name}}
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-else :index="firItem.path" :key="firItem.id">
              <i class="fa" :class="firItem.icon"></i>{{firItem.name}}
            </el-menu-item>
          </el-menu>
        </nav>
        <!-- / nav -->
      </section>
    </section>
  </aside>
</template>

<script type='text/ecmascript-6'>
  import Api from 'api'
  export default{
    name: 'aside-nav',
    data() {
      return {
        leftNav: [],
        listLoading: false
      }
    },
    methods: {
      getData() {
        this.listLoading = true
        Api.get('/navbars', {}, res => {
          this.leftNav = res.data
          this.listLoading = false
        }, () => {
          this.listLoading = false
        })
      }
    },
    mounted() {
      this.getData()
    },
    created() {
      Api.config.BUS.$on('updateLeftNav', () => this.getData())
    }
  }
</script>
