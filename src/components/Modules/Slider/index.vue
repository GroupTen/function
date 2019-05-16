<template>
  <div :class="BEM_B"
    v-bind:style="{ 
      backgroundImage: blok.bgImage ? 'url(' + prepImg(blok.bgImage, '1200x600/smart') + ')' : 'none',
      backgroundSize: blok.bgImage ? 'cover' : 'initial' }">
    <div class="container">
      <div class="row flex-column">
        <div :class="BEM_E('title')">
          <TitleBlock :blok="blok" />
        </div>
      </div>
    </div>
    <div v-if="blok.slides" 
      :class="BEM_E('slides')">
      <slidr
        :infiniteScroll="true"
        :autoPlay="blok.autoPlay"
        :playSpeed="blok.playSpeed * 1000">
        <slide v-for="(slide, index) in blok.slides" v-bind:key="index">
          <div :class="BEM_E('slide-content')">
            <template v-if="slide.component == 'RichText'">
              <RichText :blok="slide" />                    
            </template>
            <!-- this \/ will go away  -->
            <template v-if="slide.richContent && slide.richContent.length > 0">
              <RichText :blok="slide.richContent[0]" />                    
            </template>
          </div>
        </slide>

        <slidr-navigation slot="slidr-addons" v-if="blok.showArrows"></slidr-navigation>
        <slidr-pagination slot="slidr-addons" v-if="blok.showPagination"></slidr-pagination>
      </slidr>
    </div>
    <div v-if="blok.button && blok.button[0]" :class="BEM_E('link')">
      <Btn :blok="blok.button[0]" />
    </div>
  </div>
</template>

<script>
import BaseComponent from '~/src/components/Templates/BaseComponent'
import RichText from '~/src/components/Modules/RichText'
import { 
  Slidr, 
  Slide, 
  Navigation as SlidrNavigation,
  Pagination as SlidrPagination  } from './src'

export default {
  extends: BaseComponent,
  props: {
    name: {
      type: String,
      default: 'Slider'
    },
    title: String,
    caption: String,
    items: [Object, Array]
  },
  components: {
    RichText,
    Slidr,
    Slide,
    SlidrNavigation,
    SlidrPagination
  },
  methods: {
    onSlideStart () {

    },
    onSlideEnd () {

    }
  }
}
</script>
