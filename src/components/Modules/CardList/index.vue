<template>
  <div :class="BEM_B">
    <div class="container">
      <div class="row flex-column align-items-center">
        <div :class="BEM_E('title')" v-if="blok">
          <TitleBlock :blok="blok" />
        </div>
        <ul :class="BEM_E('list') + ' row'">
          <!-- Allows us to pass in cards from editor via blok.cards or programmatically with items -->
          <li v-for="(item, index) in this.blok && blok.cards ? blokItems : items"
          v-bind:key="index"
          v-bind:title="item.msg"
          :class="BEM_E('item')"
          v-if="item.content.private !== true">
            <card
              :image="item.content && item.content.image ? item.content.image[0] : null"
              :title="item.content && item.content.title ? item.content.title : null"
              :caption="item.content && item.content.caption ? item.content.caption : null"
              :date="item.content ? {dateTime: item.content.dateTime, timezone:item.content.timezone} : null"
              :contentType="item.content ? item.content.component : null"
              :tags="item.tag_list && item.tag_list.length > 0 ? item.tag_list : item.content.credentials ? item.content.credentials : null"
              :path="linkCard(item.full_slug)"
              :imageDims="cardImageDims ? cardImageDims : null"
              :collapses="collapses"
              :mods="cardMods ? blok && blok.hideCardMeta ? cardMods.push('hide-meta') : cardMods : blok && blok.hideCardMeta ? ['hide-meta'] : null " />
          </li>
        </ul>
        <div v-if="blok && blok.button && blok.button[0]" :class="BEM_E('link')">
          <Btn :blok="blok.button[0]" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseComponent from '~/src/components/Templates/BaseComponent'
import Card from '~/src/components/Elements/Card'

export default {
  extends: BaseComponent,
  components: { Card },
  props: {
    name: {
      type: String,
      default: 'CardList'
    },
    cardMods: Array,
    cardImageDims: Array,
    blok: Object,
    items: Array,
    startsWith: String,
    perPage: {
      type: Number,
      default: 25
    },
    sortOrder: {
      type: String,
      default: 'position:desc'
    },
    collapses: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    if(this.startsWith) {
      this.loadCardsByLocation(this.sortOrder)      
    } else {
      this.loadCards(this.sortOrder)
    }
  },
  data() {
    return {
      blokItems: []
    }
  },
  methods: {
    loadCardsByLocation (sortOrder) {
      return this.$storyapi.get(`cdn/stories/`, {
        version: 'published',
        cv: this.$store.state.cacheVersion,
        starts_with: this.startsWith,
        sort_by: sortOrder,
        per_page: this.perPage
      }).then((res) => {
        this.blokItems = res.data.stories
        return res.data.story
      }).catch((res) => {
        if (!res.response) {
          console.error('no res', res)
        }
      })
    },
    loadCards (sortOrder) {
      if(this.blok && this.blok.cards) {
        let uuids = this.blok.cards ? this.blok.cards.toString() : ''
        return this.$storyapi.get(`cdn/stories/`, {
          version: 'published',
          cv: this.$store.state.cacheVersion,
          by_uuids: uuids,
          find_by: 'uuid',
          sort_by: sortOrder
        }).then((res) => {
          this.blokItems = res.data.stories
          return res.data.story
        }).catch((res) => {
          if (!res.response) {
            console.error('no res', res)
          }
        })
      }
    },
    linkCard (slug) {
      let lang = this.$store.state.language

      if(lang !== '' && lang !== 'en') {
        return lang + '/' + slug
      }
      return slug
    }
  },
}
</script>