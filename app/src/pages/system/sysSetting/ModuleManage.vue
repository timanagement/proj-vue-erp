<template>
  <div>
    <!-- 查询 -->
    <el-form :inline="true" :model='para'>
      <el-form-item>
        <el-input placeholder="模块名称" size="small" v-model='para.name' @keyup.native.enter="getLists"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="para.type" size="small" placeholder="模块分类">
          <el-option
            v-for="item in para.options"
            :label="item.label"
            :value="item.value"
            :key="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click='getLists'>查询</el-button>
        <el-button type="primary" size="small" @click='resetQuery'>重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 功能按钮 -->
    <el-button-group>
      <el-button type="info" icon="plus" @click="handleEdit">添加</el-button>
      <el-button type="danger" icon="delete" @click="handleDel" :disabled="multipleSelection.length <1">删除
      </el-button>
    </el-button-group>

    <!-- 列表 -->
    <el-table
      :data="moduleList"
      border
      stripe
      tooltip-effect="dark"
      v-loading="para.listLoading"
      @selection-change="handleSelectionChange"
      style="width: 100%">
      <el-table-column
        type="selection"
        min-width="50">
      </el-table-column>
      <el-table-column
        label="#"
        align="center"
        min-width="60">
        <template scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="模块名称"
        align="center"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="path"
        label="路由"
        header-align="center"
        min-width="150">
      </el-table-column>
      <el-table-column
        prop="accessName"
        label="允许访问"
        align="center"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="delimitName"
        label="禁止访问"
        align="center"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="show"
        label="显示"
        align="center"
        min-width="85">
        <template scope="scope">
          <i class="fa" :class="scope.row.show == 1 ? 'fa-check' : 'fa-times'"></i>
        </template>
      </el-table-column>
      <el-table-column
        prop="sort"
        min-width="90"
        align="center"
        label="排序">
      </el-table-column>
      <el-table-column
        fixed="right"
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
      @current-change="handleCurrentChange"
      :current-page="para.page"
      :page-size="para.pageSize"
      :layout="$store.state.global.pageLayout"
      :total="para.total"
      class="text-center m-t-sm">
    </el-pagination>

    <!-- 添加/修改 -->
    <el-dialog :title="editData.id ? '编辑' : '添加'" size="large" v-model="editVisible" top="30px"
               :close-on-click-modal="false">
      <el-form :model="editData" ref="editForm" :label-width="formLabelWidth" :rules="editFormRules">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="功能名称" prop="name">
              <el-input v-model="editData.name" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="所属模块">
              <el-select v-model="editData.belong">
                <el-option
                  v-for="item in para.options"
                  :label="item.label"
                  :value="item.value"
                  :key="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="路由">
              <el-input v-model="editData.path" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="8">
            <el-form-item label="是否显示">
              <el-radio-group v-model="editData.show">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="8">
            <el-form-item label="排序">
              <el-input v-model="editData.sort" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="图标">
              <el-input v-model="editData.icon" auto-complete="off">
                <template slot="append"><i class="fa" :class="editData.icon"></i></template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="允许个人">
              <el-input
                type="textarea"
                autosize
                readonly
                placeholder="选择个人"
                v-model="editData.accessName"
                @click.native="choosePerson('access')">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="允许部门">
              <el-input
                type="textarea"
                autosize
                readonly
                placeholder="选择部门"
                v-model="editData.accessDept"
                @click.native="chooseDept('access')">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="禁止个人">
              <el-input
                type="textarea"
                autosize
                readonly
                placeholder="选择个人"
                v-model="editData.delimitName"
                @click.native="choosePerson('delimit')">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="禁止部门">
              <el-input
                type="textarea"
                autosize
                readonly
                placeholder="选择部门"
                v-model="editData.delimitDept"
                @click.native="chooseDept('delimit')">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit" :loading="para.editLoading">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 部门选择 -->
    <choose-dept v-model="showChooseDept" :data="editData" :dname="dnameList" :did="didList"></choose-dept>

    <!-- 用户选择 -->
    <choose-user v-model="showChooseUser" :data="editData" :uname="unameList" :uid="uidList"></choose-user>

  </div>

</template>

<script type="text/ecmascript-6">
  import {commonApi} from '@/config'
  import {common} from '@/components'
  export default{
    name: 'ModuleManage',
    data () {
      return {
        // 显示用户选择弹窗
        showChooseUser: false,
        // 显示部门选择弹窗
        showChooseDept: false,

        // 赋值字段
        unameList: '',
        uidList: '',
        dnameList: '',
        didList: '',

        // 页面查询,分页参数
        para: {
          name: '',
          type: '',
          page: 1,
          total: 0,
          pageSize: 10,
          options: [
            {
              value: '1',
              label: '主页'
            },
            {
              value: '2',
              label: '系统管理'
            }, {
              value: '3',
              label: '行政事务'
            }
          ],
          editLoading: false,
          listLoading: false
        },

        /* 批量删除 */
        multipleSelection: [],

        /* 列表数据 */
        moduleList: [],

        /* 增加,编辑 */
        editVisible: false,
        editData: {
          id: 0,
          name: '',
          belong: '',
          path: '',
          show: 1,
          sort: 1,
          icon: 'fa-circle-o',
          accessName: '',
          accessUid: [],
          accessDept: '',
          accessPid: [],
          delimitName: '',
          delimitUid: [],
          delimitDept: '',
          delimitPid: [],
        },
        // 添加/编辑验证
        editFormRules: {
          name: {
            required: true,
            message: '模块名称为必填项',
            trigger: 'blur'
          }
        },

        formLabelWidth: '85px',
      }
    },
    props: [],
    components: {
      'choose-user': common.ChooseUser,
      'choose-dept': common.ChooseDept
    },
    watch: {},
    methods: {
      // 用户弹窗
      choosePerson(val){
        this.unameList = val + 'Name';
        this.uidList = val + 'Uid';
        this.showChooseUser = true;
      },
      // 部门弹窗
      chooseDept(val){
        this.dnameList = val + 'Dept';
        this.didList = val + 'Pid';
        this.showChooseDept = true;
      },

      // 获取列表
      getLists(){
        this.para.listLoading = true;
        let para = {
          page: this.para.page,
          name: this.para.name,
          type: this.para.type,
          pageSize: this.para.pageSize
        };
        commonApi.getData.call(this, '/system/sysSetting/moduleManage', para, data => {
          this.moduleList = data.moduleList;
          this.para.total = data.total;
          this.para.listLoading = false;
        })
      },

      // 分页点击
      handleCurrentChange(val) {
        this.para.page = val;
        this.getLists();
      },

      // 重置
      resetQuery(){
        Object.assign(this.para, {name: '', type: ''})
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
          commonApi.deleteData.call(this, '/system/sysSetting/removeModule', para, () => {
            this.getLists();
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
          belong: '',
          path: '',
          show: 1,
          sort: 1,
          icon: 'fa-circle-o',
          accessName: '',
          accessUid: [],
          accessDept: '',
          accessPid: [],
          delimitName: '',
          delimitUid: [],
          delimitDept: '',
          delimitPid: [],
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
                commonApi.postData.call(this, '/system/sysSetting/editModule', para, data => {
                  this.para.editLoading = this.editVisible = false;
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                  });
                  this.getLists();
                });
              });
          }
        });
      },
    },
    beforeMount () {
      //this.getLists()
    },
    mounted(){

    }
  }
</script>
<style>
</style>
