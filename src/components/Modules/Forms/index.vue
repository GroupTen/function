<template>
  <div :class="BEM_B">
    <div class="container">
      <TitleBlock
        v-if="blok.title || blok.caption"
        :mods="['align-center']"
        :blok="blok" />
      <Form :blok="form && form[0] ? form[0].content : null" />
    </div>
  </div>
</template>

<script>
import BaseComponent from '~/src/components/Templates/BaseComponent'
import Form from '~/src/components/Elements/Form'

export default {
  extends: BaseComponent,
  components: { Form },
  props: {
    name: {
      type: String,
      default: 'Form'
    },
    blok: Object
  },
  mounted: function () {
    this.loadAddlData([this.blok.form], 'form')
  },
  data: function () {
    return {
      form: []
    }
  }
}
</script>
