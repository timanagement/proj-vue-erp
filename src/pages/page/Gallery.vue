
<template>
  <section id="content">
    <section class="vbox bg-white">
      <header class="header b-b b-light">
        <p>Gallery</p>
      </header>
      <section class="scrollable">
        <div class="text-center m-t-lg clearfix wrapper-lg animated fadeInRightBig" id="galleryLoading">
          <h1>Flickr Gallery</h1>
          <h3 class="text-muted">This gallery use Flickr api to load the photos</h3>
          <p class="m-t-lg"><i class="fa fa-spinner fa fa-spin fa fa-2x"></i></p>
        </div>
        <div id="gallery" class="gallery hide">
          <div class="item"> <img src="images/thumb_2.png" /> <a href="images/thumb_2.png" rel="prettyPhoto[gallery]"></a>
            <div class="desc">
              <h4>Teideal</h4>
              <p>Lorem ipsum dolor sit amet...</p>
              <span>2013-08-29 13:00:00</span> </div>
          </div>
        </div>
      </section>
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
