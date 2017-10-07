<!-- 常用表单控件 -->
<!-- 2017-05-10 -->
<template>
  <!-- 表单 -->
  <el-form :model="data" :rules="rules" :label-width="formLabelWidth" ref="editForm" v-loading="formLoading">
    <el-row :gutter="10">
    </el-row>
  </el-form>

  <!-- input -->
  <el-col :xs="24" :sm="12" :md="8" :lg="6">
    <el-form-item label="功能名称" prop="name">
      <el-input v-model="data.name" auto-complete="off" :disabled="disabled"></el-input>
    </el-form-item>
  </el-col>

  <!-- select -->
  <el-col :xs="24" :sm="12" :md="8" :lg="6">
    <el-form-item label="请求方法" prop="method">
      <el-select v-model="data.method" placeholder="请选择" :disabled="disabled">
        <el-option label="get" value="get"></el-option>
      </el-select>
    </el-form-item>
  </el-col>

  <!-- radio -->
  <el-col :xs="24" :sm="12" :md="8" :lg="6">
    <el-form-item label="是否启用" prop="isuse">
      <el-radio-group v-model="data.isuse" :disabled="disabled">
        <el-radio label="1">是</el-radio>
        <el-radio label="0">否</el-radio>
      </el-radio-group>
    </el-form-item>
  </el-col>

  <!-- checkbox -->
  <el-col :xs="24" :sm="12" :md="8" :lg="6">
    <el-form-item label="使用情况" prop="used">
      <el-checkbox-group v-model="data.used">
        <el-checkbox :disabled="disabled" label="pc">PC</el-checkbox>
        <el-checkbox :disabled="disabled" label="ios">IOS</el-checkbox>
        <el-checkbox :disabled="disabled" label="android">Android</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
  </el-col>

  <!-- textarea -->
  <el-col :xs="24">
    <el-form-item label="接口描述" prop="describe">
      <el-input
          placeholder="可使用数据结构示例对接口进行描述"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 20 }"
          v-model="data.describe"
          :disabled="disabled">
      </el-input>
    </el-form-item>
  </el-col>

  <!-- button -->
  <el-col :xs="24" v-if="!disabled">
    <el-button-group>
      <el-button type="info" size="mini" @click="addItem('reqContents')">添加请求字段</el-button>
      <el-button type="info" size="mini" @click="addItem('resContents')">添加响应字段</el-button>
    </el-button-group>
  </el-col>

  <!-- form-table -->
  <el-col :xs="24">
    <el-table :data="data.reqContents">
      <el-table-column
          label="请求字段"
          align="center"
          min-width="120">
        <template scope="scope">
          <el-input
              v-model="scope.row.req_name"
              auto-complete="off"
              :disabled="disabled">
          </el-input>
        </template>
      </el-table-column>
      <el-table-column
          label="是否必选"
          align="center"
          min-width="140">
        <template scope="scope">
          <el-radio-group v-model="scope.row.req_required" :disabled="disabled">
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </template>
      </el-table-column>
      <el-table-column
          label="数据类型"
          align="center"
          min-width="120">
        <template scope="scope">
          <el-input
              v-model="scope.row.req_type"
              auto-complete="off"
              :disabled="disabled">
          </el-input>
        </template>
      </el-table-column>
      <el-table-column
          label="长度限制"
          align="center"
          min-width="100">
        <template scope="scope">
          <el-input
              v-model="scope.row.req_maxLength"
              auto-complete="off"
              :disabled="disabled">
          </el-input>
        </template>
      </el-table-column>
      <el-table-column
          label="备注"
          align="center"
          min-width="150">
        <template scope="scope">
          <el-input
              v-model="scope.row.req_info"
              auto-complete="off"
              :disabled="disabled">
          </el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作"
                       align="center"
                       v-if="!disabled"
                       min-width="80">
        <template scope="scope">
          <el-button-group>
            <el-button size="mini" type="danger"
                       @click="deleteItem('reqContents',scope.$index)">删除
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </el-col>




</template>

<script type="text/ecmascript-6">
  export default{
    name: '',
    data() {
      return {}
    },
    props: {},
    mixins: [],
    computed: {},
    components: {},
    watch: {},
    methods: {},
    beforeMount() {
    },
    mounted() {

    },
    beforeDestroy() {
    },
    destroyed() {
    }
  }
</script>
