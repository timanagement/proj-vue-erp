<template>
  <div>
    <!-- 页头 -->
    <page-title title="行政报销 - " :attach="type | checkType">
      <template v-if="!disabled">
        <el-button type="default" class="m-l-sm pull-right" size="small" @click="resetForm('editForm')">重置
        </el-button>
        <el-button type="primary" class="m-l-sm pull-right" size="small" @click="handleSubmit('editForm')">提交
        </el-button>
      </template>
    </page-title>

    <!-- 流程 -->
    <el-steps v-for="wf in create.workflow"
              :key="wf.fid"
              v-show="wf.fid === data.fid"
              :active="3"
              :center="true"
              :align-center="true"
              class="m-b-md">
      <el-step v-for="list in wf.rulelist"
               :key="list.id"
               :title="list.uname || list.name"
               :description="list.uname && list.name">
      </el-step>
    </el-steps>
    <!-- 表单 -->
    <el-form :model="data" :rules="rules" :label-width="formLabelWidth" ref="editForm" v-loading="formLoading">
      <el-row :gutter="10">
        <el-col :xs="24" class="m-b-md">
          <el-table :data="data.reqContents">
            <el-table-column
                label="项目名称"
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
                label="金额"
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
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="币种" prop="currency">
            <el-select v-model="data.currency" placeholder="请选择" :disabled="disabled">
              <el-option v-for="item in create.currency" :key="item.name"  :label="item.name" :value="item.Ename"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="单据" prop="bx_bills">
            <el-select v-model="data.bx_bills" placeholder="请选择" :disabled="disabled">
              <el-option v-for="item in create.bx_bills" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="合计" prop="name">
            <el-input v-model="data.name" auto-complete="off" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="付款方式" prop="sk_type">
            <el-select v-model="data.sk_type" placeholder="请选择" :disabled="disabled">
              <el-option v-for="item in create.sk_type" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="收款人" prop="name">
            <el-input v-model="data.name" auto-complete="off" :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="收款银行" prop="name">
            <el-input v-model="data.name" auto-complete="off" :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="收款账号" prop="name">
            <el-input v-model="data.name" auto-complete="off" :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12">
          <el-form-item label="报销公司" prop="name">
            <el-input v-model="data.name" auto-complete="off" :readonly="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24">
          <el-form-item label="详细说明" prop="describe">
            <el-input
                placeholder="最多可输入120字"
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 20 }"
                v-model="data.describe"
                :disabled="disabled">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
  import Api from 'api'
  import {applyCheck} from 'mixins'
  export default{
    name: 'bx-check',
    data() {
      return {
        /* 数据 */
        data: {
          fid: '3',
          currency: '',
          bx_bills: '',
          sk_type: ''
        },
        /* 校验规则 */
        rules: {
          name: {
            required: true,
            message: '名称必填',
            trigger: 'blur'
          }
        },
        /* 额外数据 */
        create: {
          workflow: [], // 流程
          company: [],  // 报销公司
          voucher: [],  // 单据:cc,出产;yk,立项;sg,申购;jk,借款;
          bx_bills: [],  // 单据类型,
          currency: [],  // 币种
          sk_type: []   // 付款方式
        },
        /* 接口地址 */
        API_URL: '/Bxapplys'
      }
    },
    mixins: [applyCheck],
    methods: {
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
    }
  }
</script>
