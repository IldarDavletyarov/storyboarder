<template lang="pug">
#app
  layout
</template>
<script>
import { Component, Vue } from 'vue-property-decorator';

import Layout from './layouts/default.vue';

@Component({
  components: {
    Layout
  },
  watch: {
    '$store.state.language': {
      handler(val) {
        this.$i18n.locale = val;
      }
    },
  },
})
export default class App extends Vue {

}
</script>
<style lang="stylus">
body
  background #000
  color #fff
  margin 0
  padding 0
  min-height 100vh 
#app
  font-family Avenir, Helvetica, Arial, sans-serif
</style>
