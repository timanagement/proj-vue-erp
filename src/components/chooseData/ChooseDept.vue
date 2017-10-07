<template>
  <!-- 部门选择 -->
  <el-dialog title="选择部门" v-model="show" top="30px" size="small">
    <el-input
        placeholder="输入部门名称进行查询"
        icon="search"
        size="small"
        v-model="filterText">
    </el-input>
    <el-tree
        :data="lists"
        :props="props"
        :show-checkbox="multiple"
        :node-key="props.key"
        :current-node-key="currentNodeKey"
        default-expand-all
        highlight-current
        accordion
        class="scrollable m-t-sm"
        style="max-height: 300px"
        ref="data"
        :filter-node-method="filterNode"
        v-loading="loading"></el-tree>
    <div slot="footer" class="dialog-footer">
      <el-button v-if="multiple" size="mini" @click="selectAll" type="success" class="pull-left"
                 :disabled="!!filterText">全选
      </el-button>
      <el-button v-if="multiple" size="mini" @click="cancelAll" type="danger" class="pull-left">清空</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>

</template>

<script type="text/ecmascript-6">
  import commonChoose from './commonChoose'
  export default{
    name: 'choose-dept',
    data () {
      return {
        // 字段配置选项
        props: {
          label: 'dept_name',
          key: 'dept_id'
        },

        // 接收属性选项
        attr: {
          id: {
            str: 'did',
            all: 'ALLDEPT'
          },
          name: {
            str: 'dname',
            all: '所有部门'
          }
        },

        // 接口地址
        API_URL: '/depts'
      }
    },
    mixins: [commonChoose],
    props: {
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
    }
  }
</script>
