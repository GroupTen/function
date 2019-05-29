<template>
  <li :class="blok.classes + ' nav-item'">
    <Btn v-if="blok.link[0]" :blok="blok.link[0]" />
  </li>
</template>

<script>
import BaseComponent from '~/src/components/Templates/BaseComponent'

export default {
  extends: BaseComponent,
  props: {
    name: {
      type: String,
      default: 'NavItem'
    },
    blok: Object,
    lang: String
  }
}
</script>
