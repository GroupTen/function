<template>
  <div :class="BEM_B">
    <div class="container">
      <div class="row">
        <TitleBlock :blok="blok" />
        <div :class="BEM_E('quotes')" v-if="blok.quotes">
          <b-tabs>
            <b-tab
              v-for="(quote, index) in blok.quotes" 
              :class="BEM_E('quote')" 
              v-bind:key="index">
              <template slot="title">
                <Img :blok="quote && quote.image.length > 0 ? quote.image[0] : {}" />
                <p :class="BEM_E('cite-title')">{{quote.citeTitle}}</p>
                <p :class="BEM_E('cite-caption')">{{quote.citeCaption}}</p>
              </template>
              <h2 :class="BEM_E('direct-quote')">
                {{quote.quote}}
              </h2>
            </b-tab>
          </b-tabs>
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
      default: 'QuoteList'
    }
  }
}
</script>

