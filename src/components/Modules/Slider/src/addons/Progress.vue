<template>
  <div class="slidr-progress">
    <div
      class="slidr-progress-inner"
      :style="`width: ${progress}%`"
    >
    </div>
  </div>
</template>

<script>
import { normalizeSlideIndex } from '../utils'

export default {
  inject: ['$slidr'],
  name: 'SlidrProgress',
  computed: {
    currentSlide() {
      return normalizeSlideIndex(
        this.$slidr.currentSlide,
        this.$slidr.slidesCount
      )
    },
    progress() {
      return this.currentSlide * 100 / (this.$slidr.slidesCount - 1)
    }
  }
}
</script>
