<style>

</style>
<template>
  <el-dialog title="员工选择" v-model="show">
    <el-form :model="form" :label-width="formLabelWidth">
      <el-form-item label="活动名称">
        <el-input v-model="form.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="复选框 A"></el-checkbox>
          <el-checkbox label="复选框 B"></el-checkbox>
          <el-checkbox label="复选框 C"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
  export default {
    name: 'choose-user',
    data(){
      return {
        show: this.value,
        form: {
          name: this.data[this.uname],
          type: this.data[this.uid],
        },
        formLabelWidth: '120px'
      }
    },
    props: {
      value: {
        type: Boolean,
        required: true
      },
      data: {
        type: Object,
        require: true
      },
      uname: {
        type: String,
        default: 'uname'
      },
      uid: {
        type: String,
        default: 'uid'
      }
    },
    components: {},
    computed: {},
    watch: {
      value(val){
        this.show = val;
      },
      show(val){
        this.$emit('input', val)
      },
      data(val){
        this.form.name = val[this.uname];
        this.form.type = val[this.uid];
      }
    },
    methods: {
      handleSubmit(){
        this.$set(this.data, this.uname, this.form.name);
        this.$set(this.data, this.uid, this.form.type);
        this.show = false;
      }
    },
    beforeMount(){
    },
    mounted(){
      if (!this.value) {
        this.show = false;
      }
    },
  }
</script>
