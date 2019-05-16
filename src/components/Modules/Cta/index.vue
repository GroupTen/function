<template>
  <div :class="BEM_B" v-bind:style="{ 
      backgroundImage: blok.image ? 'url(' + prepImg(blok.image, '1200x600/smart') + ')' : 'none',
      backgroundSize: blok.image ? 'cover' : 'initial' }">
    <div class="container">
      <div class="row">
        <div :class="BEM_E('contents')">
          <TitleBlock :blok="blok" />
        </div>
        <div :class="BEM_E('action')" v-if="blok.button && blok.button[0]">
          <Btn v-if="blok.button && blok.button[0]" :class="BEM_E('link')" :blok="blok.button[0]" />
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
      default: 'Cta'
    },
    blok: Object
  }
}
</script>
