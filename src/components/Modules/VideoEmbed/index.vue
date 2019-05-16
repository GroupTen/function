<template>
  <div :class="BEM_B">
    <div class="container">
      <div class="row flex-column">
        <div :class="BEM_E('title')" v-if="blok">
          <TitleBlock :blok="blok" />
        </div>
        <div :class="BEM_E('video')">
          <Vid :blok="video && video[0] ? video[0].content : {}" />
        </div>
        <div v-if="blok && blok.button && blok.button[0]" :class="BEM_E('link')">
          <Btn :blok="blok.button[0]" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseComponent from '~/src/components/Templates/BaseComponent'
import Vid from '~/src/components/Elements/Video'

export default {
  extends: BaseComponent,
  components: { Vid },
  props: {
    name: {
      type: String,
      default: 'VideoEmbed'
    },
    blok: Object
  },
  mounted () {
    this.loadAddlData([this.blok.video], 'video')
  },
  data() {
    return {
      video: []
    }
  },
  methods: {
    fetchPosts: function () {
      return this.$storyapi.get('cdn/stories/', {
        version: 'published',
        starts_with: this.$store.state.language !== 'en' ? this.$store.state.language + '/resources/' + this.contentType : 'resources/' + this.contentType,
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
  }
}
</script>