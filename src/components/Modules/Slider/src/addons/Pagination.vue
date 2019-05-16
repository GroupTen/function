<template>
  <div 
    class="slidr-pagination"
    :class="{ 'is-vertical': $slidr.config.vertical }"
  >
    <ol class="slidr-indicators" v-if="mode === 'indicator'">
      <li v-for="(slide, index) in $slidr.slides" :key="index">
        <button
          @click="$slidr.slideTo(index)"
          class="slidr-indicator"
          :class="{ 'is-active': currentSlide === index }"
        >
          <span class="slidr-sr-only">item {{ index }}</span>
        </button>
      </li>
    </ol>
    <template  v-if="mode === 'fraction'">
      <span>{{ currentSlide + 1 }}</span>
      <span>/</span>
      <span>{{ $slidr.slidesCount }}</span>
    </template>
  </div>
</template>

<script>
import { normalizeSlideIndex } from '../utils'

export default {
  inject: ['$slidr'],
  name: 'SlidrPagination',
  props: {
    mode: {
      default: 'indicator',
      type: String
    }
  },
  computed: {
    currentSlide() {
      return normalizeSlideIndex(
        this.$slidr.currentSlide,
        this.$slidr.slidesCount
      )
    }
  }
}
</script>