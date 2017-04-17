<template>
  <!-- .左侧导航 -->
  <aside class="bg-dark lter aside-md hidden-print"
         :class="{'nav-off-screen':this.$store.state.nav.show_leftNav,'nav-xs':this.$store.state.nav.mini_leftNav}">
    <section class="vbox">
      <section class="w-f scrollable">
        <!-- nav -->
        <nav class="nav-primary hidden-xs">
          <el-menu theme="dark"
                   :default-active="$route.path"
                   unique-opened
                   router>
            <el-submenu v-for="firItem in leftNav" v-if="firItem.children" :index="firItem.path" :key="firItem.id">
              <template slot="title"><i class="fa" :class="firItem.icon"></i>{{firItem.name}}</template>
              <el-submenu v-for="secItem in firItem.children"
                          v-if="secItem.children"
                          :index="secItem.path"
                          :key="secItem.id">
                <template slot="title">
                  <i class="fa" :class="secItem.icon?secItem.icon: 'fa-circle-o'"></i>{{secItem.name}}
                </template>
                <el-menu-item v-for="thiItem in secItem.children" :index="thiItem.path" :key="thiItem.id">
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

<script>
  export default{
    name: 'aside-nav',
    data () {
      return {
        leftNav: [
          {
            "name": "主页",
            "id": 110000,
            "path": "/",
            "icon": "fa-dashboard"
          },
          {
            "name": "行政事务",
            "id": 140000,
            "path": "/administration",
            "icon": "fa-calendar",
            "children": [
              {
                "name": "日常考勤",
                "id": 140100,
                "path": "/administration/attendance",
                "icon": "",
                "children": [
                  {
                    "name": "通讯录",
                    "id": 140101,
                    "path": "/administration/attendance/Contacts",
                    "icon": ""
                  },
                ]
              },
              {
                "name": "资金使用",
                "id": 140200,
                "path": "/administration/fundManage",
                "icon": "",
                "children": [
                  {
                    "name": "日常立项",
                    "id": 140201,
                    "path": "/administration/Buttons",
                    "icon": ""
                  },
                  {
                    "name": "借款申请",
                    "id": 140202,
                    "path": "/administration/Buttons",
                    "icon": ""
                  }
                ]
              },
              {
                "name": "固定资产&用品管理",
                "id": 140300,
                "path": "/administration/suppliesManage",
                "icon": ""
              },
              {
                "name": "用车管理",
                "id": 140400,
                "path": "/administration/carManage",
                "icon": ""
              },
              {
                "name": "风险管理",
                "id": 140500,
                "path": "/administration/riskManage",
                "icon": ""
              },
              {
                "name": "其他审批",
                "id": 140600,
                "path": "/administration/otherManage",
                "icon": ""
              }
            ]
          },
          {
            "name": "系统管理",
            "id": 150000,
            "path": "/system",
            "icon": "fa-cog",
            "children": [
              {
                "name": "系统设置",
                "id": 140100,
                "path": "/system/sysSetting",
                "icon": "",
                "children": [
                  {
                    "name": "模块管理",
                    "id": 140101,
                    "path": "/system/sysSetting/ModuleManage",
                    "icon": ""
                  },
                ]
              },
            ]
          },
        ]
      }
    },
    components: {},
    watch: {},
    methods: {
    },
    beforeMount(){
    }
  }
</script>
