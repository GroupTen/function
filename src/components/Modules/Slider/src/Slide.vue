<template>
  <li
    class="slidr-slide"
    :class="{
      'is-clone': isClone, 
      'is-active': isActive,
      'is-prev': isPrev,
      'is-next': isNext,
      'is-current': isCurrent
    }"
    :aria-hidden="isActive"
    :style="style"
  >
    <slot></slot>
  </li>
</template>

<script>
  export default {
    name: 'SlidrSlide',
    inject: ['$slidr'],
    props: {
      isClone: {
        type: Boolean,
        default: false
      },
      index: {
        type: Number,
        default: 0
      }
    },
    computed: {
      style() {
        const { config, slideHeight, slideWidth } = this.$slidr || {}

        if (config.vertical) {
          return `height: ${slideHeight}px`
        }
        return `width: ${slideWidth}px`
      },
      lower() {
        const { config, currentSlide, slidesCount } = this.$slidr || {}
        const siblings = config.itemsToShow
        return config.centerMode
          ? Math.ceil(currentSlide - siblings / 2)
          : currentSlide
      },
      upper() {
        const { config, currentSlide, slidesCount } = this.$slidr || {}
        const siblings = config.itemsToShow

        return config.centerMode
          ? Math.floor(currentSlide + siblings / 2)
          : Math.floor(currentSlide + siblings - 1)
      },
      isActive() {
        return this.index >= this.lower  && this.index <= this.upper
      },
      isPrev() {
        return this.index <= this.lower - 1
      },
      isNext() {
        return this.index >= this.upper + 1
      },
      isCurrent() {
        return this.index === this.$slidr.currentSlide
      }
    },
  }
</script>
