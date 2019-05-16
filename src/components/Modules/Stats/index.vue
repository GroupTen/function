<template>
  <div :class="BEM_B">
    <div class="container">
      <div class="row flex-column align-items-center">
        <TitleBlock :blok="blok" />
        <ul v-if="blok.stats" :class="BEM_E('items') + ' row'">
          <li v-for="(item, index) in blok.stats"
            v-bind:key="index"
            :class="BEM_E('item')">
            <h3 v-if="item.title">{{item.title}}</h3>
            <p v-if="item.caption">{{item.caption}}</p>
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
      default: 'Stats'
    },
    blok: Object
  }
}
</script>
