<template>
  <div>
    <!-- 页头 -->
    <page-title title="Api - 列表"></page-title>

    <!-- 查询 -->
    <page-query :para="para" :getData="getData">
      <el-form-item prop="name">
        <el-input placeholder="功能名称" size="small" v-model='para.name'></el-input>
      </el-form-item>
      <el-form-item prop="path">
        <el-input placeholder="地址" size="small" v-model='para.path'></el-input>
      </el-form-item>
      <el-form-item prop="belong">
        <el-select v-model="para.belong" placeholder="所属项目" size="small">
          <el-option v-for="item in projects" :label="item" :value="item" :key="item"></el-option>
        </el-select>
      </el-form-item>
    </page-query>

    <!-- 分割线 -->
    <div class="line line-dashed b-info"></div>

    <!-- 功能按钮 -->
    <el-button-group>
      <el-button type="info" icon="plus" @click="handleCheck('a')">添加</el-button>
      <el-button type="danger" icon="delete" @click="handleDel()" :disabled="multipleSelection.length < 1">删除
      </el-button>
    </el-button-group>
    <span style="display: inline-block;" class="m-l-sm">
        <i class="fa fa-desktop"></i> : PC端
        <i class="fa fa-android m-l-xs"></i> : Android端
        <i class="fa fa-apple m-l-xs"></i> : IOS端
        <el-badge is-dot></el-badge> : 有更新
      </span>
    <!-- 列表 -->
    <el-table
        :data="data"
        border
        v-loading="listLoading"
        @selection-change="handleSelectionChange"
        :max-height="$store.state.global.listMaxHeight">
      <el-table-column
          type="selection"
          :selectable="isOptional"
          width="50">
      </el-table-column>
      <el-table-column
          prop="name"
          label="功能名称"
          min-width="120">
      </el-table-column>
      <el-table-column
          prop="path"
          label="接口地址"
          align="left"
          header-align="center"
          min-width="150">
      </el-table-column>
      <el-table-column
          prop="belong"
          label="所属项目"
          width="100">
      </el-table-column>
      <el-table-column
          prop="method"
          label="请求方法"
          class-name="text-uc"
          width="100">
      </el-table-column>
      <el-table-column
          prop="userName"
          label="创建者"
          width="80">
      </el-table-column>
      <el-table-column
          prop="used"
          label="前端状态"
          width="100">
        <template scope="scope">
          <i class="fa fa-desktop" v-if="scope.row.used.indexOf('pc') !== -1"></i>
          <i class="fa fa-android" v-if="scope.row.used.indexOf('android') !== -1"></i>
          <i class="fa fa-apple" v-if="scope.row.used.indexOf('ios') !== -1"></i>
        </template>
      </el-table-column>
      <el-table-column
          prop="isuse"
          label="后端状态"
          width="100">
        <template scope="scope">
          <i class="fa" :class="scope.row.isuse == 1 ? 'fa-check' : 'fa-times'"></i>
        </template>
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="130">
        <template scope="data">
          <el-badge :is-dot="isUpdate(data.row)">
          </el-badge>
          <el-button-group>
            <el-button @click="handleCheckAndUpdate('v',data.row)" type="primary" size="mini"
                       icon="search"></el-button>
            <el-button @click="handleCheck('u',data.row.id)" type="warning" size="mini" icon="edit"
                       :disabled="!isOptional(data.row)"></el-button>
            <el-button @click="handleDel(data.row)" type="danger" size="mini" icon="delete"
                       :disabled="!isOptional(data.row)"></el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <page-pagination :getData="getData" :para="para"></page-pagination>

    <div class="panel panel-primary" v-for="item in commonApi">
      <div class="panel-heading">
        <div>{{item.title}}</div>
      </div>
      <table class="table">
        <thead>
        <tr>
          <th width="10%">#</th>
          <th width="20%">名称</th>
          <th>说明</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(v,index) in item.data">
          <td>{{index + 1}}</td>
          <td>{{v.name}}</td>
          <td>{{v.info}}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {commonList} from 'mixins'
  import {session} from 'util'
  import Api from 'api'
  export default{
    name: 'api-list',
    data() {
      return {
        // 页面查询参数
        para: {
          name: '',
          path: '',
          belong: ''
        },
        /* 所属项目列表 */
        projects: [
          'ERP2.0',
          '商翔优选',
          '采购宝',
          '用户中心',
          '商翔通'
        ],
        commonApi: [
          {
            title: '通用请求字段',
            data: [{
              name: 'token',
              info: '用户令牌,除登陆外所有请求必须携带'
            }, {
              name: '_method',
              info: '伪装请求方法,即通过GET或POST方法提交PUT,PUT,DELETE方法时使用此字段'
            }, {
              name: 'page',
              info: '当前显示页码'
            }, {
              name: 'pageSize',
              info: '每页显示条数'
            }]
          },
          {
            title: '通用响应字段',
            data: [{
              name: 'current_page',
              info: '当前显示页码'
            }, {
              name: 'hasmore',
              info: '是否还有更多'
            }, {
              name: 'per_page',
              info: '每页显示条数'
            }, {
              name: 'total',
              info: '总条数'
            }, {
              name: 'data',
              info: '响应数据'
            }]
          },
          {
            title: '通用请求方法',
            data: [{
              name: 'GET',
              info: '仅获取数据'
            }, {
              name: 'PUT',
              info: '修改操作'
            }, {
              name: 'POST',
              info: '新增操作'
            }, {
              name: 'DELETE',
              info: '删除操作'
            }]
          }
        ],
        // 接口地址
        API_URL: '/apis'
      }
    },
    mixins: [commonList],
    methods: {
      // 当前行checkbox是否可选
      isOptional(row) {
        // 当创建者id等于登陆id时,为true - 可选
        return row.userId === this.$store.state.user.userInfo.u_id;
      },
      // 是否更新
      isUpdate(row) {
        // 为 true 表示不在已读列表中
        return row.readUser.split('|').filter(item =>
            item === this.$store.state.user.userInfo.u_id
          ).length === 0
      },
      // 详情
      handleCheckAndUpdate(type, row) {
        // 类型为查看并且未读时更新状态
        if (type === 'v' && this.isUpdate(row)) {
          Api.put(this.API_URL, {
            id: row.id,
            method: {
              readUser: `${row.readUser}|${this.$store.state.user.userInfo.u_id}`
            }
          })
        }
        this.$router.push(`${this.API_URL}/${type}/${row.id || ' '}`)
        session.set('origin_para', {type: this.API_URL, para: this.para})
      }
    }
  }
</script>
