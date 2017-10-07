<template>
  <div>
    <!-- 页头 -->
    <page-title title="模块管理" :attach="type | checkType">
      <template v-if="!disabled">
        <el-button type="default" class="m-l-sm pull-right" size="small" @click="resetForm('editForm')">重置
        </el-button>
        <el-button type="primary" class="m-l-sm pull-right" size="small" @click="handleSubmit('editForm')">提交
        </el-button>
      </template>
    </page-title>

    <!-- 数据 -->
    <el-form :model="data" :rules="rules" :label-width="formLabelWidth" ref="editForm" v-loading="formLoading">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="功能名称" prop="name">
            <el-input v-model="data.name" auto-complete="off" :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="是否启用">
            <el-radio-group v-model="data.newisdel" :disabled="disabled">
              <el-radio label="0">是</el-radio>
              <el-radio label="1">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="所属模块" prop="fid">
            <el-select v-model="data.fid" clearable :disabled="disabled">
              <el-option-group
                  v-for="group in create.data"
                  :key="group.id"
                  :label="group.name">
                <el-option
                    :label="group.name"
                    :value="group.id">
                </el-option>
                <el-option
                    v-for="item in group.children"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                </el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="路由" prop="path">
            <el-input v-model="data.path" auto-complete="off" :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="排序" prop="sort">
            <el-input v-model="data.sort" auto-complete="off" :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="图标">
            <el-input v-model="data.icon" auto-complete="off" :disabled="disabled">
              <template slot="append"><i class="fa" :class="data.icon"></i></template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12">
          <el-form-item label="允许个人">
            <el-input
                type="textarea"
                :disabled="disabled"
                autosize
                readonly
                placeholder="选择个人"
                v-model="data.accessname"
                @click.native="choosePerson('access')">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12">
          <el-form-item label="允许部门">
            <el-input
                type="textarea"
                autosize
                :disabled="disabled"
                readonly
                placeholder="选择部门"
                v-model="data.accessdept"
                @click.native="chooseDept('access')">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12">
          <el-form-item label="禁止个人">
            <el-input
                type="textarea"
                autosize
                :disabled="disabled"
                readonly
                placeholder="选择个人"
                v-model="data.delimitname"
                @click.native="choosePerson('delimit')">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12">
          <el-form-item label="禁止部门">
            <el-input
                type="textarea"
                autosize
                :disabled="disabled"
                readonly
                placeholder="选择部门"
                v-model="data.delimitdept"
                @click.native="chooseDept('delimit')">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 部门选择 -->
    <choose-dept v-model="showChooseDept" multiple :data="data" :dname="dnameList" :did="didList"
                 v-if="!disabled"></choose-dept>

    <!-- 用户选择 -->
    <choose-user v-model="showChooseUser" multiple :data="data" :uname="unameList" :uid="uidList"
                 v-if="!disabled"></choose-user>
  </div>
</template>

<script type="text/ecmascript-6">
  import Api from 'api'
  import {commonCheck} from 'mixins'
  import {chooseData} from 'components'
  export default{
    name: 'module-manage-check',
    data() {
      return {
        /* 接口地址 */
        API_URL: '/moduleManages',
        /* 数据 */
        data: {
          name: '',
          fid: '',
          path: '',
          newisdel: '0',
          sort: '1',
          icon: 'fa-circle-o',
          accessname: '',
          accessuid: '',
          accessdept: '',
          accessdid: '',
          delimitname: '',
          delimituid: '',
          delimitdept: '',
          delimitdid: ''
        },
        /* 校验规则 */
        rules: {
          name: {
            required: true,
            message: '名称必填',
            trigger: 'blur'
          },
          sort: {
            pattern: /^[1-9]\d*$/,
            message: '排序必须是正整数',
            trigger: 'blur'
          }
        },
        /* create数据 */
        create: {
          data: []
        },
        // 显示用户选择弹窗
        showChooseUser: false,
        // 显示部门选择弹窗
        showChooseDept: false,
        // 赋值字段
        unameList: '',
        uidList: '',
        dnameList: '',
        didList: ''
      }
    },
    mixins: [commonCheck],
    components: {
      'choose-user': chooseData.ChooseUser,
      'choose-dept': chooseData.ChooseDept
    },
    methods: {
      // 提交
      handleSubmit(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.editLoading = true
              let para = Object.assign({}, this.data)
              if (para.id) {
                /* 修改 */
                Api.put(this.API_URL, para, res => {
                  this.editLoading = false
                  this.$message({
                    message: '修改成功',
                    type: 'success'
                  })
                  Api.config.BUS.$emit('updateLeftNav')
                  this.$router.go(-1)
                })
              } else {
                /* 添加 */
                Api.post(this.API_URL, para, res => {
                  this.editLoading = false
                  this.$message({
                    message: '添加成功',
                    type: 'success'
                  })
                  Api.config.BUS.$emit('updateLeftNav')
                  this.$router.go(-1)
                })
              }
            })
          }
        })
      },
      // 用户弹窗
      choosePerson(val) {
        this.unameList = val + 'name';
        this.uidList = val + 'uid';
        this.showChooseUser = true;
      },
      // 部门弹窗
      chooseDept(val) {
        this.dnameList = val + 'dept';
        this.didList = val + 'did';
        this.showChooseDept = true;
      }
    },
    mounted() {
      // 不是添加就获取详情
      if (this.type !== 'a') {
        this.formLoading = true
        Api.detail(this.API_URL, this.id, res => {
          this.formLoading = false
          Object.assign(this.data, res.data)
        }, () => {
          this.formLoading = false
        })
      }
      // 不是查看并且需要create数据就获取create数据
      if (this.create !== undefined) {
        Api.get(this.API_URL + '/create', {}, res => {
          Object.assign(this.create, res)
          this.create.data.unshift({
            fid: '0',
            id: '0',
            name: '顶级'
          })
        })
      }
    }
  }
</script>
