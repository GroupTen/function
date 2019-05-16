<template>
  <div :class="BEM_B">
    <div class="container">
      <div class="row">
        <div class="col-lg-10 offset-lg-1 col-12">
          <img v-if="blok.image" :src="blok.image" :alt="blok.image">
          <TitleBlock :blok="blok" />

          <ul :class="BEM_E('items')" v-if="blok.buttons">
            <li v-for="(item, index) in blok.buttons" :class="BEM_E('item')" v-bind:key="index">
              <Btn :blok="item" />
            </li>
          </ul>
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
      default: 'LinkList'
    },
    blok: Object
  }
}
</script>




