<template>
  <div :class="this.openNav === true ? BEM_B + ' mobile-open' : BEM_B + ' mobile-closed'" style="flex-direction: column;">
    <header class="JoinedNav" v-if="blok.variation === 'mainnav'">
      <nav class="main-nav" ref="mainNav" v-if="blok.navItems">
        <div class="container">
          <div class="row">
            <ul>
              <li
                v-for="(item, index) in blok.navItems"
                v-bind:key="index"
                :class="item.subitems.length > 0 ? 'nav-link has-dropdown ' + item.classes : 'nav-link ' + item.classes"
                :data-content="'item-' + index">
                <Btn :blok="item.link[0]" class="nav-item" />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
    <b-nav v-else-if="blok.navItems">
      <NavItem
        v-for="(item, index) in blok.navItems"
        v-bind:key="index"
        :blok="item"
        :lang="lang" />
    </b-nav>
    <div class="container">
      <div class="row">
        <a :class="BEM_E('to-top') + ' Btn Btn--outline-sm tooltip-balloon'"
          data-balloon="Back to top" data-balloon-pos="bottom"
          @click="scrollToTop()"
          v-if="blok.variation === 'subnav'" >↑</a>
        <a 
          v-if="blok.homeImage" 
          :href="homeLink"
          :class="BEM_E('logo-link')">
          <img
            :class="BEM_E('logo')"
            :src="blok.homeImage">
          <img
            :class="BEM_E('logo')"
            :src="blok.homeImageLight">
        </a>
        <a class="nav-trigger" @click="toggleNav">
          <span /><span /><span />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import BaseComponent from '~/src/components/Templates/BaseComponent'
import NavItem from './NavItem'

export default {
  extends: BaseComponent,
  components: { NavItem },
  props: {
    name: {
      type: String,
      default: 'Navigation'
    },
    blok: Object
  },
  data () {
    return {
      openNav: false
    }
  },
  methods: {
    toggleNav () {
      this.openNav = !this.openNav
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }
  },
  computed: {
    lang () {
      return this.$route.fullPath.split('/')[1]
    },
    homeLink () {
      let base = process.env.NODE_ENV == 'production' ? this.MAIN_URL : this.BASE_URL
      let lang = this.$store.state.language !== 'en' ? '/' + this.$store.state.language : ''

      let fullLink = base

      if(this.blok && this.blok.variation == 'subnav'){
        let url = this.blok.homeLink.cached_url
        fullLink += url.startsWith(lang) ? url : lang + url
        return fullLink
      } else {
        return base + lang + '/'
      }

      return base + lang
    }
  }
}
</script>
