<template lang="pug">
.layout
  alert
  header
    color
      .link-wrap(@click="onBackClick")
        .link(:class="{ 'home': $route.name === 'home' }") {{ ($route.name === 'home' ? 'Storyboarder Prototype' : `/${$route.name}`) }}
        icon(v-if="$route.name !== 'home'")
  .content-wrapper
    transition(name="fade" mode="out-in")
      .content(:key="$route.name")
        router-view.page
  a.copyright(href="https://ildar.dev/" target="_blank") ©ildar.dev
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

import Color from '@/components/Color.vue';
import Alert from '@/components/Alert.vue';

import icon from 'vue-material-design-icons/ArrowLeft.vue';

@Component({
  components: {
    Color,
    Alert,
    icon,
  }
})
export default class Layout extends Vue {
  onBackClick() {
    this.$router.push({ name: 'home' });
  }
}
</script>

<style lang="stylus">
.fade-enter-active
.fade-leave-active
  transition opacity .2s

.fade-enter
.fade-leave-to
  opacity 0

html
body
  max-height 100vh

.layout
  min-height 100vh
  max-height 100vh
  .copyright
    position fixed
    right 0
    bottom 0
    padding 4px
    font-size 10px
    font-family "Courier New"
    text-align right
    width max-content
    color #000
    transition color .3s ease
    text-decoration none
    user-select none
    &:hover
      color #fff
  header
    position fixed
    width 100vw
    z-index 10
    top 0
    left 0
    &:hover
      .color
        .text
          letter-spacing 1px
        .link:not(.home)
          opacity 0
        svg
          opacity 1    
    cursor pointer
    .color
      display flex
      align-items center
      text-align left
      font-family "Courier New"
      font-weight 500
      font-size 40px
      line-height 40px
      padding 8px
      align-content center
      vertical-align middle
      height 40px
      svg
        opacity 0
        fill inherit
        display block
        width 40px
        height 100%
        padding 0 48px
        path
          fill inherit
        &:hover
          background-color rgba(128,128,128,0.5)
          filter invert(100%)  
        @media screen and (max-width: 640px) 
          width 30px
          padding 0 24px
      .text
        display flex
        align-items center
        width 100%
        justify-content center
        .wrap
          min-width 25px
          &:first-child
            min-width calc(50% - 13px)
            text-align right
          &:last-child
            min-width calc(50% - 13px)   
      .link
      svg
        transition all .5s
        position absolute
        top 50%
        left 0
        transform translateY(-50%)

      @media screen and (max-width: 640px)
        line-height 40px !important
        font-size 40px !important
        flex-direction column
        align-items center
        justify-content center
        height 60px
        .link
          opacity 0
        svg
          opacity 1
</style>
