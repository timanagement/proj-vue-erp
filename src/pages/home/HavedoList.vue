<template>
  <div>
    <!-- 页头 -->
    <page-title title="已办审批 - 分类"></page-title>

    <el-row :gutter="10">
      <el-col :xs="24" :sm="12" :md="8" :lg="6" v-for="(item, key) in data" :key="item.op">
        <el-card @click.native="handleClick(item.op)" class="pointer m-b-sm hide animated fadeInRight"
                 :body-style="{padding:'5px 20px'}"
                 v-assemblyLine="key * delay">
          <h4>
            <i class="fa fa-lg" :class="item.icon || 'fa-times'"></i>
            {{item.name}}
            <el-tag :type="item.num | numType" class="pull-right">{{item.num}}</el-tag>
          </h4>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script type="text/ecmascript-6">
  import Api from 'api'
  import {common} from 'components'
  export default{
    name: 'havedo-list',
    data() {
      return {
        data: [],
        // 分类显示延迟时间
        delay: 50
      }
    },
    components: {
      'page-title': common.PageTitle
    },
    methods: {
      getData() {
        Api.get('/undotoeds', {}, res => {
          this.data = res.data
        })
      },
      // 进入列表
      handleClick(op) {
        this.$router.push('havedo/' + op)
      }
    },
    directives: {
      // 分类呈流水线显示
      assemblyLine: {
        bind(el, binding) {
          setTimeout(() => el.classList.remove('hide'), binding.value)
        }
      }
    },
    filters: {
      numType(num) {
        num = Number(num) || 0
        return num < 5 ? 'gray' : num < 10 ? 'primary' : num < 15 ? 'success' : num < 20 ? 'warning' : 'danger'
      }
    },
    mounted() {
      this.getData()
    }
  }
</script>
