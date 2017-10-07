<template>
    <div>
        <!-- 页头 -->
        <page-title :title="op | opType" :attach="type | checkType">
            <template>
                <el-button type="default" class="m-l-sm pull-right" size="small" @click="resetForm('editForm')"
                           v-if="!disabled">重置
                </el-button>
                <el-button type="primary" class="m-l-sm pull-right" size="small" @click="handleSubmit('editForm')"
                           v-if="!disabled" :disabled="editDisabled">提交
                </el-button>
                <el-button type="warning" class="m-l-sm pull-right" size="small" @click="takeBack" v-if="data.takeback"
                           :disabled="editDisabled">取回
                </el-button>
                <el-button type="default" class="m-l-sm pull-right" size="small" :disabled="editDisabled" v-if="isCheck"
                           @click="checkBackDialog = true">驳回
                </el-button>
                <el-button type="success" class="m-l-sm pull-right" size="small" :disabled="editDisabled" v-if="isCheck"
                           @click="checkAgree">同意
                </el-button>
            </template>
        </page-title>

        <!-- 流程 -->
        <el-steps v-for="wf in currWl"
                  :key="wf.fid"
                  v-show="wf.fid === currFid"
                  :active="currActive"
                  :center="true"
                  :space="150"
                  finish-status="success"
                  process-status="finish"
                  class="m-b-md wrapper-sm b-a r b-info"
                  style="border-style: dashed;">
            <el-step v-for="list in wf.rulelist"
                     :key="list.id"
                     :title="list[1].name || list.name"
                     :description="list[1].name && list.name">
            </el-step>
        </el-steps>

        <!-- 表单 -->
        <el-form :model="data" :rules="rules" :label-width="formLabelWidth" ref="editForm" v-loading="formLoading">
            <el-row :gutter="10">
                <el-col :xs="24" :sm="12" :md="8" :lg="6" v-if="create.workflow.length > 1">
                    <el-form-item label="流程选择" prop="fid">
                        <el-select v-model="data.fid" :disabled="disabled">
                            <el-option
                                    v-for="nb in create.workflow"
                                    :label="nb.fname"
                                    :key="nb.fid"
                                    :value="nb.fid">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6">
                    <el-form-item label="预算经费" prop="cc_estimcost">
                        <el-input v-model.trim="data.cc_estimcost" auto-complete="off" :disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6">
                    <el-form-item label="开始时间" prop="cc_datestart">
                        <el-date-picker
                                v-model="data.cc_datestart"
                                type="datetime"
                                :editable="false"
                                :disabled="disabled"
                                :picker-options="startTimeOptions"
                                placeholder="选择请假开始时间">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6">
                    <el-form-item label="结束时间" prop="cc_dateend">
                        <el-date-picker
                                v-model="data.cc_dateend"
                                type="datetime"
                                :editable="false"
                                :disabled="disabled"
                                :picker-options="endTimeOptions"
                                placeholder="选择请假结束时间">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6">
                    <el-form-item label="总计天数" prop="cc_alldate">
                        <el-input v-model.trim="data.cc_alldate" auto-complete="off" :disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6">
                    <el-form-item label="目的地" prop="cc_dourn">
                        <el-input v-model.trim="data.cc_dourn" auto-complete="off" :disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="24">
                    <el-form-item label="出差事由" prop="cc_reasons">
                        <el-input
                                type="textarea"
                                :autosize="{ minRows: 2, maxRows: 10 }"
                                v-model="data.cc_reasons"
                                :disabled="disabled">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <!-- 流程记录 -->
        <template v-if="type !== 'a'">
            <h5>流程记录</h5>
            <div class="line line-dashed b-info"></div>
            <!-- 流程记录 -->
            <el-table
                    :data="history"
                    max-height="250"
                    style="width: 100%">
                <el-table-column
                        prop="as_role"
                        label="用户"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="as_op"
                        label="操作"
                        min-width="100">
                </el-table-column>
                <el-table-column
                        prop="as_state"
                        width="80"
                        label="状态">
                </el-table-column>
                <el-table-column
                        prop="as_assessortime"
                        label="时间"
                        width="160">
                </el-table-column>
            </el-table>
        </template>

        <!-- 驳回模态框 -->
        <el-dialog title="驳回" v-model="checkBackDialog" v-if="isCheck">
            <el-form :model="checkBackData" ref="checkBackForm">
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="8">
                        <el-form-item label-width="0px" prop="state" :rules="{ required: true, message: '请选择驳回人' }">
                            <el-select v-model="checkBackData.state" placeholder="请选择驳回人">
                                <el-option v-for="user in arrUsers" :key="user.val" :label="user.name"
                                           :value="user.val"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="16">
                        <el-form-item label-width="0px" prop="opinion"
                                      :rules="{ required: true, message: '请输入意见', trigger: 'blur' }">
                            <el-input placeholder="请输入意见(必填)" v-model.trim="checkBackData.opinion">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="checkBackDialog = false">取 消</el-button>
                <el-button type="primary" @click="checkBack">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script type="text/ecmascript-6">
  import {applyCheck} from 'mixins'
  export default{
    name: 'qj-check',
    data() {
      let ccStartDate = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择出差开始时间'));
        } else {
          if (this.data.qj_enddate !== '') {
            this.$refs.editForm.validateField('qj_enddate');
          }
          callback();
        }
      };
      let ccEndDate = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择出差结束时间'));
        } else if (this.data.qj_startdate !== '') {
          let startD = new Date(this.data.qj_startdate).getTime()
          let endD = new Date(value).getTime()
          if (endD < startD) {
            callback(new Error('结束时间必须晚于开始时间!'));
          } else {
            callback()
          }
        } else {
          callback();
        }
      };
      let ccDays = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请填写出差天数！'));
        } else if (!/^[\d]+(.0)?$/.test(value)) {
          callback(new Error('天数必须是自然数！'));
        } else {
          callback();
        }
      };
      return {
          /* 数据 */
        data: {
          fid: '',
          cc_datestart: '',
          cc_dateend: '',
          cc_alldate: '',
          cc_dourn: '',
          cc_estimcost: '',
          cc_reasons: '',
          cc_state: ''
        },
          /* 校验规则 */
        rules: {
          cc_datestart: {
            validator: ccStartDate,
            trigger: 'blur',
            required: true,
            type: 'date'
          },
          cc_dateend: {
            validator: ccEndDate,
            trigger: 'blur',
            required: true,
            type: 'date'
          },
          cc_alldate: {
            validator: ccDays,
            trigger: 'blur',
            required: true
          },
          cc_estimcost: {
            trigger: 'blur',
            required: true,
            message: '请填写预算经费'
          },
          cc_dourn: {
            trigger: 'blur',
            required: true,
            message: '请填写目的地'
          },
          cc_reasons: {
            trigger: 'blur',
            required: true,
            message: '请填写出差事由'
          }
        },
        // 开始时间限制
        startTimeOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 1000 * 60 * 60 * 24
          }
        },
        // 结束时间限制
        endTimeOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 1000 * 60 * 60 * 24
          }
        }
      }
    },
    mixins: [applyCheck]
  }
</script>
