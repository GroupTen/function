<template>
  <div :class="BEM_B" v-bind:style="{ 
      backgroundImage: blok.bgImage ? 'url(' + prepImg(blok.bgImage, '1200x600/smart') + ')' : 'none',
      backgroundSize: blok.bgImage ? 'cover' : 'initial' }">
    <div class="container">
      <div class="row">
        <div :class="BEM_E('contents')">
          <div :class="BEM_E('image')" v-if="blok.image && blok.image[0]">
            <video 
              v-if="mediaType === 'mp4' || mediaType === 'webm'"
              :poster="blok.image[0] && blok.image[0].poster ? blok.image[0].poster : ''"
              autoplay 
              muted 
              loop>
              <source :src="blok.image[0].imageLocation" type="video/mp4">
            </video>
            <Img v-else :blok="blok.image[0]" />
          </div>
          <div :class="BEM_E('content')">
            <TitleBlock :blok="blok" />
            <div v-if="blok && blok.content" v-html="markdown(blok.content)" />
            <div v-if="blok && blok.button.length > 0" :class="BEM_E('link')">
              <Btn v-for="(btn, index) in blok.button" v-bind:key="index" :blok="blok.button[index]" />
            </div>
          </div>
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
      default: 'RichText'
    }
  },
  computed: {
    mediaType () {
      if (this.blok && this.blok.image[0]) {
        return this.getFileExt(this.blok.image[0].imageLocation)
      }
    }
  }
}
</script>

