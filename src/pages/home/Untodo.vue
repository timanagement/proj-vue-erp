<template>
  <div>
    <!-- 页头 -->
    <page-title title="待办审批 - 列表"></page-title>

    <!-- 列表 -->
    <el-table
        :data="data"
        border
        v-loading="listLoading"
        @row-click="handleUnCheck"
        :max-height="$store.state.global.listMaxHeight">
      <el-table-column
          prop="uname"
          fixed="left"
          label="申请人"
          width="80">
      </el-table-column>
      <el-table-column
          prop="cname"
          label="所在公司"
          min-width="160">
      </el-table-column>
      <el-table-column
          prop="dept"
          label="所在部门"
          min-width="120">
      </el-table-column>
      <el-table-column
          prop="fname"
          label="类型"
          width="120">
      </el-table-column>
      <el-table-column
          label="详细说明"
          min-width="200">
        <template scope="scope">
          <span v-html="scope.row.detail"></span>
        </template>
      </el-table-column>
      <el-table-column
          prop="creadetime"
          label="申请日期"
          width="160">
      </el-table-column>
      <el-table-column
          prop="addtime"
          label="接收时间"
          width="160">
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
  import {commonList} from 'mixins'
  export default{
    name: 'untodo',
    data() {
      return {
        // 接口地址
        API_URL: '/undotos'
      }
    },
    mixins: [commonList],
    methods: {
      // 审核详情
      handleUnCheck(row) {
        this.$router.push(`/applyLists/${row.prefix}/c/${row.aid}`)
      }
    }
  }
</script>
