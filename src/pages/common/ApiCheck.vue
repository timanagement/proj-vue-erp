<template>
  <div>
    <!-- 页头 -->
    <page-title title="Api" :attach="type | checkType">
      <template v-if="!disabled">
        <el-button type="default" class="m-l-sm pull-right" @click="resetForm('editForm')">重置
        </el-button>
        <el-button type="primary" class="m-l-sm pull-right" @click="handleSubmit('editForm')">提交
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
          <el-form-item label="请求方法" prop="method">
            <el-select v-model="data.method" placeholder="请选择" :disabled="disabled">
              <el-option label="get" value="get"></el-option>
              <el-option label="post" value="post"></el-option>
              <el-option label="put" value="put"></el-option>
              <el-option label="delete" value="delete"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="接口地址" prop="path">
            <el-input v-model="data.path" auto-complete="off" :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="所属项目" prop="belong">
            <el-select v-model="data.belong" placeholder="请选择" :disabled="disabled">
              <el-option v-for="item in projects" :label="item" :value="item" :key="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="是否启用" prop="isuse">
            <el-radio-group v-model="data.isuse" :disabled="disabled">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="16">
          <el-form-item label="前端状态" prop="used">
            <el-checkbox-group v-model="data.used">
              <el-checkbox :disabled="disabled" label="pc">PC</el-checkbox>
              <el-checkbox :disabled="disabled" label="ios">IOS</el-checkbox>
              <el-checkbox :disabled="disabled" label="android">Android</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
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
        <el-col :xs="24" v-if="!disabled">
          <el-button-group>
            <el-button type="info" size="mini" @click="addItem('reqContents')">添加请求字段</el-button>
            <el-button type="info" size="mini" @click="addItem('resContents')">添加响应字段</el-button>
          </el-button-group>
        </el-col>
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
        <el-col :xs="24">
          <el-table :data="data.resContents">
            <el-table-column
                label="响应字段"
                align="center"
                min-width="120">
              <template scope="scope">
                <el-input
                    v-model="scope.row.res_name"
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
                <el-radio-group v-model="scope.row.res_required" :disabled="disabled">
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
                    v-model="scope.row.res_type"
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
                    v-model="scope.row.res_maxLength"
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
                    v-model="scope.row.res_info"
                    auto-complete="off"
                    :disabled="disabled">
                </el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作"
                             align="center"
                             min-width="80"
                             v-if="!disabled">
              <template scope="scope">
                <el-button-group>
                  <el-button size="mini" type="danger"
                             @click="deleteItem('resContents',scope.$index)">删除
                  </el-button>
                </el-button-group>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
  import Api from '@/api'
  import {commonCheck} from '@/mixins'
  export default{
    name: 'api-check',
    data() {
      return {
        /* 数据 */
        data: {
          name: '',
          isuse: '1',
          path: '',
          method: '',
          describe: '',
          belong: '',
          used: [],
          reqContents: [{
            req_name: '',
            req_required: '1',
            req_type: 'String',
            req_maxLength: 0,
            req_info: ''
          }],
          resContents: [{
            res_name: '',
            res_required: '1',
            res_type: 'String',
            res_maxLength: 0,
            res_info: ''
          }]
        },
        /* 校验规则 */
        rules: {
          name: {
            required: true,
            message: '名称必填',
            trigger: 'blur'
          },
          path: {
            required: true,
            message: '接口地址必填',
            trigger: 'blur'
          }
        },
        /* 接口地址 */
        API_URL: '/apis',
        /* 所属项目列表 */
        projects: [
          'ERP2.0',
          '商翔优选',
          '采购宝',
          '用户中心',
          '商翔通'
        ]
      }
    },
    mixins: [commonCheck],
    methods: {
      // 提交
      handleSubmit(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {})
              .then(() => {
                this.editLoading = true
                let para = Object.assign({}, this.data)
                para.used = para.used.toString()
                para.readUser = this.$store.state.user.userInfo.u_id
                if (para.id) {
                  /* 修改 */
                  Api.put(`/apis`, {method: para, id: para.id}, res => {
                    this.editLoading = false
                    if (res.data.id === para.id) {
                      this.$message({
                        message: '修改成功',
                        type: 'success'
                      })
                      this.$router.go(-1)
                    } else {
                      this.$message({
                        message: '修改失败',
                        type: 'error'
                      })
                    }
                  }, err => {
                    this.editLoading = false
                    this.$message({
                      message: '修改失败',
                      type: 'error'
                    })
                    console.log(err)
                  })
                } else {
                  /* 添加 */
                  Api.post('/apis', {method: para}, res => {
                    this.editLoading = false
                    if (res.data.id !== undefined) {
                      this.$message({
                        message: '添加成功',
                        type: 'success'
                      })
                      this.$router.go(-1)
                    } else {
                      this.$message({
                        message: '已上传至服务器,但添加失败',
                        type: 'error'
                      })
                    }
                  }, err => {
                    this.editLoading = false
                    this.$message({
                      message: '未上传服务器,添加失败',
                      type: 'error'
                    })
                    console.log(err)
                  })
                }
              })
              .catch(err => {
                console.log(err)
              })
          }
        })
      },
      // 添加请求/响应项
      addItem(type) {
        let item = {}
        let pre = type.slice(0, 3)
        item[pre + '_name'] = ''
        item[pre + '_required'] = '1'
        item[pre + '_type'] = 'String'
        item[pre + '_maxLength'] = 0
        item[pre + '_info'] = ''
        this.data[type].push(item)
      },
      // 删除请求/响应项
      deleteItem(type, index) {
        // 如果有id则异步删除,再本地删除,没有直接本地删除
        let id = this.data[type][index][type.slice(0, 3) + '_id']
        if (id) {
          this.$confirm(`确认从数据库删除所选项?`, '提示', {
            type: 'warning'
          }).then(() => {
            Api.delete('/' + type, id, res => {
              this.$message({
                message: `删除成功!`,
                type: 'success'
              })
              this.data[type].splice(index, 1)
            }, err => {
              this.$message({
                message: '删除失败!',
                type: 'error'
              })
              console.log(err)
            })
          }).catch(() => {
          })
        } else {
          this.data[type].splice(index, 1)
        }
      }
    },
    mounted() {
      if (this.type !== 'a') {
        this.formLoading = true
        Api.detail(this.API_URL, this.id, res => {
          this.formLoading = false
          res.data.used = res.data.used ? res.data.used.split(',') : []
          Object.assign(this.data, res.data)
        })
      }
    }
  }
</script>
