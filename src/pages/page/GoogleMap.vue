
<template>
  <section id="content">
    <section class="vbox bg-white">
      <header class="header b-b">
        <form method="post" id="geocoding_form" class="input-s m-t-sm m-b-none pull-right">
          <div class="input-group">
            <input type="text" id="address" name="address" class="input-sm form-control" placeholder="Search">
            <span class="input-group-btn">
                <button class="btn btn-sm btn-default" type="submit">Go!</button>
                </span> </div>
        </form>
        <p>Google Maps</p>
      </header>
      <section id="gmap_geocoding" style="min-height:240px;"> </section>
    </section>
    <a href="#" class="hide nav-off-screen-block" data-toggle="class:nav-off-screen" data-target="#nav"></a> </section>
</template>

<script>
  export default{
    data () {
      return {}
    },
    components: {},
    watch: {},
    methods: {},
    created () {

    }
  }
</script>
