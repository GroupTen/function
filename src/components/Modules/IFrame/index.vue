<template>
  <div :class="BEM_B">
    <iframe :src="blok.src" frameborder="0" width="100%" style="min-height: 90vh" scrolling="no"></iframe>
  </div>
</template>

<script>
import BaseComponent from '~/src/components/Templates/BaseComponent'

export default {
  extends: BaseComponent,
  props: {
    name: {
      type: String,
      default: 'Iframe'
    },
    blok: Object
  }
}
</script>