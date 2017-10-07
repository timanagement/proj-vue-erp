<template>
  <div>
    <!-- 页头 -->
    <page-title title="已办" :attach="para.op | opType"></page-title>

    <!-- 查询 -->
    <page-query :para="para" :getData="getData">
      <el-form-item prop="uname">
        <el-input placeholder="申请人" size="small" v-model='para.uname'></el-input>
      </el-form-item>
      <el-form-item prop="u_dept">
        <el-input placeholder="所在部门" size="small" v-model='para.u_dept'></el-input>
      </el-form-item>
    </page-query>

    <!-- 列表 -->
    <el-table
        :data="data"
        border
        @row-click="handleHaCheck"
        v-loading="listLoading"
        :max-height="$store.state.global.listMaxHeight">
      <el-table-column
          prop="uname"
          label="申请人"
          width="100">
      </el-table-column>
      <el-table-column
          prop="u_dept"
          label="所在部门"
          min-width="130">
      </el-table-column>
      <el-table-column
          prop="fname"
          label="类型"
          width="120">
      </el-table-column>
      <el-table-column
          prop="detail"
          label="详细说明"
          min-width="200">
        <template scope="scope">
          <span v-html="scope.row.detail"></span>
        </template>
      </el-table-column>
      <el-table-column
          prop="creadetime"
          label="接收时间"
          width="140">
      </el-table-column>
      <el-table-column
          prop="addtime"
          label="处理时间"
          width="140">
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <page-pagination :getData="getData" :para="para"></page-pagination>
  </div>
</template>

<script type="text/ecmascript-6">
  import {commonList} from 'mixins'
  export default{
    name: 'havedo',
    data() {
      return {
        // 页面查询参数
        para: {
          uname: '',
          u_dept: '',
          op: this.$route.params.op
        },
        // 接口地址
        API_URL: '/undotoeds/create'
      }
    },
    mixins: [commonList],
    methods: {
      // 已办详情
      handleHaCheck(row) {
        this.$router.push(`/applyLists/${this.para.op}/v/${row.id}`)
      }
    }
  }
</script>
