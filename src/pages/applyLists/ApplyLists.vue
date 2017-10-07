<template>
  <div>
    <!-- 页头 -->
    <page-title :title="$route.params.op | opType"></page-title>

    <!-- 查询 -->
    <page-query :para="para" :getData="getData">
      <el-form-item prop="keyword">
        <el-input placeholder="关键字" size="small" v-model='para.keyword'></el-input>
      </el-form-item>
      <el-form-item prop="apply_start_time">
        <el-date-picker
            v-model="para.apply_start_time"
            type="date"
            size="small"
            :editable="false"
            :picker-options="startTimeOptions"
            placeholder="申请开始时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item prop="apply_end_time">
        <el-date-picker
            v-model="para.apply_end_time"
            type="date"
            size="small"
            :editable="false"
            :picker-options="endTimeOptions"
            placeholder="申请结束时间">
        </el-date-picker>
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
          :selectable="isOptional"
          width="50">
      </el-table-column>
      <el-table-column
          prop="applydate"
          label="申请时间"
          width="160">
      </el-table-column>
      <el-table-column
          prop="title"
          label="详情"
          min-width="200">
        <template scope="data">
          <span v-html="data.row.title"></span>
        </template>
      </el-table-column>
      <el-table-column
          prop="next"
          label="审核状态"
          width="150">
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="110">
        <template scope="data">
          <el-button-group>
            <el-button @click="handleCheck('v',data.row.id)" type="primary" size="mini"
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
  </div>
</template>

<script type="text/ecmascript-6">
  import {applyLists} from 'mixins'
  export default{
    name: 'apply-lists',
    mixins: [applyLists]
  }
</script>
