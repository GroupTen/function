<template>
  <div :class="BEM_B" v-bind:style="{ 
      backgroundImage: blok.image ? 'url(' + prepImg(blok.image, '1200x600/smart') + ')' : 'none',
      backgroundSize: blok.image ? 'cover' : 'initial' }">
    <div class="container">
      <div class="row">
        <div :class="BEM_E('cols')">
          <TitleBlock :blok="blok" />

          <ul :class="BEM_E('items')" v-if="blok.items">
            <li v-for="(item, index) in blok.items" :class="BEM_E('item')" v-bind:key="index">
              <div v-if="item.image" :class="BEM_E('image')">
                <img :src="item.image" alt="">
              </div>
              <div :class="BEM_E('content')">
                <h4 v-if="item.title && item.title.length > 0"><FancyText :blok="item.title" /></h4>
                <p v-if="item.caption && item.caption.length > 0"><FancyText :blok="item.caption" /></p>
                <div v-if="item.content" v-html="markdown(item.content)" />
                <div :class="BEM_E('content-link')">
                  <Btn v-if="item.button && item.button.length > 0" :blok="item.button[0]" />
                </div>
              </div>
            </li>
          </ul>
          <div v-if="blok.button && blok.button[0]" :class="BEM_E('link')">
            <Btn :blok="blok.button[0]" />
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
      default: 'IconTextList'
    },
    blok: Object
  }
}
</script>
