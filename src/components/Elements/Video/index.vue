<template>
  <div :class="BEM_B">
    <iframe v-if="(blok && blok.videoUrl) || src"
      :src="blok.videoUrl || src"
      width="640" 
      height="360" 
      frameborder="0"
      webkitallowfullscreen
      mozallowfullscreen
      allowfullscreen />
  </div>
</template>

<script>
import BaseComponent from '~/src/components/Templates/BaseComponent'

export default {
  extends: BaseComponent,
  props: {
    name: {
      type: String,
      default: 'EmbeddedVideo'
    },
    blok: Object,

    // otherwise
    src: String,
    width: Number,
    height: Number
  }
}
</script>
