<template>
  <div>
    <!-- 列表 -->
    <el-table
      :data="lists"
      max-height="600"
      border
      stripe
      v-loading="para.listLoading"
      style="width: 100%">
      <el-table-column
        prop="uname"
        label="申请人"
        min-width="80">
      </el-table-column>
      <el-table-column
        prop="dept"
        label="所在部门"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="cname"
        label="所在公司"
        min-width="150">
      </el-table-column>
      <el-table-column
        prop="fname"
        label="类型"
        min-width="100">
      </el-table-column>
      <el-table-column
        label="详细说明"
        min-width="250">
        <template scope="scope">
          <span v-html="scope.row.detail"></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="creadetime"
        label="申请日期"
        min-width="180">
      </el-table-column>
      <el-table-column
        prop="addtime"
        label="接收时间"
        min-width="180">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        min-width="80">
        <template scope="scope">
          <el-button type="text" @click="checkList(scope.row.aid)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
  import {commonApi} from '@/config'
  export default{
    name: 'havedo',
    data () {
      return {
        para: {
          listLoading: false
        },
        lists: []
      }
    },
    components: {},
    watch: {},
    methods: {
      getLists(){
        this.para.listLoading = true;
        commonApi.getData.call(this, '/undotos', {}, data => {
          this.para.listLoading = false;
          this.lists = data;
        })
      },
      // 查看
      checkList(id){
        this.$message(id+'')
      }
    },
    beforeMount(){

    },
    mounted(){
      //this.getLists()
    },
    beforeMount(){
    },
    beforeDestroy(){
    },
    destroyed(){
    }
  }
</script>
