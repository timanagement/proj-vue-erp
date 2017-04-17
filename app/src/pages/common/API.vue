<template>
  <div>
    <!-- 查询 -->
    <el-form :inline="true" :model='para' ref="queryForm" @keyup.native.enter="getData">
      <el-form-item>
        <el-input placeholder="功能名称" size="small" v-model='para.name'></el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="地址" size="small" v-model='para.path'></el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="方法名" size="small" v-model='para.method'></el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="错误码" size="small" v-model='para.errCode'></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click='getData'>查询</el-button>
        <el-button type="primary" size="small" @click='resetQuery'>重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 功能按钮 -->
    <el-button-group>
      <el-button type="info" icon="plus" @click="handleEdit">添加</el-button>
      <el-button type="danger" icon="delete" @click="handleDel" :disabled="multipleSelection.length < 1">删除
      </el-button>
    </el-button-group>

    <!-- 列表 -->
    <el-table
      :data="datas"
      border
      stripe
      tooltip-effect="dark"
      v-loading="page.listLoading"
      @selection-change="handleSelectionChange">
      <el-table-column type="expand">
        <template scope="scope">
          <p><span class="m-r-sm">错误描述:</span>{{ scope.row.errMsg }}</p>
          <el-table :data="scope.row.reqContent"
                    border
                    stripe
                    tooltip-effect="dark"
                    class="m-t-sm m-b-sm">
            <el-table-column prop="name"
                             label="请求字段"
                             align="center"
                             min-width="80">
            </el-table-column>
            <el-table-column prop="required"
                             label="是否必选"
                             align="center"
                             min-width="80">
            </el-table-column>
            <el-table-column prop="type"
                             label="参数类型"
                             align="center"
                             min-width="80">
            </el-table-column>
            <el-table-column prop="maxLength"
                             label="长度限制"
                             align="center"
                             min-width="80">
            </el-table-column>
            <el-table-column prop="info"
                             label="描述"
                             align="center"
                             min-width="150">
            </el-table-column>
          </el-table>
          <el-table :data="scope.row.resContent"
                    border
                    stripe
                    tooltip-effect="dark"
                    style="width: 100%;">
            <el-table-column prop="name"
                             label="响应字段"
                             align="center"
                             min-width="80">
            </el-table-column>
            <el-table-column prop="required"
                             label="是否必选"
                             align="center"
                             min-width="80">
            </el-table-column>
            <el-table-column prop="type"
                             label="参数类型"
                             align="center"
                             min-width="80">
            </el-table-column>
            <el-table-column prop="maxLength"
                             label="长度限制"
                             align="center"
                             min-width="80">
            </el-table-column>
            <el-table-column prop="info"
                             label="描述"
                             align="center"
                             min-width="150">
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column
        type="selection"
        min-width="50">
      </el-table-column>
      <el-table-column
        prop="name"
        label="功能名称"
        align="center"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="path"
        label="接口地址"
        header-align="center"
        min-width="150">
      </el-table-column>
      <el-table-column
        prop="method"
        label="请求方法"
        align="center"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="errCode"
        label="错误码"
        align="center"
        min-width="80">
      </el-table-column>
      <el-table-column
        prop="isuse"
        label="是否启用"
        align="center"
        min-width="100">
        <template scope="scope">
          <i class="fa" :class="scope.row.show == 1 ? 'fa-check' : 'fa-times'"></i>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        min-width="120">
        <template scope="scope">
          <el-button @click="handleEdit(scope.$index, scope.row)" size="small" icon="edit"></el-button>
          <el-button @click="handleDel(scope.$index, scope.row)" type="danger" size="small" icon="delete"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="para.page"
      :page-size="para.pageSize"
      :total="page.total"
      :layout="$store.state.global.pageLayout"
      @current-change="handleCurrentChange"
      class="text-center m-t-sm">
    </el-pagination>

    <!-- 添加/修改 -->
    <el-dialog :title="editData.id ? '编辑' : '添加'" size="large" v-model="editVisible" top="30px"
               :close-on-click-modal="false">
      <el-form :model="editData" ref="editForm" :label-width="$store.state.global.formLabelWidth"
               :rules="editFormRules">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="功能名称" prop="name">
              <el-input v-model="editData.name" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="8">
            <el-form-item label="是否启用">
              <el-radio-group v-model="editData.show">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="接口地址">
              <el-input v-model="editData.path" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="错误码">
              <el-input v-model="editData.errCode" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="8">
            <el-form-item label="请求方法">
              <el-select v-model="editData.method" placeholder="请选择">
                <el-option label="get" value="1"></el-option>
                <el-option label="post" value="2"></el-option>
                <el-option label="put" value="3"></el-option>
                <el-option label="delete" value="4"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="错误描述">
              <el-input
                placeholder="请用简洁的语言告知用户产生错误的原因"
                v-model="editData.errMsg"
                auto-complete="off">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24">
            <el-table :data="editData.reqContent">
              <el-table-column
                label="请求字段"
                align="center"
                min-width="120">
                <template scope="scope">
                  <el-input
                    v-model="scope.row.name"
                    auto-complete="off">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column
                label="是否必选"
                align="center"
                min-width="120">
                <template scope="scope">
                  <el-radio-group v-model="scope.row.required">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                  </el-radio-group>
                </template>
              </el-table-column>
              <el-table-column
                label="数据类型"
                align="center"
                min-width="120">
                <template scope="scope">
                  <el-input
                    v-model="scope.row.type"
                    auto-complete="off">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column
                label="长度限制"
                align="center"
                min-width="100">
                <template scope="scope">
                  <el-input
                    v-model="scope.row.maxLength"
                    auto-complete="off">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column
                label="描述"
                align="center"
                min-width="150">
                <template scope="scope">
                  <el-input
                    v-model="scope.row.info"
                    auto-complete="off">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column label="操作"
                               align="center"
                               min-width="100">
                <template scope="scope">
                  <el-button-group>
                    <el-button size="mini" @click="addItem('reqContent')">添加</el-button>
                    <el-button size="mini" type="danger" @click="deleteItem('reqContent',scope.$index)">删除</el-button>
                  </el-button-group>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col :xs="24">
            <el-table :data="editData.resContent">
              <el-table-column
                label="响应字段"
                align="center"
                min-width="120">
                <template scope="scope">
                  <el-input
                    v-model="scope.row.name"
                    auto-complete="off">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column
                label="是否必选"
                align="center"
                min-width="120">
                <template scope="scope">
                  <el-radio-group v-model="scope.row.required">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                  </el-radio-group>
                </template>
              </el-table-column>
              <el-table-column
                label="数据类型"
                align="center"
                min-width="120">
                <template scope="scope">
                  <el-input
                    v-model="scope.row.type"
                    auto-complete="off">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column
                label="长度限制"
                align="center"
                min-width="100">
                <template scope="scope">
                  <el-input
                    v-model="scope.row.maxLength"
                    auto-complete="off">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column
                label="描述"
                align="center"
                min-width="150">
                <template scope="scope">
                  <el-input
                    v-model="scope.row.info"
                    auto-complete="off">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column label="操作"
                               align="center"
                               min-width="100">
                <template scope="scope">
                  <el-button-group>
                    <el-button size="mini" @click="addItem('resContent')">添加</el-button>
                    <el-button size="mini" type="danger" @click="deleteItem('resContent',scope.$index)">删除</el-button>
                  </el-button-group>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit" :loading="page.editLoading">确 定</el-button>
      </div>
    </el-dialog>

  </div>

</template>

<script type="text/ecmascript-6">
  import {commonApi} from '@/config'
  export default{
    name: 'api',
    data () {
      return {
        // 列表
        datas: [],

        // 查询参数
        para: {
          name: '',
          path: '',
          method: '',
          errCode: '',
          page: 1,
          pageSize: 10,
        },

        // 页面参数
        page: {
          total: 0,
          editLoading: false,
          listLoading: false
        },

        /* 批量删除 */
        multipleSelection: [],

        /* 增加,编辑 */
        editVisible: false,
        editData: {
          id: 0,
          name: '',
          path: '',
          method: 'get',
          errCode: '',
          errMsg: '',
          reqContent: [{
            name: '',
            required: 1,
            type: 'String',
            maxLength: 0,
            info: ''
          }],
          resContent: [{
            name: '',
            required: 1,
            type: 'String',
            maxLength: 0,
            info: ''
          }],
          isuse: 1
        },
        editFormRules: {
          name: {
            required: true,
            message: '功能名称为必填项',
            trigger: 'blur'
          }
        },
      }
    },
    props: [],
    components: {},
    computed: {},
    watch: {},
    methods: {
      // 获取列表
      getData(){
        this.para.listLoading = true;
        commonApi.getData.call(this, '/apis', this.para, res => {
          this.datas = res.data;
          this.page.total = res.total;
          this.page.listLoading = false;
        })
      },

      // 重置
      resetQuery(){
        this.$nextTick(() => {
          this.$refs.queryForm.resetFields();
        })
      },

      // 分页点击
      handleCurrentChange(val) {
        this.para.page = val;
        this.getData();
      },

      //  多选
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      //  删除
      handleDel(index, row) {
        this.$confirm('确认删除所选记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          let para = {};
          para.id = row ? row.id : this.multipleSelection.map(item => item.id);
          console.log(para);
          commonApi.deleteData.call(this, '/apis', para, () => {
            this.getData();
            this.$message({
              message: '删除成功',
              type: 'success'
            });
          })
        })
      },

      //  添加,编辑
      handleEdit(index, row){
        this.editVisible = true;
        /* Object.assign(target, ...sources) */
        /* 如果目标对象中的属性具有相同的键，则属性将被源中的属性覆盖。后来的源的属性将类似地覆盖早先的属性。 */
        Object.assign(this.editData, {
          id: 0,
          name: '',
          path: '',
          method: 'get',
          errCode: '',
          errMsg: '',
          reqContent: [{
            name: '',
            required: 1,
            type: 'String',
            maxLength: 0,
            info: ''
          }],
          resContent: [{
            name: '',
            required: 1,
            type: 'String',
            maxLength: 0,
            info: ''
          }],
          isuse: 1
        }, row);
      },

      // 确定
      handleSubmit(){
        this.$refs['editForm'].validate(valid => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {})
              .then(() => {
                this.para.editLoading = true;
                let para = Object.assign({}, this.editData);
                commonApi.postData.call(this, '/common/editApi', para, data => {
                  this.para.editLoading = this.editVisible = false;
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                  });
                  this.getData();
                });
              });
          }
        });
      },

      // 添加请求/响应项
      addItem(type){
        this.editData[type].push({
          name: '',
          required: 1,
          type: 'String',
          maxLength: 0,
          info: ''
        });
      },

      // 删除请求/响应项
      deleteItem(type, index){
        this.editData[type].length > 1 && this.editData[type].splice(index, 1);
      },

    },
    beforeMount () {

    },
    mounted(){
      this.getData()
    }
  }
</script>
<style>
  .el-table__expanded-cell span {
    color: #99a9bf;
  }
</style>
