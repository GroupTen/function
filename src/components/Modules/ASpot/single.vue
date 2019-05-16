<template>
  <div
    :class="BEM_B"
    v-bind:style="{ 
      backgroundImage: blok.bgImage && bgMediaType !== 'mp4' ? 'url(' + prepImg(blok.bgImage, '1400x700/smart') + ')' : 'none',
      backgroundSize: blok.bgImage ? 'cover' : 'initial' }">
    <div :class="BEM_E('slide-video')" v-if="bgMediaType === 'mp4'">
      <video autoplay muted loop id="myVideo">
        <source :src="blok.bgImage" type="video/mp4">
      </video>      
    </div>
    <div class="container">
      <div class="row">
        <div v-if="blok.smallCaption && blok.smallCaption.length > 0" :class="BEM_E('small-caption')">
          <FancyText :blok="blok.smallCaption[0]" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseComponent from '~/src/components/Templates/BaseComponent'

export default {
  extends: BaseComponent,
  props: {
    name: {
      type: String,
      default: 'ASpotSingle'
    }
  },
  computed: {
    bgMediaType () {
      if (this.blok.bgImage) {
        return this.getFileExt(this.blok.bgImage)
      }
    }
  }
}
</script>
