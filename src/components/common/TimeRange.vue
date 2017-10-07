<template>
  <el-date-picker
      v-model="value"
      :type="type"
      :size="size"
      :editable="false"
      :picker-options="startTimeOptions"
      placeholder="开始时间">
  </el-date-picker>
</template>

<script type="text/ecmascript-6">
  export default{
    name: 'time-range',
    data() {
      // 开始时间限制
      return {
        startTimeOptions: {
          disabledDate(time) {
            if (_this.apply_end_time) {
              return time.getTime() > _this.apply_end_time * 1000 || time.getTime() > Date.now()
            }
            return time.getTime() > Date.now()
          }
        }
      }
    },
    props: {
      value: {
        require: true
      },
      type: {
        type: String,
        default: 'date'
      },
      size: {
        type: String,
        default: 'small'
      }
    }
  }
</script>
