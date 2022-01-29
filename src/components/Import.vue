<template lang="pug">
.import(@drop.prevent="dropLoad" @dragover.prevent)
  label.reader
    p
      icon(:size="48")
      | Drop your .story file to this zone
    input(type="file" @change="clickLoad")
</template>

<script>
import icon from 'vue-material-design-icons/FileImportOutline.vue';

/**
 * Represents a drop-zone for export
 * @vue-event {Void} clearInput - clear input.files and input.value for reuse
 * @vue-event {Void} clickLoad - emit load function and clear input
 * @vue-event {Void} dropLoad - emit load function and clear input
 * @vue-event {Void} load - try load file and update state
 */
export default {
    name: 'Import',
    components: { icon },
    methods: {
        clearInput(input) { // need for reuse component
            input.files = null
            input.value = null
        },
        clickLoad(e) {
            this.load(e.target.files[0])
            this.clearInput(e.target)
        },
        dropLoad(e) {
            this.load(e.dataTransfer.files[0])
            this.clearInput(e.target)
        },
        load(file) {
            let message = '.story file loaded successfully'
            const reader = new FileReader()
            reader.onload = e => {
              let parsed;
              try {
                parsed = JSON.parse(e.target.result);
                this.$store.dispatch('import', {
                  data: parsed,
                  name: file.name.split('.').slice(0, -1).join('.') // without extension
                })
              } catch (e) {
                message = 'failed load attempt'
              }
              this.$eventHub.$emit('alert', message)
            }
            try {
              reader.readAsText(file)
            } catch (e) {
              message = 'failed load attempt'
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
.import
  border 1px #fff dashed
  max-width 500px
  min-height 200px
  cursor pointer
  .reader 
    position relative
    overflow hidden
    display inline-block
    cursor pointer
    margin auto
    width calc(100% - 20px)
    padding 66px 10px
    p
      opacity 0.3
      text-align center
      font-family "Courier New"
      font-weight 400
      span
        display block
        margin 10px auto
    input
      position absolute
      top 0
      left 0
      z-index -1
      opacity 0
</style>