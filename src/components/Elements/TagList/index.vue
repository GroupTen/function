<template>
  <div :class="BEM_B">
    <ul :class="BEM_E('tags')">
      <li v-for="(tag, index) in reversedOrderedTags" v-bind:key="index" v-if="allowMax >= 0 ? index < allowMax: index > allowMax">
        <a :class="BEM_E('tag')" :href="shouldLink !== false ? linkTag(tag) : null">
          {{prepTagName(tag)}}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import BaseComponent from '~/src/components/Templates/BaseComponent'

export default {
  extends: BaseComponent,
  props: {
    name: {
      type: String,
      default: 'TagList'
    },
    tags: Array,
    allowMax: {
      type: Number,
      default: -1
    },
    shouldLink: {
      type: Boolean,
      default: true
    },
    linkType: {
      type: String,
      default: 'tools'
    }
  },
  methods: {
    linkTag (tag) {
      let lang = this.$store.state.language !== 'en' ? '/' + this.$store.state.language : ''
        
      return this.RESOURCES_URL + lang + '/?type='+ this.linkType + '&tags=' + tag
    },

    prepTagName (tag) {
      let tagname = tag.split('/')

      if(tagname.length > 1) {
        return tagname[1]
      }
      return tagname[0]
    }
  },
  computed: {
    // reverses tag order to match that done in blok
    reversedOrderedTags () {
      if(this.tags) {
        return this.tags.reverse()
      }

      return
    }
  }
}
</script>
