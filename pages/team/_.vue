<template>
  <div 
    :class="[
    'Page',
    story.content.classes ? story.content.classes : null,
    'person']">
    <component 
      v-if="story.content.component" 
      :key="story.content._uid" 
      :blok="story.content"
      :slug="story.full_slug"
      :is="story.content.component | dashify"
      :tagList="story.tag_list"></component>
  </div>
</template>

<script>
const loadData = function({api, version, cacheVersion, errorCallback, path}) {
  return api.get(`cdn/stories${path}`, {
    version: version,
    cv: cacheVersion,
    resolve_links: 2
  }).then(res => {
    if(res.data) {
      return res.data
    }
  }).catch(res => {
    errorCallback({ statusCode: 404, message: 'Failed to receive content form api' })
  })
}

export default {
  data () {
    return { story: { content: {} } }
  },
  mounted () {
    this.$storybridge.on(['input', 'published', 'change'], (event) => {
      if (event.action == 'input') {
        if (event.story.id === this.story.id) {
          this.story.content = event.story.content
        }
      } else if (!event.slugChanged) {
        window.location.reload()
      }
    })

    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      this.$nuxt.$loading.finish()
    })
  },
  asyncData (context) {
    let editMode = false
    if(context.payload) {
      return { story: context.payload }
    } else {
      if (context.query._storyblok || context.isDev || (typeof window !== 'undefined' && window.localStorage.getItem('_storyblok_draft_mode'))) {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem('_storyblok_draft_mode', '1')
          if (window.location == window.parent.location) {
            window.localStorage.removeItem('_storyblok_draft_mode')
          }
        }

        editMode = true
      }

      let version = editMode ? 'draft' : 'published'

      // Load the JSON from the API
      return loadData({
        api: context.app.$storyapi,
        version: version,
        cacheVersion: context.store.state.cacheVersion,
        errorCallback: context.error,
        path: context.route.path
      })
    }
  }
}
</script>
