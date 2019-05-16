<template>
  <simple-svg
    :filepath="SVGFilepath"
    :fill="SVGFill"
    :width="SVGWidth"
    :height="SVGHeight"
    :id="SVGId"
    :class="SVGClass"
    v-bind:css="SVGCSS"
    />
</template>

<script>
import {SimpleSVG} from '@/plugins/svg.js'
const path = require('path')

export default {
  components: {
    'simple-svg': SimpleSVG
  },
  props: {
    name: {
      required: true,
      default: 'v2'
    },
    fill: {
      type: String,
      default: 'currentColor'
    },
    activeFill: {
      type: String,
      default: 'currentColor'
    },
    width: [String, Number],
    height: [String, Number],
    id: String,
    className: String,
    css: Object
  },
  data () {
    return {
      SVGFill: this.fill,
      SVGFilepath: path.resolve(`./svg/${this.name}.svg`),
      SVGWidth: this.width,
      SVGHeight: this.height,
      SVGId: this.id,
      SVGClass: this.className,
      SVGCSS: this.css
    }
  }
}
</script>
