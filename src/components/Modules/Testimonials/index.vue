<template>
  <div
    :class="blok.image ? BEM_B + ' has-content-image' : BEM_B">
    <div 
      v-if="blok.slides && blok.slides.length > 1"
      :class="BEM_E('slider')">
      <slidr
        :autoPlay="true"
        :playSpeed="8000"
        :infiniteScroll="true">
        <slide v-for="(slide, index) in blok.slides" v-bind:key="index">
          <TestimonialSingle :blok="slide" />
        </slide>
        <slidr-navigation v-if="blok.slides.length > 1" slot="slidr-addons" />
      </slidr>
    </div>
    <div 
      v-else-if="blok.slides && blok.slides.length == 1"
      :class="BEM_E('single-slide')">
      <TestimonialSingle :blok="blok.slides[0]" />
    </div>
  </div>
</template>

<script>
import BaseComponent from '~/src/components/Templates/BaseComponent'
import TestimonialSingle from './single'
import { Slidr, Slide, Navigation as SlidrNavigation } from '~/src/components/Modules/Slider/src'

export default {
  extends: BaseComponent,
  props: {
    name: {
      type: String,
      default: 'Testimonials'
    }
  },
  components: {
    TestimonialSingle,
    Slidr,
    Slide,
    SlidrNavigation
  },
  data () {
    return {
      satScrollVal: 100
    }
  },
  methods: {
    saturateScroll (evt, el) {
      let val = 1 - (window.scrollY / 200)
      this.satScrollVal = val > 0 ? val : 0
    }
  },
  computed: {
    bgMediaType () {
      if (this.blok.bgImage) {
        // return file extension by splitting name at '.' and 'pop'ping the last index
        return this.blok.bgImage.split('.').pop()
      }
    }
  }
}
</script>
