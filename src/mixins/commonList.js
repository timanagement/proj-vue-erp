/**
 * Created by GiantX on 2017/5/2.
 */
import Api from 'api'
import {common} from 'components'
import {session} from 'util'
export default {
  data() {
    return {
      // 页面分页参数
      para: {
        page: 1,
        total: 0,
        pageSize: 10
      },
      // 多选
      multipleSelection: [],
      // 数据列表
      data: [],
      // 加载状态
      listLoading: false
    }
  },
  components: {
    'page-title': common.PageTitle,
    'page-query': common.PageQuery,
    'page-pagination': common.PagePagination
  },
  methods: {
    // 获取列表
    getData() {
      this.listLoading = true
      /* 提取缓存列表参数 */
      let originPara = session.get('origin_para')
      originPara && originPara.type === this.API_URL && Object.assign(this.para, originPara.para)
      session.remove('origin_para')
      Api.get(this.API_URL, this.para, res => {
        this.data = res.data
        this.para.total = res.total
        this.listLoading = false
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
      this.$router.push(`${this.$route.path}/${type}/${id || ' '}`)
      session.set('origin_para', {type: this.API_URL, para: this.para})
    },
    // 删除
    handleDel(row) {
      let para = row ? row.id : this.multipleSelection.map(item => item.id).toString()
      this.$confirm(`确认删除 ${row ? row.name : '所选项'}?`, '提示', {
        type: 'warning'
      }).then(() => {
        Api.delete(this.API_URL, para, res => {
          this.$message({
            message: `删除成功!`,
            type: 'success'
          })
          this.getData()
        }, err => {
          this.$message({
            message: '删除失败!',
            type: 'error'
          })
          console.log(err)
        })
      }).catch(() => {
      })
    }
  },
  mounted() {
    this.getData()
  }
}
