<template lang="pug">
.alert(:class="{'hidden': isHidden}")
  .text {{ data }}
</template>

<script>
    /**
     * Represents a message alert box
     * @vue-data {Boolean} isHidden - flag for visibility
     * @vue-data {String} data - text from alert event
     * @vue-data {Integer} timeout - timeout id for animation
     * @vue-event {Void} change - handler for alert event
     */
    export default {
        name: 'Alert',
        data: () => ({
          isHidden: true,
          data: '',
          timeout: null
        }),
        methods: {
            change(data) {
                this.data = data
                this.isHidden = false
                clearTimeout(this.timeout) // needed if the alarm is faster than 2600ms
                this.timeout = setTimeout(() => {
                    this.isHidden = true
                }, 3400)
            }
        },
        created() {
            this.$eventHub.$on('alert', this.change)
        },
    }
</script>

<style lang="stylus" scoped>
.alert
  z-index 100
  position fixed
  bottom 13px
  right 13px
  border 0.5px solid var(--color)
  color var(--color)
  background var(--background)
  padding 8px
  transition opacity .5s ease-out
  &.hidden
    opacity 0
</style>