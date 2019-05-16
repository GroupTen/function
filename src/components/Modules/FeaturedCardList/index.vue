<template>
  <div :class="BEM_B">
    <CardList
      v-if="posts && posts.length > 0"
      :items="posts"
      :mods="['3-up']" 
      :blok="blok ? processedBlok : {'title': 'Featured ' + type}" />
  </div>
</template>

<script>
import BaseComponent from '~/src/components/Templates/BaseComponent'
import CardList from '~/src/components/Modules/CardList'

export default {
  extends: BaseComponent,
  components: { CardList },
  props: {
    name: {
      type: String,
      default: 'FeaturedCardList'
    },
    contentType: {
      type: String,
      default: 'articles'
    },
    blok: Object
  },
  mounted () {
    this.fetchPosts()
  },
  data() {
    return {
      posts: []
    }
  },
  methods: {
    fetchPosts: function () {
      return this.$storyapi.get('cdn/stories/', {
        version: 'published',
        starts_with: this.$store.state.language !== 'en' ? this.$store.state.language + '/resources/' + this.type : 'resources/' + this.type,
        cv: this.$store.state.cacheVersion,
        per_page: 3,
        filter_query: {"featured":{"in": true }}
      },
      ).then((res) => {
        this.posts = res.data.stories
        return res.data.story
      }).catch((res) => {
        if (!res.response) {
          console.error('no res', res)
        }
      })
    }
  },
  computed: {
    type () {
      if(this.blok && this.blok.contentType) {
        return this.blok.contentType
      }

      return this.contentType
    },
    processedBlok () {
      let pBlok = this.blok

      if(pBlok) {
        pBlok.hideCardMeta = true
        return pBlok
      }
    }
  }
}
</script>