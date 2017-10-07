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
                    <el-form-item label="类型" prop="qj_categoryid">
                        <el-select v-model="data.qj_categoryid" :disabled="disabled" @change="handleCategoryChange">
                            <el-option
                                    v-for="tp in create.type"
                                    :label="tp.qj_type_name"
                                    :key="tp.qj_type"
                                    :value="tp.qj_type">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6">
                    <el-form-item label="开始时间" prop="qj_startdate">
                        <el-date-picker
                                v-model="data.qj_startdate"
                                type="datetime"
                                :editable="false"
                                :disabled="disabled"
                                :picker-options="startTimeOptions"
                                placeholder="选择请假开始时间">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6">
                    <el-form-item label="结束时间" prop="qj_enddate">
                        <el-date-picker
                                v-model="data.qj_enddate"
                                type="datetime"
                                :editable="false"
                                :disabled="disabled"
                                :picker-options="endTimeOptions"
                                placeholder="选择请假结束时间">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6">
                    <el-form-item label="请假天数" prop="qj_days">
                        <el-input v-model.trim="data.qj_days" auto-complete="off" :disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6">
                    <el-form-item label="请假小时" prop="qj_hours">
                        <el-input v-model.trim="data.qj_hours" auto-complete="off" :disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6">
                    <el-form-item label="工作委托人" prop="qj_touname">
                        <el-input
                                :disabled="disabled"
                                readonly
                                placeholder="选择个人"
                                v-model="data.qj_touname"
                                @click.native="showChooseUser = true">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="24">
                    <el-form-item class="text-danger font-bold">
                        请假8小时为一天，1小时算0.125天，不满一小时算一小时，上午为三小时，下午为五小时。请假时间天数必须为整数，小时数必须为小于8的整数！
                    </el-form-item>
                </el-col>
                <el-col :xs="24" v-show="data.qj_categoryid === '5'" class="animated fadeInDown">
                    <el-form-item label="抵扣单号" prop="qj_jobnumber">
                        <el-select v-model="dkd" multiple v-if="!disabled" @selection-change="handleSelectionChange">
                            <el-option
                                    v-for="tx in create.tiaoxiu"
                                    :label="`${tx.jb_number} (${tx.jb_hours}小时)`"
                                    :key="tx.jb_id"
                                    :value="tx.jb_id">
                            </el-option>
                        </el-select>
                        <el-input
                                v-else
                                v-model="data.qj_jobnumber"
                                :disabled="true"
                        >
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="24">
                    <el-form-item label="请假事由" prop="qj_detail">
                        <el-input
                                type="textarea"
                                :autosize="{ minRows: 2, maxRows: 10 }"
                                v-model="data.qj_detail"
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

        <!-- 用户选择 -->
        <choose-user v-model="showChooseUser" :data="data" uname="qj_touname" uid="qj_touid"
                     v-if="!disabled"></choose-user>
    </div>
</template>
<script type="text/ecmascript-6">
  import {applyCheck} from 'mixins'
  import {chooseData} from 'components'
  export default{
    name: 'qj-check',
    data() {
      let qjStartDate = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择请假开始时间'));
        } else {
          if (this.data.qj_enddate !== '') {
            this.$refs.editForm.validateField('qj_enddate');
          }
          callback();
        }
      };
      let qjEndDate = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择请假结束时间'));
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
      let qjDays = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请填写请假天数！'));
        } else if (!/^[\d]+(.0)?$/.test(value)) {
          callback(new Error('天数必须是自然数！'));
        } else if (this.data.fid === '6' && (value > 3 || (value === '3' && this.data.qj_hours > 0))) {
          callback(new Error('请假天数大于3，请您选择正确的流程！'));
        } else if (this.data.fid === '30' && (value < 3 || (value === '3' && this.data.qj_hours === '0'))) {
          callback(new Error('请假天数小于3，请您选择正确的流程！'));
        } else {
          callback();
        }
      };
      let qjHours = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请填写请假小时数！'));
        } else if (!/^[0-7]$/.test(value)) {
          callback(new Error('小时数必须是0-7之间的整数！'));
        } else {
          callback();
        }
      };
      let qjNumber = (rule, value, callback) => {
        if (this.data.qj_categoryid === '5' && this.dkd.length === 0 && this.type === 'u') {
          callback(new Error('请选择抵扣单！'));
        } else {
          callback();
        }
      };
      return {
          /* 数据 */
        data: {
          fid: '',
          qj_categoryid: '',
          qj_category: '',
          qj_jobnumber: '',
          qj_days: '',
          qj_hours: '',
          qj_startdate: '',
          qj_enddate: '',
          qj_detail: '',
          qj_touid: '',
          qj_state: '',
          qj_touname: ''
        },
          /* 校验规则 */
        rules: {
          qj_startdate: {
            validator: qjStartDate,
            trigger: 'blur',
            required: true,
            type: 'date'
          },
          qj_enddate: {
            validator: qjEndDate,
            trigger: 'blur',
            required: true,
            type: 'date'
          },
          qj_days: {
            validator: qjDays,
            trigger: 'blur',
            required: true
          },
          qj_hours: {
            validator: qjHours,
            trigger: 'blur',
            required: true
          },
          qj_categoryid: {
            trigger: 'blur',
            required: true,
            message: '请选择请假类型'
          },
          qj_detail: {
            trigger: 'blur',
            required: true,
            message: '请填写请假事由'
          },
          qj_jobnumber: {
            trigger: 'change',
            validator: qjNumber
          }
        },
        // 显示用户选择弹窗
        showChooseUser: false,
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
        },
        dkd: []
      }
    },
    mixins: [applyCheck],
    components: {
      'choose-user': chooseData.ChooseUser
    },
    watch: {
      dkd(val) {
        this.data.qj_jobnumber = [].slice.call(val).toString()
      }
    },
    methods: {
      // 选择抵扣单号
      handleSelectionChange(val) {
        this.dkd = val
      },
      // 请假类型变动
      handleCategoryChange(val) {
        this.create.type && (this.data.qj_category = this.create.type.filter(item => item.qj_type === val)[0].qj_type_name)
      }
    }
  }
</script>
