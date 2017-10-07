/**
 * Created by GiantX on 2017/5/2.
 */
import Api from 'api'
import {utils} from 'util'
export default{
  data () {
    return {
      // 查询关键字
      filterText: '',

      // 列表
      lists: [],

      // 配置选项
      props: {
        children: 'children'
      },

      // 加载状态
      loading: false,

      // 显示状态
      show: false,

      // 当前选中key(单选用)
      currentNodeKey: ''
    }
  },
  computed: {
    // 计算总数
    total: function () {
      return utils.getNodesNum(this.lists)
    }
  },
  props: {
    // 显示隐藏
    value: {
      type: Boolean,
      required: true,
      default: false
    },
    // 目标对象
    data: {
      type: Object,
      required: true
    },
    // 是否允许多选 默认单选
    multiple: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    // 监视查询输入
    filterText(val) {
      this.$refs.data.filter(val)
    },
    // 监视隐藏
    show(val) {
      this.$emit('input', val)
    },
    // 监视显示
    value(val) {
      this.show = val
      // 弹窗显示时根据源数据设定选中
      if (val) {
        this.filterText = ''
        this.$nextTick(() => {
          let idList = this.data[this[this.attr.id.str]]
          // 多选
          if (this.multiple) {
            idList = idList === this.attr.id.all ? this.lists.map(item => item[this.props.key]) : idList.split(',')
            this.$refs.data.setCheckedKeys(idList)
          } else { // 单选
            this.currentNodeKey = idList || ''
          }
        })
      }
    }
  },
  methods: {
    // 获取数据
    getData() {
      this.loading = true
      Api.get(this.API_URL, {}, res => {
        this.lists = res.data
        this.loading = false
      })
    },

    // 选择用户
    submit() {
      let name = ''
      let id = ''
      if (this.multiple) {
        let selectList = this.$refs.data.getCheckedNodes()
        name = selectList.length === this.total ? this.attr.name.all : selectList.map(item => item[this.props.label]).toString()
        id = selectList.length === this.total ? this.attr.id.all : selectList.map(item => item[this.props.key]).toString()
      } else {
        // 没有选择节点就提交
        try {
          let selectList = this.$refs.data.currentNode.node.data
          name = selectList[this.props.label]
          id = selectList[this.props.key]
        } catch (e) {
          name = this.data[this[this.attr.name.str]]
          id = this.data[this[this.attr.id.str]]
        }
      }
      this.$set(this.data, this[this.attr.name.str], name)
      this.$set(this.data, this[this.attr.id.str], id)
      this.show = false
      this.$emit('submit', {name: name, id: id})
    },

    // 过滤器
    filterNode(value, data) {
      if (!value) return true
      return data[this.props.label].indexOf(value) !== -1
    },

    // 全选
    selectAll() {
      let list = this.lists.map(item => item[this.props.key])
      this.$refs.data.setCheckedKeys(list)
    },

    // 取消全选
    cancelAll() {
      this.$refs.data.setCheckedKeys([])
    }
  },
  mounted () {
    this.getData()
    if (this.value) {
      this.show = true
    }
  }
}
