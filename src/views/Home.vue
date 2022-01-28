<template lang="pug">
.home-page
  .hello-frame
    transition(name="hello")
      .hello(@click="onClickHello" @mouseover="clearInterval" @mouseout="setInterval" :key="hellos[helloIndex]") {{ hellos[helloIndex] }}
  .links
    router-link.link(v-for="link in links" :key="link.title" :to="{ name: link.to }") {{ link.title }}

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

const timeoutChangeHello = 5000;
const hellos = [ "Hello", "Goeie dag", "Tungjatjeta", "Ahlan bik", "Kaixo", "Vitaju", "Nomoskar", "Selam", "Demat", "Zdravej", "Mingala ba", "Hola", "Nín hao", "Zdravo", "Nazdar", "Hallo", "Hallo", "Tere", "Helo", "Moi", "Hei", "Bonjour", "Goeie", "Guten Tag", "Geia!", "Shalóm", "Namasté", "Szia", "Halló", "Hai", "Kiana", "Dia duit", "Buongiorno", "Kónnichi wa", "Annyeonghaseyo", "Sabai dii", "Ave", "Es mīlu tevi", "Moïen", "Selamat petang", "Sain baina uu", "Namaste", "Dumêlang", "Hallo", "Salâm", "Cześć", "Olá", "Salut", "Privét", "Talofa", "ćao", "Dumela", "Nazdar", "Zdravo", "Hola", "Jambo", "Hej", "Halo", "Ia ora na", "Sàwàtdee kráp", "Mālō e lelei", "Merhaba", "Pryvít", "Adaab arz hai", "Chào", "S’mae", "A gutn tog" ]
@Component({})
export default class Home extends Vue {

  hellos = hellos;

  interval = 0;

  helloIndex = 0;

  get links() {
    return [
      {
        title: this.$t('links.cv'),
        to: 'cv',
      },
      {
        title: this.$t('links.contacts'),
        to: 'contacts',
      },
    ];
  }

  onClickHello() {
    this.clearInterval();
    this.changeHello();
    this.setInterval();
  }

  changeHello() {
    this.helloIndex = Math.floor(Math.random() * this.hellos.length);
  }

  setInterval() {
    this.interval = setInterval(this.changeHello, timeoutChangeHello);
  }

  clearInterval() {
    clearInterval(this.interval);
  }

  mounted() {
    this.setInterval();
  }

  beforeDestroy() {
    this.clearInterval();
  }
}
</script>
<style lang="stylus">
.hello-enter-active
.hello-leave-active
  transition all .5s ease
  transform rotateX(0) translate3d(0, 0, -50px)
  position relative
  z-index 100


.hello-enter
  opacity 0
  transform rotateX(-90deg) translate3d(0, 0, -50px)
.hello-leave-to
  opacity 0
  transform rotateX(90deg) translate3d(0, 0, -50px) 


.home-page
  flex-grow 1
  padding 60px 0
  .hello-frame
    position relative
    height 150px
    margin 40px 0 0
    width 100vw
    perspective 400px
    perspective-origin 0 0 100px
    backface-visibility visible
    transform-style preserve-3d
    z-index 100
    @media screen and (max-width: 640px)
      margin 0 0 0 0
  .hello
    position absolute
    left 0
    transition all .5s
    text-align center
    user-select none
    font-family Helvetica
    font-size 150px
    font-weight 500
    cursor pointer
    transform-origin 50% 50% 50%
    padding 0 10px
    width calc(100% - 20px)
    &:hover
      background #fff
      color #101010
      letter-spacing 4px
    @media screen and (max-width: 640px)
      margin 24px 0 0 0
      font-size 70px
      max-width 100vw
      width calc(100% - 20px)
  .links
    display flex
    justify-content center
    user-select none
    width 385px
    margin 50px auto 0
    z-index 100
    .link
      font-size 55px
      line-height 40px
      padding 8px
      z-index 100
      color #fff
      transition all .5s
      &:not(:last-child)
        margin-right 60px
      &:hover
        background #fff
        color #101010
        letter-spacing 1px
    @media screen and (max-width: 640px)
      flex-flow column
      width 100vw
      margin 60px 0 0
      .link
        width calc(100% - 32px)
        padding 16px
        font-size 60px
        &:not(:first-child)
          margin-top 8px
</style>
