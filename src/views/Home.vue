<template lang="pug">
.home-page
  h1 Hello. It's prototype of storyboarder
  .links
    router-link.link(:to="{ name: 'stories' }") Your stories
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
  .links a.link
    display block
    text-align center
    font-family "Courier New"
    font-weight 400
    max-width 500px
    margin 20px auto
    color #fff
  .links a.link
    font-size 22px
    text-decoration none
    &:hover
      text-decoration underline
  .import
    margin 0 auto
</style>
