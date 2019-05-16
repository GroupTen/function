<template>
  <div :class="BEM_B + ' container'">
    <div class="row">
      <div :class="BEM_E('content') + ' col-lg-5 offset-lg-1'">
        <Vector name="icon/quote" width="45" height="39" fill="#515150" />
        <blockquote>
          {{blok.quote}}
        </blockquote>
        <cite v-if="blok.cite">— {{blok.cite}}</cite>
        <div v-if="blok.button && blok.button[0]" :class="BEM_E('link')">
          <Btn :blok="blok.button[0]" />
        </div>
      </div>
      <div v-if="blok.image" :class="BEM_E('image') + ' col-lg-4'">
        <img :src="blok.image" alt="">
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
      default: 'Quote'
    },
    blok: Object
  }
}
</script>
