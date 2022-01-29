<template lang="pug">
.editor-page
  .titles
    .title(v-for="editor in editors" :key="editor.title" :class="{ selected: currentTab === editor.title}" @click="$store.dispatch('updateCurrentTab', editor.title)") {{ editor.title }}
  .editor-component
    keep-alive
      component(:is="currentComponent" :payload="payload") 
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Chart from '@/components/Chart.vue';
import PlainText from '@/components/PlainText.vue';
import Frames from '@/components/Frames.vue';

@Component({
  props: {
    id: {
      type: String,
      default: null,
    }
  },
  data: () => ({
    editors: [
      {
        title: 'Flow chart',
        component: Chart,
      },
      {
        title: 'Plain text',
        component: PlainText,
      },
      {
        title: 'Frames',
        component: Frames,
      }
    ],
  }),
  computed: {
    currentTab() {
      return this.$store.state.currentTab;
    },
    payload() {
      return this.$store.state.stories.find(_ => _.id === this.id);
    },
    currentComponent() {
      return this.editors.find(_ => _.title === this.currentTab).component;
    }
  },
})
export default class Home extends Vue {
}
</script>
<style lang="stylus">
.editor-page
  flex-grow 1
  padding 60px 0 0
  margin 10px
  .titles
    display flex
    align-items center
    width max-content
    .title
      text-align center
      padding 8px
      font-family "Courier New"
      font-weight 400
      cursor pointer
      &.selected
        font-weight 600
</style>
