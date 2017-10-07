<template>
    <div>
        <!-- 页头 -->
        <page-title title="通讯录">
            <el-input
                    placeholder="查询姓名|部门|公司"
                    icon="search"
                    size="small"
                    v-model="para.name"
                    class="pull-right"
                    @input.native="getData"
                    style="width:auto;">
            </el-input>
        </page-title>

        <!-- 分割线 -->
        <div class="line line-dashed b-info"></div>

        <el-row :gutter="20">
            <el-col :xs="0" :sm="6" :lg="4" class="hidden-xs">
                <el-tree
                        class="scrollable"
                        :data="lists"
                        :props="props"
                        default-expand-all
                        highlight-current
                        ref="data"
                        :style="{maxHeight: $store.state.global.listMaxHeight+'px'}"
                        v-loading="loading">
                </el-tree>
            </el-col>
            <el-col :xs="24" :sm="18" :lg="20">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="通讯录" name="first">
                        <!-- 列表 -->
                        <el-table
                                :data="data"
                                border
                                v-loading="listLoading"
                                @selection-change="handleSelectionChange"
                                :max-height="$store.state.global.listMaxHeight - 60">
                            <el-table-column
                                    prop="u_center"
                                    label="公司"
                                    min-width="200">
                            </el-table-column>
                            <el-table-column
                                    prop="u_dept"
                                    label="部门"
                                    min-width="160">
                            </el-table-column>
                            <el-table-column
                                    prop="u_name"
                                    label="工号"
                                    width="100">
                            </el-table-column>
                            <el-table-column
                                    prop="u_truename"
                                    label="姓名"
                                    width="100">
                            </el-table-column>
                            <el-table-column
                                    prop="u_sex"
                                    label="性别"
                                    width="70">
                            </el-table-column>
                            <el-table-column
                                    prop="u_position"
                                    label="岗位"
                                    min-width="100">
                            </el-table-column>
                            <el-table-column
                                    prop="u_tel"
                                    label="电话"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="u_cornet"
                                    label="短号"
                                    width="80">
                            </el-table-column>
                            <el-table-column
                                    prop="u_chat"
                                    label="QQ"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    fixed="right"
                                    label="操作"
                                    width="90">
                                <template scope="data">
                                    <el-button-group>
                                        <el-button @click="handleCheck('v',data.row.id)" type="primary" size="mini">设为常用</el-button>
                                        <el-button @click="handleDel(data.row)" type="danger" size="mini" v-show="data.row.step !== '1'">取消常用</el-button>
                                    </el-button-group>
                                </template>
                            </el-table-column>
                        </el-table>
                        <!-- 分页 -->
                        <page-pagination :getData="getData" :para="para"></page-pagination>
                    </el-tab-pane>
                    <el-tab-pane label="常用联系人" name="second">配置管理</el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
    </div>
</template>
<script type="text/ecmascript-6">
  import {commonList} from 'mixins'
  import Api from 'api'
  export default{
    name: 'address-book',
    data () {
      return {
        // 查询关键字
        filterText: '',
        para: {
          name: ''
        },
        // tab页切换
        activeName: 'first',
        // 部门列表
        lists: [],

        // 加载状态
        loading: false,

        // 字段配置选项
        props: {
          children: 'children',
          label: 'dept_name',
          key: 'dept_id'
        },
        API_URL: '/addressbooks'
      }
    },
    methods: {
      // 获取数据
      getLists() {
        this.loading = true
        Api.get('/depts', {}, res => {
          this.lists = res.data
          this.loading = false
        })
      },
      // 过滤器
      filterNode(value, data) {
        if (!value) return true
        return data[this.props.label].indexOf(value) !== -1
      }
    },
    mounted () {
      this.getLists()
    },
    mixins: [commonList]
  }
</script>

<style scoped>

</style>
