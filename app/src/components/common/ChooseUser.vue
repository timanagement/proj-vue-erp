<template>
  <!-- 员工选择 -->
  <el-dialog title="员工选择" v-model="show" top="30px" size="tiny">
    <el-input
      placeholder="输入姓名进行查询"
      icon="search"
      v-model="filterText">
    </el-input>
    <el-tree
      :data="allUser"
      :props="props"
      show-checkbox
      node-key="id"
      highlight-current
      class="scrollable m-t-sm"
      style="max-height: 300px;"
      ref="allUser"
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

<script>
  export default{
    name: 'choose-user',
    data () {
      return {
        // 查询关键字
        filterText: '',
        // 用户列表
        allUser: [],
        // 配置选项
        props: {
          label: 'name'
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
      // 目标对象中存放姓名字段
      uname: {
        type: String,
        default: 'uname'
      },
      // 目标对象中存放id字段
      uid: {
        type: String,
        default: 'uid'
      }
    },
    components: {},
    watch: {
      // 监视查询输入
      filterText(val) {
        this.$refs.allUser.filter(val);
      },
      // 监视显示
      value(val) {
        this.show = val;
        // 弹窗显示时根据源数据设定选中
        if (val) {
          this.filterText = '';
          this.$nextTick(() => {
            let uidList = this.data[this.uid];
            if (uidList[0] == '000') {
              uidList = this.allUser.map(item => item.id)
            }
            this.$refs.allUser.setCheckedKeys(uidList)
          });
        }
      },
      // 监视隐藏
      show(val) {
        this.$emit('input', val);
      }
    },
    methods: {
      // 获取数据
      getData(){
        this.allUser = [
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
        ]
      },
      // 过滤器
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },

      // 全选
      selectAll(){
        let list = this.allUser.map(item => item.id);
        this.$refs.allUser.setCheckedKeys(list)
      },

      // 取消全选
      cancelAll(){
        this.$refs.allUser.setCheckedKeys([])
      },

      // 选择用户
      submit() {
        let selectList = this.$refs.allUser.getCheckedNodes(),
          unameList = selectList.length === this.allUser.length ? '所有人' : selectList.map(item => item.name).toString(),
          uidList = selectList.length === this.allUser.length ? ['000'] : selectList.map(item => item.id);
        this.$set(this.data, this.uname, unameList);
        this.$set(this.data, this.uid, uidList);
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
