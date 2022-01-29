<template lang="pug">
.plain-text
  textarea {{ payload }}
</template>
<script>
export default {
  props: {
    payload: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
<style lang="stylus" scoped>
.plain-text
  textarea
    background transparent
    width 100%
    max-width 100%
    min-width 100%
    border 1.5px #fafafa dashed
    box-sizing border-box
    font-family "Courier New"
    font-weight 400
    font-size 16px
    padding 16px
    color #fff
    min-height 80vh
    transition all .5s ease
    margin 0
</style>