<template lang="pug">
.frames
  image-editor.edit(ref="editor" :includeUI="useDefaultUI" :options="options")
</template>
<script>
import { ImageEditor } from '@toast-ui/vue-image-editor';
import 'tui-color-picker/dist/tui-color-picker.css';
import 'tui-image-editor/dist/tui-image-editor.css';

export default {
  components: {
    ImageEditor,
  },
  data: () => ({
    useDefaultUI: false,
    options: {
      cssMaxWidth: '1000px',
      cssMaxHeight: '1000px',
      usageStatistics: false,
      includeUI: {
        loadImage: {
          path: '../../frame.jpg',
          name: "Sample",
        },
        menuBarPosition: "left",
      },
    },
  }),
}
</script>
<style lang="stylus">
.frames
  .edit
    border 1.5px #fafafa dashed
    height 80vh !important
    font-family "Courier New" !important
    font-weight 400
    .tui-image-editor-help-menu.right
      border-radius 0
    .tui-image-editor-header-buttons
      div
        background-color var(--background) !important
        color var(--color) !important
        border-color var(--color) !important
        border-radius 0
        border-width 2px
        font-family "Courier New" !important
        font-weight 600
        font-size 20px
        height 28px
        line-height 28px
      .tui-image-editor-download-btn
        background-color var(--color) !important
        color var(--background) !important
        border-color var(--background) !important
        border-radius 0
        border-width 2px
        font-family "Courier New" !important
        font-weight 600
        font-size 20px
        height 28px
        line-height 28px
    .tui-image-editor-header-logo
      display none
</style>