<template lang="pug">
.stories-page
  .stories-list
    .story(v-for="story in stories" :key="story.id" @click="$router.push({ name: 'editor', params: { id: story.id }})")
      icon(:size="44")
      p {{ story.name }}
</template>
<script>
import icon from 'vue-material-design-icons/File.vue';

export default {
  components: {
    icon,
  },
  computed: {
    stories() {
      return this.$store.state.stories;
    },
  },
};
</script>
<style lang="stylus" scoped>
.stories-page
  flex-grow 1
  padding 60px 0
  .stories-list
    padding 24px
    display flex
    .story
      cursor pointer
      width 120px
      height 120px
      transition all .3s ease
      padding 16px
      &:hover
        background #aaaaaa
      span
        margin 20px auto 0
        height 44px
        width 44px
        display block
        svg
          display block
      p
        margin 0
        padding 0
        margin-top 8px
        font-family "Courier New"
        font-weight 400
        text-align center
        width 100%
        display -webkit-box
        -webkit-box-orient vertical
        -webkit-line-clamp 2;
        line-height 1.5em
        height 3em
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
</style>