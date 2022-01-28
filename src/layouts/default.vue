<template lang="pug">
.layout
    header
      color
        .text(@click="onNameClick")
          .wrap
            transition(name="name" mode="out-in")
              .ildar(:key="ildars[ildarIndex]") {{ildars[ildarIndex]}}
          .wrap
            transition(name="name" mode="out-in")
              .dot(:key="dots[dotIndex]") {{dots[dotIndex]}}
          .wrap
            transition(name="name" mode="out-in")
              .dev(:key="devs[devIndex]") {{devs[devIndex]}}
        .link-wrap(@click="onBackClick")
          .link {{ ($route.name === 'home' ? '' : `/${$route.name}`) }}
          svg(v-if="$route.name !== 'home'" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd")
            path( d="M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z")
        .wrap
          transition(name="name" mode="out-in")
            .change-language(@click="changeLanguage" :key="$t('changeLanguage.desktop')")
              span.desktop {{ $t('changeLanguage.desktop') }}
              span.mobile {{ $t('changeLanguage.mobile') }}
    .content-wrapper
      transition(name="fade" mode="out-in")
        .content(:key="$route.name")
          router-view.page
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

import Color from '@/components/Color.vue';

const ildars = ['ildar', 'Ildar', 'Ильдар', 'Илдар', 'ильдар', 'илдар', 'илдәр', 'Илдәр', 'ildәр', 'ildәr'];
const devs = ['dev', 'Dev', 'Dav', 'dav', 'Dәv', 'dәv', 'дав', 'Дав', 'Дев','дев', 'Дәв', 'дәв', 'div'];
const dots = ['.', ' ', ':', '-', '/', '', '@', '\\', '~', '*', '#', '_', ',', '^', '|'];

@Component({
  components: {
    Color,
  }
})
export default class Layout extends Vue {
  ildars = ildars;
  devs = devs;
  dots = dots;
  ildarIndex = 0;
  devIndex = 0;
  dotIndex = 0;
  intervalId = null
  changeIndexes() {
    switch (Math.ceil(Math.random() * 3)) {
      case 1:
        this.ildarIndex = Math.floor(Math.random() * this.ildars.length);
        break;
      case 2:
        this.devIndex = Math.floor(Math.random() * this.devs.length);
        break;
      case 3:
        this.dotIndex = Math.floor(Math.random() * this.dots.length);
        break;
    }
  }

  onNameClick() {
    this.changeIndexes();
  }

  created() {
    this.intervalId = setInterval(() => { this.changeIndexes() }, 5000);
  }

  beforeDestroy() {
    clearInterval(this.intervalId);
  }

  changeLanguage() {
    this.$store.dispatch('changeLanguage', this.$store.state.language === 'en' ? 'ru' : 'en');
  }

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

.name-enter-active
.name-leave-active
  transition all .1s ease-in
  position relative
  opacity 1
  top 0

.name-enter-active
  transition all .1s ease-out

.name-enter
  top -10px
  opacity 0
.name-leave-to
  top 10px
  opacity 0

.wrap
  transition letter-spacing .3s
  max-height 40px
  overflow hidden
  @media screen and (max-width: 640px) 
    .ildar
    .dev
      font-size 0
    .ildar:first-letter
    .dev:first-letter
      font-size 40px

.change-language
  position absolute
  right 0
  top 50%
  transform translateY(-50%)
  font-size 31px
  line-height 26px
  width min-content
  text-align right
  .mobile
    display none
  @media screen and (max-width: 640px)
    font-size 25px
    .desktop
      display none
    .mobile
      display block


html
body
  max-height 100vh

.layout
  min-height 100vh
  max-height 100vh
  header
    position fixed
    width 100vw
    z-index 1000
    top 0
    left 0
    &:hover
      .color
        .text
          letter-spacing 1px
        .link
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
