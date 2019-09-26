<template>
  <section class="Page articleArchive">
    <ResourceHub contentType="articles" :queryShowFilters="false" />
  </section>
</template>

<script>
import ResourceHub from '~/src/components/Templates/ResourceHub'

export default {
  components: {
    'ResourceHub': ResourceHub
  },
  head () {
    return {
      title: 'Articles | WELL v2',
      meta: [
        { hid: 'description', name: 'description', content: 'Articles about the WELL Building Standard' }
      ]
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      this.$nuxt.$loading.finish()
    })
  }
}
</script>
