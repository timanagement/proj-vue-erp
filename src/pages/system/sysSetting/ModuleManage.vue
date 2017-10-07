<template>
  <div>
    <!-- 页头 -->
    <page-title title="模块管理 - 列表"></page-title>

    <!-- 查询 -->
    <page-query :para="para" :getData="getData">
      <el-form-item prop="name">
        <el-input placeholder="模块名称" size="small" v-model='para.name'></el-input>
      </el-form-item>
      <el-form-item prop="fname">
        <el-input placeholder="所属模块" size="small" v-model='para.fname'></el-input>
      </el-form-item>
      <el-form-item prop="path">
        <el-input placeholder="路由地址" size="small" v-model='para.path'></el-input>
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

    <!-- 列表 -->
    <el-table
        :data="data"
        border
        v-loading="listLoading"
        @selection-change="handleSelectionChange"
        :max-height="$store.state.global.listMaxHeight">
      <el-table-column
          type="selection"
          min-width="50">
      </el-table-column>
      <el-table-column
          prop="name"
          label="模块名称"
          min-width="120">
      </el-table-column>
      <el-table-column
          prop="path"
          label="路由地址"
          align="left"
          header-align="center"
          min-width="150">
      </el-table-column>
      <el-table-column
          prop="fname"
          label="所属模块"
          min-width="100">
        <template scope="data">
          {{data.row.fname || '顶级'}}
        </template>
      </el-table-column>
      <el-table-column
          prop="newisdel"
          label="是否启用"
          min-width="100">
        <template scope="scope">
          <i class="fa" :class="scope.row.newisdel === '0' ? 'fa-check' : 'fa-times'"></i>
        </template>
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          min-width="110">
        <template scope="data">
          <el-button-group>
            <el-button @click="handleCheck('v',data.row.id)" type="primary" size="mini"
                       icon="search"></el-button>
            <el-button @click="handleCheck('u',data.row.id)" type="warning" size="mini" icon="edit"></el-button>
            <el-button @click="handleDel(data.row)" type="danger" size="mini" icon="delete"></el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <page-pagination :getData="getData" :para="para"></page-pagination>
  </div>
</template>

<script type="text/ecmascript-6">
  import {commonList} from 'mixins'
  export default{
    name: 'module-manage-list',
    data() {
      return {
        // 页面查询参数
        para: {
          name: '',
          path: '',
          fname: ''
        },
        // 接口地址
        API_URL: '/moduleManages'
      }
    },
    mixins: [commonList]
  }
</script>
