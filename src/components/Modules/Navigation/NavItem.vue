<template>
  <b-nav-item-dropdown
    v-if="blok && blok.subitems && blok.subitems.length > 0 && blok.classes !== 'language'" 
    :text="blok.link[0].linkLabel"
    :class="BEM_B"
    extra-toggle-classes="nav-link-custom">
    <b-dropdown-item 
      v-for="(subitem, index) in blok.subitems"
      v-bind:key="index"
      :href="linkDropdown(subitem.linkLocation)"
      :target="subitem.targetBlank ? '_blank' : '_self'"
      :class="subitem.classes">
      <span :class="subitem.classes + '__wrapper'">
        <img v-if="subitem.icon && subitem.icon.length > 0" :src="subitem.icon[0].imageLocation" :alt="subitem.icon[0].imageAlt">
        <span :class="subitem.classes + '__text'">{{subitem.linkLabel}}</span>
      </span>
    </b-dropdown-item>
  </b-nav-item-dropdown>
  <b-nav-item-dropdown
    v-else-if="blok.classes === 'language'" 
    :class="BEM_B"
    extra-toggle-classes="nav-link-custom">
    <template slot="button-content">
      <Vector name="icon/globe" />{{getLang()}}
    </template>
    <b-dropdown-item @click="updateLang('en')">EN</b-dropdown-item>
    <b-dropdown-item @click="updateLang('zh-cn')">中文</b-dropdown-item>
  </b-nav-item-dropdown>
  <li v-else :class="blok.classes + ' nav-item'">
    <Btn v-if="blok.link[0]" :blok="blok.link[0]" />
  </li>
</template>

<script>
import BaseComponent from '~/src/components/Templates/BaseComponent'

export default {
  extends: BaseComponent,
  props: {
    name: {
      type: String,
      default: 'NavItem'
    },
    blok: Object,
    lang: String
  },
  methods: {
    getLang () {
      return this.lang === 'zh-cn' ? '中文' : 'EN'
    },

    updateLang (lang) {
      // abort update if already translated
      if(this.$store.state.language === lang) {
        return null
      }

      this.$store.commit('setLanguage', lang)

      let newPath = this.buildNewLangPath()

      if(newPath !== null) {
        this.$router.push({
          path: newPath
        })
      }
    },

    buildNewLangPath () {
      let fullPath = this.$route.fullPath
      let lang = this.$store.state.language
        
      // remove any lang from url and serve default for english
      if(lang === 'en') {
        let stripLang = fullPath.split('/')

        return fullPath.split(stripLang[1])[1]

      // append new lang to url
      } else {
        return '/' + lang + this.$route.fullPath
      }
    },

    // Prepend url with '/' if it's a story.
    // Makes nuxt router assume root relative
    linkDropdown (link) {
      let lang = '/' + this.$store.state.language

      // inject current lang into url unless its english (default)
      this.$store.state.language !== 'en' ? lang += '/' : lang = '/'

      // is storyblok story
      if (link.linktype === 'story') {
        return lang + link.cached_url

      // is raw url
      } else {
        let isValidUrl = this.checkUrlValidity(link.cached_url)
        let rawUrl = isValidUrl ? link.cached_url : lang + link.cached_url

        return rawUrl
      }
    },
    checkUrlValidity(str) {
      let res = str.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)

      if (res == null) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>
