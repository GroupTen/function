<template>
  <div class="error-page">
    <Navigation v-if="$store && $store.state.settings" 
      :blok="$store.state.settings.mainNav[0]"/>
    <Error :error="error" />
  </div>
</template>

<script>
import Navigation from '~/src/components/Modules/Navigation'
import Error from '~/src/components/Templates/Error'

export default {
  props: ['error', 'blok'],
  components: {
    Navigation,
    Error
  },
  mounted () {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      this.$nuxt.$loading.finish()
    })
  },
  head() {
    return {
      title: this.error ? this.error.statusCode + ' | IWBI' : 404 + ' | IWBI'
    }
  }
}
</script>