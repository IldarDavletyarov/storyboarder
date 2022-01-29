<template lang="pug">
.home-page
  h1 Hello. It's prototype of storyboarder v0.0.1
  import
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Import from '@/components/Import.vue';

@Component({
  components: {
    Import,
  },
})
export default class Home extends Vue {
}
</script>
<style lang="stylus">
.home-page
  flex-grow 1
  padding 60px 0
  h1
    text-align center
    font-family "Courier New"
    font-weight 400
  .import
    margin 0 auto
</style>
