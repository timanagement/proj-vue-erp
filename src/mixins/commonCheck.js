/**
 * Created by GiantX on 2017/5/2.
 */
import {common} from 'components'
export default {
  data() {
    return {
      /* 查看类型 */
      type: this.$route.params.type,
      /* 详情id */
      id: this.$route.params.id,
      /* 表单label宽度 */
      formLabelWidth: '85px',
      /* 加载状态 */
      formLoading: false,
      /* 提交状态 */
      editLoading: false
    }
  },
  computed: {
    // 查看不可编辑
    disabled() {
      return this.type === 'v'
    }
  },
  components: {
    'page-title': common.PageTitle
  },
  methods: {
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
