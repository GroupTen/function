<template>
  <div 
    class="slidr-navigation"
    :class="{
      'is-vertical': $slidr.config.vertical,
      'is-rtl': $slidr.config.rtl,
    }"
  >
    <button
      type="button"
      class="slidr-prev"
      :class="{ 'is-disabled': isPrevDisabled }"
      @click="slidePrev"
    >
      <slot name="slidr-prev">
        <icons :name="isVertical ? 'arrowUp' : isRTL ? 'arrowRight' : 'arrowLeft'"/>
      </slot>
    </button>
    <button
      type="button"
      class="slidr-next"
      :class="{ 'is-disabled': isNextDisabled  }"
      @click="slideNext"
    >
      <slot name="slidr-next">
        <icons :name="isVertical ? 'arrowDown' : isRTL ? 'arrowLeft' : 'arrowRight'"/>
      </slot>
    </button>
  </div>
</template>

<script>
import Icons from './Icons';

export default {
  inject: ['$slidr'],
  name: 'SlidrNavigation',
  components: {
    Icons
  },
  computed: {
    isPrevDisabled () {
      if (this.$slidr.config.infiniteScroll) {
        return false;
      }
      return this.$slidr.currentSlide === 0;
    },
    isNextDisabled () {
      if (this.$slidr.config.infiniteScroll) {
        return false;
      }
      return this.$slidr.currentSlide === this.$slidr.slidesCount - 1;
    },
    isRTL () {
      return this.$slidr.config.rtl;
    },
    isVertical () {
      return this.$slidr.config.vertical;
    }
  },
  methods: {
    slideNext () {
      this.$slidr.slideNext();
      this.$slidr.restartTimer();
    },
    slidePrev () {
      this.$slidr.slidePrev();
      this.$slidr.restartTimer();
    }
  }
}
</script>