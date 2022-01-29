<template lang="pug">
.color(:style="style" @mouseover="handler(15)" @click="handler(25)")
    slot
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Color extends Vue {
  colors = [1, 1, 1];

  get style() {
    const background = this.toHex(this.normalize(this.colors));
    const color = this.toHex(this.normalize(this.colors).map(c => 256 -c));
    this.$nextTick(() => {
      const root = document.documentElement.style;
      root.setProperty('--background', background);
      root.setProperty('--color', color);
    })
    return {
        background,
        color,
        fill: color,
    };
  }

  interval = 0;

  magicNumber = 2;

  parseHex(hex: string): number[] {
    const r = hex.slice(1,3);
    const g = hex.slice(3,5);
    const b = hex.slice(5,7);
    return [r, g, b].map(c => parseInt(c,16))
  }

  normalize(colors: number[]): number[] {
      return this.colors.map(c => Math.abs(c - 256));
  }

  toHex(colors: number[]) {
    return `#${colors.map(c => {
      let result = c.toString(16);
      if (result.length === 1) {
        result =`0${result}`;
      }
      return result
    }).join('')}`;
  }

  updateColor(k: number): void {
    const index = Math.floor(Math.random() * 3);
    this.colors.splice(index, 1, Math.ceil(this.colors[index] + Math.random() * this.magicNumber * (k || 1)) % 512);
  }

  handler(k: number): void {
    this.updateColor(k);
  }

  mounted() {
    this.interval = setInterval(this.handler, 40);
  }

  beforeDestroy() {
    clearInterval(this.interval);
  }
}
</script>

<style lang="stylus">
.color
  transition all .04s linear
  user-select none
  will-change background-color
</style>
