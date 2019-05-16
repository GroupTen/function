<template>
  <div :class="BEM_B">
    <div class="container">
      <div class="row">
        <div v-if="blok.image" :class="BEM_E('image')">
          <img :src="blok.image" :alt="blok.image">
        </div>
        <TitleBlock :blok="blok" />
        <div v-if="blok.contentLeft || blok.contentRight" :class="BEM_E('items')">
          <div v-if="blok.contentLeft" :class="BEM_E('item-left')">
            <div v-html="markdown(blok.contentLeft)" />
          </div>
          <div v-if="blok.contentRight" :class="BEM_E('item-right')">
            <div v-html="markdown(blok.contentRight)" />
          </div>
        </div>
        <div v-if="blok.button && blok.button[0]" :class="BEM_E('link')">
          <Btn :blok="blok.button[0]" />
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
      default: 'Checklist'
    },
    blok: Object
  }
}
</script>