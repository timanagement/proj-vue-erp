/**
 * Created by GiantX on 2017/5/2.
 */
import Api from 'api'
import {common} from 'components'
import {session} from 'util'
export default {
  data() {
    let _this = this
    return {
      // 申请列表接口
      API_URL: `/applyLists/${this.$route.params.op}`,
      // 页面分页查询参数
      para: {
        page: 1,
        total: 0,
        pageSize: 10,
        keyword: '',
        apply_start_time: '',
        apply_end_time: ''
      },
      // 多选
      multipleSelection: [],
      // 数据列表
      data: [],
      // 加载状态
      listLoading: false,
      // 开始时间限制
      startTimeOptions: {
        disabledDate(time) {
          if (_this.apply_end_time) {
            return time.getTime() > _this.apply_end_time * 1000
          }
          return time.getTime() > Date.now()
        }
      },
      // 结束时间限制
      endTimeOptions: {
        disabledDate(time) {
          if (_this.apply_start_time) {
            return time.getTime() < _this.apply_start_time * 1000 || time.getTime() > Date.now()
          }
          return time.getTime() > Date.now()
        }
      }
    }
  },
  computed: {
    // 传给服务端的开始时间处理
    apply_start_time() {
      let time = new Date(this.para.apply_start_time).getTime() / 1000
      return time || '';
    },
    // 传给服务端的结束时间处理
    apply_end_time() {
      let time = new Date(this.para.apply_end_time).getTime() / 1000
      return time || '';
    }
  },
  components: {
    'page-title': common.PageTitle,
    'page-query': common.PageQuery,
    'page-pagination': common.PagePagination
  },
  watch: {
    // 监听路由变化
    $route(val) {
      this.API_URL = `/applyLists/${val.params.op}`
      this.para.page = 1
      this.para.pageSize !== 10 && (this.para.pageSize = 10)
    }
  },
  methods: {
    // 获取列表
    getData() {
      this.listLoading = true
      /* 提取缓存列表参数 */
      let originPara = session.get('origin_para')
      originPara && originPara.type === this.API_URL && Object.assign(this.para, originPara.para)
      session.remove('origin_para')
      let para = Object.assign({}, this.para)
      para.apply_start_time = this.apply_start_time
      para.apply_end_time = this.apply_end_time
      Api.get(this.API_URL, para, res => {
        this.data = res.data
        this.para.total = res.total
        setTimeout(() => {
          this.listLoading = false
        }, 200)
      }, () => {
        this.listLoading = false
      })
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 详情
    handleCheck(type, id) {
      this.$router.push(`${this.API_URL}/${type}/${id || ' '}`)
      session.set('origin_para', {type: this.API_URL, para: this.para})
    },
    // 删除
    handleDel(row) {
      let para = row ? row.id : this.multipleSelection.map(item => item.id).toString()
      this.$confirm(`确认删除 ${row ? row.name : '所选项'}?`, '提示', {
        type: 'warning'
      }).then(() => {
        Api.delete(this.API_URL, para, res => {
          if (res.data === 'success') {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.getData()
          } else {
            this.$message({
              message: `操作失败:${res.data}`,
              type: 'error'
            })
          }
        })
      })
    },
    // 当前行checkbox是否可选
    isOptional(row) {
      // 当创建者id等于登陆id时,为true - 可选
      return row.step === '1';
    }
  },
  mounted() {
    // 初始获取数据
    this.getData()
  }
}
