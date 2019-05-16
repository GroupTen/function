<template>
  <div :class="BEM_B" v-if="Object.entries(blockContent).length > 0">
    <div v-if="blockContent.image" :class="BEM_E('image')">
      <img
        :class="blockContent.image.classes"
        :src="blockContent.image.imageLocation" 
        :alt="blockContent.image.imageAlt"
        :width="blockContent.image.suggestedWidth ? blockContent.image.suggestedWidth : null">
    </div>
    <div v-if="blockContent.title || blockContent.subtitle || blockContent.caption || blockContent.link" :class="BEM_E('contents')">
      <span v-if="blockContent.subtitle" :class="BEM_E('subtitle')">
        <FancyText :blok="blockContent.subtitle" />
      </span>
      <h2 v-if="blockContent.title" :class="BEM_E('title')">
        <FancyText :blok="blockContent.title" />
      </h2>
      <h5 v-if="blockContent.caption" :class="BEM_E('caption')">
        <FancyText :blok="blockContent.caption" />
      </h5>
      <div v-if="blockContent.link" :class="BEM_E('link')">
        <Btn :blok="blockContent.link" />
      </div>
    </div>
  </div>
</template>

<script>
import BaseComponent from '~/src/components/Templates/BaseComponent'
import BEM from '~/mixins/bem.js'
import Btn from '~/src/components/Elements/Btn'
import FancyText from '~/src/components/Elements/FancyText'

export default {
  extends: BaseComponent,
  mixins: [BEM],
  components: {FancyText, Btn},
  props: {
    name: {
      type: String,
      default: 'TitleBlock'
    },
    blok: {
      type: Object
    },
    mods: Array
  },
  methods: {
    BEM_E: function(el) {
      return BEM.methods.ElCls(this.name, el)
    },
    BEM_M: function(mod) {
      return BEM.methods.ModCls(this.name, mod)
    },
    setBlockContentVal(valArr) {
      if(valArr && valArr[0]) {
        return valArr[0]
      }
      return null
    }
  },
  computed: {
    computeMods () {
      let arr = []
      if (this.mods && this.mods !== []) {
        arr = this.mods
      }

      if (this.blok.titleBlock && this.blok.titleBlock[0] && this.blok.titleBlock[0].variation) {
        arr.push(this.blok.titleBlock[0].variation)
      } else if (!this.blok.titleBlock && this.blok.variation) {
        arr.push(this.blok.variation)
      }

      return arr
    },
    computeCls () {
      let arr = []

      if (this.blok.titleBlock && this.blok.titleBlock[0] && this.blok.titleBlock[0].classes) {
        arr = this.blok.titleBlock[0].classes.split(',')
      } else if (!this.blok.titleBlock && this.blok.classes) {
        arr = this.blok.classes.split(',')
      }

      return arr
    },
    BEM_B () {
      return BEM.methods.BlockCls(this.name, this.computeMods, this.computeCls)
    },
    blockContent () {
      let content = {}
      let image, title, subtitle, caption, link

      // accept both raw and nested component titleBlock
      if(this.blok.titleBlock && this.blok.titleBlock.length > 0) {
        image = this.setBlockContentVal(this.blok.titleBlock[0].image)
        title = this.setBlockContentVal(this.blok.titleBlock[0].title)
        subtitle = this.setBlockContentVal(this.blok.titleBlock[0].subtitle)
        caption = this.setBlockContentVal(this.blok.titleBlock[0].caption)
        link = this.setBlockContentVal(this.blok.titleBlock[0].button)
      } else if(this.blok && this.blok.component == 'TitleBlock') {
        image = this.setBlockContentVal(this.blok.image)
        subtitle = this.setBlockContentVal(this.blok.subtitle)
        title = this.setBlockContentVal(this.blok.title)
        caption = this.setBlockContentVal(this.blok.caption)
        link = this.setBlockContentVal(this.blok.button)
      } else if(this.blok) {
        subtitle = this.blok.subtitle ? this.blok.subtitle : null
        title = this.blok.title ? this.blok.title : null
        caption = this.blok.caption ? this.blok.caption : null
      }

      if(image) {
        content.image = image[0] ? image[0] : image
      }

      if(title) {
        content.title = title
      }

      if(subtitle) {
        content.subtitle = subtitle
      }

      if(caption) {
        content.caption = caption
      }

      if(link) {
        content.link = link
      }

      return content
    }
  }
}
</script>
