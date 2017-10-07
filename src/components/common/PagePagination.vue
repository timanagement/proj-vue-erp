<template>
  <el-pagination
      :current-page="para.page"
      :page-size="para.pageSize"
      :total="para.total"
      layout="sizes, prev, pager, next, jumper,total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      class="text-center m-sm">
  </el-pagination>
</template>

<script type="text/ecmascript-6">
  export default{
    name: 'page-pagination',
    props: {
      para: {
        type: Object,
        require: true
      },
      getData: {
        type: Function,
        require: true
      }
    },
    methods: {
      // 分页点击
      handleCurrentChange(val) {
        this.para.page = val
        this.getData()
      },
      // 显示条数
      handleSizeChange(val) {
        this.para.pageSize = val
        this.getData()
      }
    }
  }
</script>
