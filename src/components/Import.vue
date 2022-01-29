<template lang="pug">
.import
  .import-file(@drop.prevent="dropLoad" @dragover.prevent :class="{ 'text-focus': isTextAreaFocus }")
    label.reader
      p
        | Drop your .story file to this zone
        icon(:size="48")
      input(type="file" @change="clickLoad")
  .text-area
    textarea(:value="text" @input="updateText" placeholder="Or write your story" tabindex="0" @focus="isTextAreaFocus = true" @blur="isTextAreaFocus = false")
    .load-button(:class="{ 'show': text.length }" v-show="text.length" @click="uploadText")
      iconText
      span Upload text
</template>

<script>
import icon from 'vue-material-design-icons/ArrowBottomRight.vue';
import iconText from 'vue-material-design-icons/SubdirectoryArrowRight.vue';

import { v4 as uuidv4 } from 'uuid';

/**
 * Represents a drop-zone for export
 * @vue-event {Void} clearInput - clear input.files and input.value for reuse
 * @vue-event {Void} clickLoad - emit load function and clear input
 * @vue-event {Void} dropLoad - emit load function and clear input
 * @vue-event {Void} load - try load file and update state
 */
export default {
    name: 'Import',
    components: { icon, iconText },
    data: () => {
      return { 
        isTextAreaFocus: false,
      };
    },
    computed: {
      text() {
        return this.$store.state.plainText;
      },
    },
    methods: {
      updateText(e) {
        this.$store.dispatch('updatePlainText', e.target.value);
      },
      goToEditor(id) {
        this.$router.push({ name: 'editor', params: { id }, });
      },
      uploadText() {
        const id = uuidv4();
        this.$store.dispatch('load', {
          data: this.text,
          name: this.text.split('\n')[0],
          id,
        })
        this.$store.dispatch('updatePlainText', '');
        this.$eventHub.$emit('alert', 'text uploaded successfully');
        this.goToEditor(id);
      },
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
        const id = uuidv4();
        let message = '.story file uploaded successfully'
        const reader = new FileReader()
        reader.onload = e => {
          let parsed;
          try {
            parsed = e.target.result;
            this.$store.dispatch('load', {
              data: parsed,
              name: file.name.split('.').slice(0, -1).join('.'), // without extension
              id,
            });
            this.goToEditor(id);
          } catch (e) {
            message = 'failed upload attempt'
          }
          this.$eventHub.$emit('alert', message)
        }
        try {
          reader.readAsText(file)
        } catch (e) {
          message = 'failed upload attempt'
        }
      }
    }
}
</script>

<style lang="stylus" scoped>
.import
  max-width 500px
  .import-file
    border 1.5px #fff dashed
    opacity 0.7
    cursor pointer
    transition all .5s ease
    minwidth 100%
    box-sizing border-box
    &.text-focus
      .reader
        padding 15px 10px
    &:hover
      opacity 1
    .reader 
      position relative
      overflow hidden
      display inline-block
      cursor pointer
      margin auto
      width calc(100% - 20px)
      padding 66px 10px
      transition all .5s ease
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
  .text-area
    .load-button
      opacity 0
      transition all .5s ease
      display flex
      align-items center
      margin-left auto
      top -7px
      width max-content
      position relative
      cursor pointer
      color #fff
      padding 2px 0 2px 8px
      span
        display block
        height max-content
      &.show
        opacity 0.7
        &:hover
          opacity 1
    textarea
      margin-top 24px
      background transparent
      width 100%
      max-width 100%
      min-width 100%
      border 1.5px #fff dashed
      box-sizing border-box
      font-family "Courier New"
      font-weight 400
      font-size 16px
      padding 16px
      color #fff
      opacity 0.7
      min-height 200px
      transition all .5s ease
      &:hover
        opacity 1
      &::placeholder
        opacity 0.5
      &:focus
        box-shadow none
        min-height 330px

</style>