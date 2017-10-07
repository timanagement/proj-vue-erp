<template>
  <div class="m-b-md">
    <h3 class="m-t-sm">
      <i class="fa fa-chevron-left m-r-md pointer" @click="$router.go(-1)" v-if="back"></i>
      {{title + `${attach &&' - ' + attach }`}}
      <slot></slot>
    </h3>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    name: 'page-title',
    props: {
      title: {
        type: String,
        require: true
      },
      attach: {
        type: String,
        default: ''
      },
      back: {
        type: Boolean,
        default: true
      }
    }
  }
</script>
