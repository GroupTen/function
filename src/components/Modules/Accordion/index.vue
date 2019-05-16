<template>
  <div :class="BEM_B">
    <div class="container">
      <div class="row flex-column align-items-center">
        <div :class="BEM_E('title')" v-if="blok.title || blok.caption || blok.titleBlock">
          <TitleBlock :blok="blok" />
        </div>
        <div v-if="blok.questions" :class="BEM_E('items')">
          <div v-for="(item, index) in blok.questions"
            v-bind:key="index"
            :class="BEM_E('item')">
            <p v-if="item.caption" :class="BEM_E('item-caption')">{{item.caption}}</p>
            <a v-b-toggle="'faq' + index" :class="BEM_E('item-toggle')">{{item.title}}</a>
            <b-collapse :id="'faq' + index" accordion="faqs" role="tabpanel">
              <div :class="BEM_E('item-content')">
                <vue-markdown>{{item.content}}</vue-markdown>
              </div>
            </b-collapse>
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
      default: 'Accordion'
    },
    blok: Object
  }
}
</script>