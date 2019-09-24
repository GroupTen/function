<template>
  <div>
    <Navigation :blok="$store.state.settings.mainNav[0]"/>
    <div :class="BEM_B">
      <div :class="BEM_E('back-link') + ' container'" v-if="back !== false">
        <nuxt-link :to="backLink ? backLink : '/' + this.name.toLowerCase() + 's'" v-html="backLabel ? backLabel : '← All' + name + 's'" />
      </div>
      <div :class="BEM_E('image')">
        <slot name="image"></slot>
      </div>
      <article>
        <div class="container Main">
          <div class="row">
            <div :class="BEM_E('contents')">
              <header :class="BEM_E('header')">
                <slot name="header"></slot>
              </header>
              <div :class="BEM_E('content')">
                <slot name="content"></slot>
              </div>
            </div>
            <div 
              :class="BEM_E('sidebar')"
              ref = "resourceSidebar"
              id="resourceSidebar"
              v-if="this.$slots.sidebar && this.$slots.sidebar.length > 0">
              <slot name="sidebar"></slot>
            </div>
          </div>
        </div>
      </article>
      <div :class="BEM_E('additional')">
        <slot name="additional"></slot>
      </div>
    </div>
    <Footer :blok="$store.state.settings.mainFooter[0]" />
  </div>
</template>

<script>
import BaseComponent from '~/src/components/Templates/BaseComponent'
import Navigation from '~/src/components/Modules/Navigation'
import Footer from '~/src/components/Modules/Footer'

export default {
  extends: BaseComponent,
  components: {
    Navigation,
    Footer
  },
  props: {
    name: {
      type: String,
      default: 'Single'
    },
    type: String,
    blok: Object,
    back: {
      type: Boolean,
      default: true
    },
    backLink: String,
    backLabel: String
  },
  head () {
    return {
      title: this.blok && this.blok.metadata ? this.blok.metadata.title : this.blok.title ? this.blok.title : 'Function',
      titleTemplate: '%s | Function',
      meta: [{ hid: 'description', name: 'description', 
      content: this.blok && this.blok.metadata ? this.blok.metadata.description : '' }]
    }
  },
  data () {
    return {
      sidebarTop: 0,
      sidebarRight: 0
    }
  }
}
</script>
