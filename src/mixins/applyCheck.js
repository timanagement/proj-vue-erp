/**
 * Created by GiantX on 2017/5/2.
 */
import {common} from 'components'
import Api from 'api'
export default {
  data() {
    // 截取op
    let op = this.$route.path.match(/s\/([a-z]+)\//)[1]
    return {
      /* 查看类型 */
      type: this.$route.params.type,
      /* 详情id */
      id: this.$route.params.id,
      /* op */
      op: op,
      /* 表单label宽度 */
      formLabelWidth: '85px',
      /* 加载状态 */
      formLoading: false,
      /* 提交状态 */
      editDisabled: false,
      /* 驳回模态框状态 */
      checkBackDialog: false,
      /* 驳回用户列表 */
      arrUsers: {},
      /* 驳回数据 */
      checkBackData: {
        state: '',
        opinion: '',
        op: op
      },
      /* 流程记录 */
      history: [],
      /* 接口地址 */
      API_URL: {
        // 创建,提交,修改
        create: `/createapplys/${op}`,
        // 详情,审核
        detail: `/details`,
        // 取回
        takeback: `/takebacks`,
        // 驳回
        checkBack: '/undotos'
      },
      /* 额外数据 */
      create: {
        workflow: [] // 流程
      },
      /* 通用数据 */
      data: {
        takeback: false,
        workflow: {},
        worktype: '1',
        isdel: '0'
      }
    }
  },
  computed: {
    // 查看或审批不可编辑
    disabled() {
      return this.type === 'c' || this.type === 'v'
    },
    // 是否为审批
    isCheck() {
      return this.type === 'c'
    },
    // 当前流程
    currFid() {
      return this.data.fid || (this.data.fid = this.create.workflow[0] ? this.create.workflow[0].fid : '')
    },
    // 当前状态
    currActive() {
      let state = this.data[`${this.op}_state`]
      // 不是申请
      if (state !== '') {
        // 走完流程
        if (state === '0') {
          return Object.keys(this.data.workflow).length
        } else {
          return Number(state) - 1
        }
      }
      return 0
    },
    // 当前流程
    currWl() {
      return this.disabled ? [{fid: this.data.fid, rulelist: this.data.workflow}] : this.create.workflow
    }
  },
  watch: {
    // 关闭驳回弹窗后重置表单
    checkBackDialog(val) {
      !val && this.resetForm('checkBackForm')
    }
  },
  components: {
    'page-title': common.PageTitle
  },
  methods: {
    /** 提交
     * @desc 添加,修改提交
     * @param {String}  formName 表单ref
     * */
    handleSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.editDisabled = true
            let para = Object.assign({id: this.id}, this.convertTime(this.data, false))
            if (para.id !== ' ') {
              /* 修改 */
              Api.put(this.API_URL.create, para, res => this.handelSubmitRes(res))
            } else {
              /* 添加 */
              Api.post(this.API_URL.create, para, res => this.handelSubmitRes(res))
            }
          })
        }
      })
    },
    /** 响应提交
     * @desc 提交操作后回调函数
     * @param {Object}    res     响应json对象
     * @param {Boolean}   isBack  是否后退
     * @param {String}    SuccMsg 成功消息
     * @param {String}    ErrMsg  失败消息
     * */
    handelSubmitRes(res, isBack, ErrMsg, SuccMsg) {
      this.editDisabled = false
      if (res.data === 'success') {
        this.$message({
          message: SuccMsg || '操作成功',
          type: 'success'
        })
        this.$router.go(-1)
      } else {
        this.$message({
          message: `操作失败:${ErrMsg || res.data}`,
          type: 'error'
        })
        isBack && this.$router.go(-1)
      }
    },
    /** 重置
     * @desc 重置表单
     * @param {String}  formName 表单ref
     * */
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    /** 取回
     * @desc 申请提交或审核后取回操作
     * */
    takeBack() {
      this.editDisabled = true
      let para = {
        id: this.id,
        op: this.op
      }
      Api.put(this.API_URL.takeback, para, res => this.handelSubmitRes(res, true, '该流程状态已被更改!'))
    },
    /** 审核同意
     * @desc 审核同意选填意见
     * */
    checkAgree() {
      this.$prompt('请输入意见(选填)', '同意', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({value}) => {
        this.editDisabled = true
        let para = {
          id: this.id,
          op: this.op,
          opinion: value || '同意'
        }
        // 判断当前是最后一步审核
        if (this.currActive === Object.keys(this.currWl[0].rulelist).length - 1) {
          // 加班
          if (this.op === 'jb') {
            para['jb_unuseable'] = '0'
          }
        }
        Api.post(this.API_URL.detail, para, res => this.handelSubmitRes(res))
      })
    },
    /** 审核驳回
     * @desc 审核同意必填意见及驳回人
     * */
    checkBack() {
      this.$refs['checkBackForm'].validate(valid => {
        if (valid) {
          let para = Object.assign({}, {id: this.id}, this.checkBackData)
          Api.put(this.API_URL.checkBack, para, res => this.handelSubmitRes(res))
        }
      })
    },
    /** 转换时间
     * @desc 需要转的字段为rules里面type = date对应key
     * @param {Object}        data 数据对象
     * @param {Boolean}       flag 输入:true,输出:false
     * */
    convertTime(data, flag) {
      data = Object.assign({}, data)
      typeof flag !== 'boolean' && (flag = false)
      let arr = Object.keys(this.rules).filter(item => {
        return this.rules[item].type === 'date'
      })
      arr.length > 0 && arr.forEach(item => {
        flag ? (data[item] = new Date(data[item] * 1000)) : (data[item] = Math.floor(new Date(data[item]).getTime() / 1000))
      })
      return data
    }
  },
  mounted() {
    // 获取create数据,流程等
    this.formLoading = true
    Api.get(this.API_URL.create, {}, res => {
      Object.assign(this.create, res)
      this.formLoading = false
    }, () => {
      this.formLoading = false
    })
    // 不是添加就获取详情
    if (this.type !== 'a') {
      this.formLoading = true
      Api.detail(`${this.API_URL.detail}/${this.op}`, this.id, res => {
        Object.assign(this.data, this.convertTime(res.data, true))
        Object.assign(this.arrUsers, res.arrUsers)
        Object.assign(this.history, res.history)
        this.formLoading = false
      }, () => {
        this.formLoading = false
      })
    }
  }
}
