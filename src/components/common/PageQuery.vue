<template>
  <el-form :inline="true" :model='para' ref="queryForm" @keyup.native.enter="getData">
    <slot></slot>
    <el-form-item>
      <el-button type="primary" size="small" @click='getData'>查询</el-button>
      <el-button type="default" size="small" @click.native="resetForm('queryForm')">重置</el-button>
    </el-form-item>
    <!-- 处理bug:如果表单里只有一个type=”text”的input，不管按钮是什么type，回车键生效 -->
    <input type="text" class="hide">
  </el-form>
</template>

<script type="text/ecmascript-6">
  export default{
    name: 'page-query',
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
    watch: {
      $route() {
        this.resetForm('queryForm')
      }
    },
    methods: {
      //  重置
      resetForm(formName) {
        this.$refs[formName].resetFields()
        this.getData()
      }
    }
  }
</script>
