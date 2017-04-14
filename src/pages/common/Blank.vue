<template>
  <div class="warpper">
    <ul>
      <li v-for="item in data.id">
        {{item}}
      </li>
    </ul>
    <h4>{{data.name}}</h4>
    ``````````````````````````````````````````````````````````````````
    <ul>
      <li v-for="item in data2.id">
        {{item}}
      </li>
    </ul>
    <h4>{{data2.name}}</h4>

    <choose v-model="show" :data="chooseData" :uname="'name'" :uid="'id'"></choose>

    <el-button @click="handleShow('data')">{{show?"隐藏":data.name}}</el-button>
    <el-button @click="handleShow('data2')">{{show?"隐藏":data2.name}}</el-button>
  </div>
</template>

<script>
  import {common} from '@/components'
  export default{
    name: 'blank',
    data () {
      return {
        data: {
          id: [
            '复选框 A',
            '复选框 B',
          ],
          name: 'asd'
        },
        show: false,
        data2: {
          id: [
            '复选框 C',
          ],
          name: '撒旦飞洒'
        },
        chooseData: {}

      }
    },
    components: {
      'choose': common.ChooseUser
    }
    ,
    watch: {}
    ,
    methods: {
      handleShow(data){
        this.chooseData = this[data];
        this.show = true;
      }
    }
    ,
    created()
    {

    }
  }
</script>
