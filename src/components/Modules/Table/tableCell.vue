<template>
  <div :class="BEM_B">
    <div :class="BEM_E('cell-header')" v-if="blok.component == 'TableCellHeader'">
      <Img v-if="blok.icon && blok.icon.length > 0" :blok="blok.icon[0]" />
      <h2 v-if="blok.title">{{blok.title}}</h2>
      <h3 v-if="blok.price">{{blok.price}}<span>{{blok.unit}}</span></h3>
      <div v-html="markdown(blok.content)" />
    </div>

    <div :class="BEM_E('cell')" v-else>
      <div :class="BEM_E('cell-' + blok.variation)">
        <img v-if="blok.icon" :src="blok.icon" alt="icon">
        <h5 v-if="blok.variation == 'subhead'">{{blok.text}}</h5>
        <p v-if="blok.variation == 'text'">{{blok.text}}</p>
        <div v-if="blok.variation == 'text' && blok.button.length > 0" :class="BEM_E('cell-link')">
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
      default: 'TableCell'
    }
  }
}
</script>
