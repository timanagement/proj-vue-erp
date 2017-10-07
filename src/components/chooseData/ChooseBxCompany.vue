<template>
  <!-- 报销公司选择 -->
  <el-dialog title="报销公司选择" v-model="show" top="30px" size="small">
    <el-input
        placeholder="输入公司名称进行查询"
        icon="search"
        v-model="filterText">
    </el-input>
    <el-tree
        :data="data"
        :props="props"
        node-key="dept_id"
        highlight-current
        class="scrollable m-t-sm"
        style="max-height: 400px"
        ref="data"
        :filter-node-method="filterNode"
        v-loading="loading"></el-tree>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>

</template>

<script type="text/ecmascript-6">
  export default{
    name: 'choose-bx-company',
    data () {
      return {
        // 查询关键字
        filterText: '',

        // 列表
        data: {},

        // 配置选项
        props: {
          label: 'dept_name'
        },

        // 加载状态
        loading: false,

        // 显示状态
        show: false
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
      // 目标对象中存放公司名称字段
      cname: {
        type: String,
        default: 'cname'
      },
      // 目标对象中存放id字段
      cid: {
        type: String,
        default: 'cid'
      }
    },
    components: {},
    watch: {
      // 监视查询输入
      filterText(val) {
        this.$refs.data.filter(val)
      },
      // 监视显示
      value(val) {
        this.show = val
        // 弹窗显示时清空查询
        if (val) {
          this.filterText = ''
        }
      },
      // 监视隐藏
      show(val) {
        this.$emit('input', val)
      }
    },
    methods: {
      // 获取数据
      getData() {
        //this.loading = true
        this.data = {
          7: {
            bursar_isjob: '1',
            cashier_isjob: '1',
            connect_isjob: '1',
            dept_bursar: '583',
            dept_bursarname: '王坚',
            dept_cashier: '671',
            dept_cashiername: '傅正颖',
            dept_connect: '221',
            dept_connectname: '严燕华',
            dept_finance: '685',
            dept_financename: '倪如兴',
            dept_id: '7',
            dept_name: '义乌商翔贸易有限公司',
            finance_isjo: '1'
          }
        }
      },

      // 过滤器
      filterNode(value, data) {
        if (!value) return true
        return data.dept_name.indexOf(value) !== -1
      },

      // 选择用户
      submit() {
        /*let selectList = this.$refs.data.getCheckedNodes()
        let dnameList = selectList.length === this.datas.length ? '所有部门' : selectList.map(item => item.name).toString()
        let didList = selectList.length === this.datas.length ? ['000'] : selectList.map(item => item.id)
        this.$set(this.data, this.dname, dnameList)
        this.$set(this.data, this.did, didList)
        this.show = false*/
      }
    },
    mounted () {
      this.getData()
      if (this.value) {
        this.show = true
      }
    }
  }
</script>
