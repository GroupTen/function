<template>
  <span :class="BEM_B">
    {{fancyTxt}}
  </span>
</template>

<script>
import BaseComponent from '~/src/components/Templates/BaseComponent'
import BEM from '~/mixins/bem.js'

export default {
  extends: BaseComponent,
  mixins: [BEM],
  props: {
    name: {
      type: String,
      default: 'FancyText'
    },
    blok: [Array, Object, String],
  },
  computed: {
    fancyTxt () {
      if (typeof this.blok === 'string') {
        return this.blok
      }
      
      if (this.blok) {
        // ensure we get blok as an {} instead of []

        let blok = this.blok[0] ? this.blok[0] : this.blok
        return blok.customText !== '' && blok.customText !== null ? blok.customText : blok.existingText
      }
      
      return ''
    },
    computeMods () {
      let arr = []
      if (this.mods && this.mods !== []) {
        arr = this.mods
      }

      if (this.blok && this.blok.variation) {
        arr.push(this.blok.variation)
      } 

      return arr
    },
    computeCls () {
      let arr = []
      if (this.blok && this.blok.classes) {
        arr = this.blok.classes.split(',')
      }

      return arr
    },
    BEM_B () {
      return BEM.methods.BlockCls(this.name, this.computeMods, this.computeCls)
    }
  }
}
</script>
