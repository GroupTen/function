<template>
  <div v-editable="blok">
    <Navigation :blok="$store.state.settings.mainNav[0]"/>
    <component :key="blok._uid" v-for="blok in blok.body" :blok="blok" :is="blok.component | dashify"></component>
    <Footer :blok="$store.state.settings.mainFooter[0]" />
  </div>
</template>

<script>
import Navigation from '~/src/components/Modules/Navigation'
import Footer from '~/src/components/Modules/Footer'
  
export default {
  props: ['blok'],
  components: {
    Navigation,
    Footer
  }
}
</script>
