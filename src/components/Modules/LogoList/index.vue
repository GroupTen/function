<template>
  <div :class="BEM_B">
    <div class="container">
      <div class="row">
          <TitleBlock :blok="blok" />
          <ul :class="BEM_E('items')" v-if="blok.items">
            <li v-for="(item, index) in blok.items" :class="BEM_E('item')" v-bind:key="index">
              <a :class="BEM_E('item-link')" :href="item.link ? item.link.cached_url : null">
                <div v-if="item.image" :class="BEM_E('image')">
                  <img :src="item.image" alt="">
                </div>
                <div :class="BEM_E('content')" v-if="item.title">
                  <h6>{{item.title}}</h6>
                </div>
              </a>
            </li>
          </ul>
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
      default: 'LogoList'
    },
    blok: Object
  }
}
</script>
