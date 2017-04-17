<template>
  <!-- 员工选择 -->
  <el-dialog title="部门选择" v-model="show" top="30px" size="tiny">
    <el-input
      placeholder="输入部门名称进行查询"
      icon="search"
      v-model="filterText">
    </el-input>
    <el-tree
      :data="datas"
      :props="props"
      show-checkbox
      node-key="id"
      highlight-current
      class="scrollable m-t-sm"
      style="max-height: 300px;"
      ref="data"
      :filter-node-method="filterNode"
      v-loading="loading"></el-tree>
    <div slot="footer" class="dialog-footer">
      <el-button size="mini" @click="selectAll" type="success" class="pull-left" :disabled="!!filterText">全选
      </el-button>
      <el-button size="mini" @click="cancelAll" type="danger" class="pull-left">清空</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>

</template>

<script type="text/ecmascript-6">
  export default{
    name: 'choose-dept',
    data () {
      return {
        // 查询关键字
        filterText: '',

        // 列表
        datas: [],

        // 配置选项
        props: {
          label: 'name'
        },

        // 加载状态
        loading: false,

        // 显示状态
        show: false,
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
      // 目标对象中存放姓名字段
      dname: {
        type: String,
        default: 'dname'
      },
      // 目标对象中存放id字段
      did: {
        type: String,
        default: 'did'
      }
    },
    components: {},
    watch: {
      // 监视查询输入
      filterText(val) {
        this.$refs.data.filter(val);
      },
      // 监视显示
      value(val) {
        this.show = val;
        // 弹窗显示时根据源数据设定选中
        if (val) {
          this.filterText = '';
          this.$nextTick(() => {
            let didList = this.data[this.did];
            if (didList[0] == '000') {
              didList = this.datas.map(item => item.id)
            }
            this.$refs.data.setCheckedKeys(didList)
          });
        }
      },
      // 监视隐藏
      show(val) {
        this.$emit('input', val);
      },
    },
    methods: {
      // 获取数据
      getData(){
        //this.loading = true;
        this.datas = [
          {
            id: 1,
            name: 'asdf'
          },
          {
            id: 2,
            name: '22'
          },
          {
            id: 3,
            name: '33'
          },
          {
            id: 4,
            name: '44'
          },
          {
            id: 5,
            name: '55'
          },
          {
            id: 6,
            name: '66'
          },
          {
            id: 7,
            name: '77'
          }
        ];
      },

      // 过滤器
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },

      // 全选
      selectAll(){
        let list = this.datas.map(item => item.id);
        this.$refs.data.setCheckedKeys(list)
      },

      // 取消全选
      cancelAll(){
        this.$refs.data.setCheckedKeys([])
      },

      // 选择用户
      submit() {
        let selectList = this.$refs.data.getCheckedNodes(),
          dnameList = selectList.length === this.datas.length ? '所有部门' : selectList.map(item => item.name).toString(),
          didList = selectList.length === this.datas.length ? ['000'] : selectList.map(item => item.id);
        this.$set(this.data, this.dname, dnameList);
        this.$set(this.data, this.did, didList);
        this.show = false;
      },
    },
    mounted () {
      this.getData();
      if (this.value) {
        this.show = true;
      }
    }
  }
</script>
