<template>
  <div :class="BEM_B">
    <div class="container">
      <div class="row">
        <div :class="BEM_E('title')">
          <TitleBlock :blok="blok" />
        </div>
        <div v-if="blok.tabs" :class="BEM_E('items')">
          <b-tabs :vertical="blok.variation == 'vertical'">
            <b-tab
              v-for="(item, index) in blok.tabs"
              v-bind:key="index" 
              :title="item.title">
              <template slot="title">
                <img :src="prepImg(item.icon, '25x25/smart')" :class="BEM_E('item-icon')">
                {{item.title}}
              </template>
              <div :class="BEM_E('item-content')">
                <template v-if="item.richContent && item.richContent.length > 0">
                  <RichText :blok="item.richContent[0]" />
                </template>
                <template v-else>
                  <Img v-if="item.image && item.image[0]" :blok="item.image[0]" :class="BEM_E('item-image')" />
                  <vue-markdown>{{item.content}}</vue-markdown>                    
                </template>
              </div>
            </b-tab>
          </b-tabs>
        </div>
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
import RichText from '~/src/components/Modules/RichText'

export default {
  extends: BaseComponent,
  props: {
    name: {
      type: String,
      default: 'Tabs'
    },
    title: String,
    caption: String,
    items: [Object, Array]
  },
  components: { RichText }
}
</script>
