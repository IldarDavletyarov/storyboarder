<template lang="pug">
.chart
  flow-chart(:nodes="nodes" :connections="connections" width="100%" height="80vh")
</template>
<script>
import FlowChart from 'flowchart-vue';

export default {
  components: {
    FlowChart,
  },
  props: {
    payload: {
      type: Object,
    },
  },
  computed: {
    nodes() {
      return this.payload.data.split('\n').map((word, index) => ({
        id: index,
        x: 200,
        y: 200 + (index * 150),
        name: word,
        type: word,
        description: word,
      }));
    },
    connections() {
      const array = this.payload.data.split('\n');
      return array.slice(0, array.length - 1).map((_word, index) => ({
        source: { id: index, position: 'bottom' },
        destination: { id: index + 1, position: 'top' },
        id: index,
        type: 'pass',
      }));
    },
  }
}
</script>
<style lang="stylus">
.chart
  margin auto
  #chart
    border 1.5px #fafafa dashed
    box-sizing border-box
    svg#svg
      background unset !important
      g.connection 
        path[stroke-width=1]
          stroke #fff
</style>