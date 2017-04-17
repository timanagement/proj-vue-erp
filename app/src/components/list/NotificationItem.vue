<template>
  <router-link to="/" class="media list-group-item">
    <span class="pull-left thumb-sm" v-if="item.avatar">
      <img :src="item.avatar" :alt="item.name" class="img-circle">
    </span>
    <span class="media-body block m-b-none">{{item.message}}<br>
      <small class="text-muted">10 minutes ago</small>
    </span>
  </router-link>

</template>

<script>
  export default{
    name: 'notification-item',
    data () {
      return {}
    },
    props: ['item'],
    components: {},
    watch: {},
    methods: {},
    created () {

    }
  }
</script>
