<template>
  <div id="animated-number-demo">
    <input v-model.number="number" type="number" step="20">
    <p>{{ animatedNumber }}</p>
  </div>
</template>

<script type="text/ecmascript-6">
  import TWEEN from 'tween.js'
  console.log(TWEEN)
  export default{
    name: 'todo',
    data() {
      return {
        number: 0,
        animatedNumber: 0
      }
    },
    props: {},
    mixins: [],
    computed: {},
    components: {},
    watch: {
      number: function (newValue, oldValue) {
        var vm = this

        function animate(time) {
          requestAnimationFrame(animate)
          TWEEN.update(time)
        }

        new TWEEN.Tween({tweeningNumber: oldValue})
          .easing(TWEEN.Easing.Quadratic.Out)
          .to({tweeningNumber: newValue}, 500)
          .onUpdate(function () {
            vm.animatedNumber = this.tweeningNumber.toFixed(0)
          })
          .start()
        animate()
      }
    },
    methods: {},
    beforeMount() {
    },
    mounted() {

    },
    beforeDestroy() {
    },
    destroyed() {
    }
  }
</script>
