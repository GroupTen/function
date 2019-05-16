<template>
  <div :class="BEM_B">
    <div class="container">
      <div class="row">
        <div :class="BEM_E('cols')">
          <img v-if="blok.image" :src="blok.image" :alt="blok.image">
          <TitleBlock :blok="blok" />

          <div :class="BEM_E('items')" v-if="blok.items">
            <div v-for="(item, index) in canCollapse && shownItems ? shownItems : blok.items" :class="BEM_E('item') + ' mb-4'" v-bind:key="index">
              <div v-if="item.image" :class="BEM_E('image')">
                <img :src="item.image" alt="">
              </div>
              <div :class="BEM_E('content')">
                <h4><FancyText :blok="item.title" /></h4>
                <p><FancyText :blok="item.caption" /></p>
                <span v-if="item.content" v-html="markdown(item.content)" />
              </div>
            </div>
            <b-collapse :id="randomId" :class="BEM_E('collapse')">
              <div v-for="(item, index) in canCollapse && hiddenItems ? hiddenItems : null" :class="BEM_E('item') + ' mb-4'" v-bind:key="index">
                <div v-if="item.image" :class="BEM_E('image')">
                  <img :src="item.image" alt="">
                </div>
                <div :class="BEM_E('content')">
                  <h4><FancyText :blok="item.title" /></h4>
                  <p><FancyText :blok="item.caption" /></p>
                  <span v-if="item.content" v-html="markdown(item.content)" />
                </div>
              </div>
            </b-collapse>
          </div>
          <div class="text-center" v-if="canCollapse">
            <b-button v-b-toggle="randomId" variant="base" class="Btn Btn--primary d-inline-block">
              {{blok.collapseButtonLabel || 'See all'}}
            </b-button>
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
      default: 'IconTextListCollapse'
    },
    blok: Object
  },
  computed: {
    canCollapse: function () {
      return this.blok.showInitial < this.blok.items.length
    },
    shownItems: function () {
      if(this.blok.showInitial && this.canCollapse) {
        return this.blok.items.slice(0, this.blok.showInitial)
      }
    },
    hiddenItems: function () {
      if(this.blok.showInitial && this.canCollapse) {
        return this.blok.items.slice(this.blok.showInitial)
      }
    },
    randomId: function () {
      return 'IconTextListCollapse-' + Math.random()
    }
  }
}
</script>
