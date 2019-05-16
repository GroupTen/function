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
          <ASpotSingle :blok="slide" />
        </slide>
        <slidr-navigation v-if="blok.slides.length > 1" slot="slidr-addons" />
      </slidr>
    </div>
    <div 
      v-else-if="blok.slides && blok.slides.length == 1"
      :class="BEM_E('single-slide')">
      <ASpotSingle :blok="blok.slides[0]" />
    </div>
    <div class="container">
      <div class="row">
        <div :class="BEM_E('text')" v-if="blok.title || blok.caption">
          <h5 v-if="blok.subtitle" :class="BEM_E('subtitle')">
            <FancyText :blok="blok.subtitle" />
          </h5>
          <h1 v-if="blok.title && blok.title.length > 0" :class="BEM_E('title')">
            <FancyText :blok="blok.title" />
          </h1>
          <p v-if="blok.caption && blok.caption.length > 0" :class="BEM_E('caption')">
            <FancyText :blok="blok.caption" />
          </p>
          <div :class="BEM_E('links')" v-if="blok.button && blok.button.length > 0">
            <Btn 
              :class="BEM_E('link')" 
              v-for="(item, index) in blok.button" :blok="item" v-bind:key="index" />
          </div>
        </div>
        <div :class="BEM_E('contents')">
          <div :class="BEM_E('image')" v-if="blok.image">
            <img
              :class="BEM_E('contents-image')"
              :src="blok.image" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseComponent from '~/src/components/Templates/BaseComponent'
import ASpotSingle from './single'
import { Slidr, Slide, Navigation as SlidrNavigation } from '~/src/components/Modules/Slider/src'

export default {
  extends: BaseComponent,
  props: {
    name: {
      type: String,
      default: 'ASpot'
    }
  },
  components: {
    ASpotSingle,
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
