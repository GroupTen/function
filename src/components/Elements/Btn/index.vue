<template>
  <!-- Link to File -->
  <b-button v-if="blok && blok.linkFile"
   :href="blok.linkFile" variant="base" :class="BEM_B" :target="blok.targetBlank ? blok.targetBlank : '_self'">
    <span v-if="blok.icon && blok.icon.length > 0" :class="BEM_E('icon')">
      <img :src="blok.icon[0].imageLocation" :alt="blok.icon[0].imageAlt">
    </span>
    <span v-if="blok.linkLabel || blok.linkCaption" :class="BEM_E('contents')">
      <span v-if="blok.linkLabel" :class="BEM_E('label')" v-html="markdown(blok.linkLabel)"/>
      <span v-if="blok.linkCaption" :class="BEM_E('caption')">{{blok.linkCaption}}</span>
    </span>
  </b-button>

  <!-- Link to Story -->
  <!-- :to same url -->
  <nuxt-link
    v-else-if="blok && blok.linkLocation && blok.linkLocation.linktype === 'story' && doesStoryDomainMatch == true" 
    :to="makeStoryLink(blok.linkLocation)"
    :target="blok.targetBlank ? '_blank' : '_self'" 
    :class="BEM_B">
    <span v-if="blok.icon && blok.icon.length > 0" :class="BEM_E('icon')">
      <img :src="blok.icon[0].imageLocation" :alt="blok.icon[0].imageAlt">
    </span>
    <span v-if="blok.linkLabel || blok.linkCaption" :class="BEM_E('contents')">
      <span v-if="blok.linkLabel" :class="BEM_E('label')" v-html="markdown(blok.linkLabel)"/>
      <span v-if="blok.linkCaption" :class="BEM_E('caption')">{{blok.linkCaption}}</span>
    </span>
  </nuxt-link>

  <!-- :href other url -->
  <b-button
    v-else-if="blok && blok.linkLocation && blok.linkLocation.linktype === 'story' && doesStoryDomainMatch !== true"
    variant="base" 
    :href="makeExternalStoryLink(blok.linkLocation)"
    :target="blok.targetBlank ? '_blank' : '_self'" 
    :class="BEM_B">
    <span v-if="blok.icon && blok.icon.length > 0" :class="BEM_E('icon')">
      <img :src="blok.icon[0].imageLocation" :alt="blok.icon[0].imageAlt">
    </span>
    <span v-if="blok.linkLabel || blok.linkCaption" :class="BEM_E('contents')">
      <span v-if="blok.linkLabel" :class="BEM_E('label')" v-html="markdown(blok.linkLabel)"/>
      <span v-if="blok.linkCaption" :class="BEM_E('caption')">{{blok.linkCaption}}</span>
    </span>
  </b-button>

  <!-- / END STORY LINKS -->


  <!-- Link to External Url -->
  <b-button v-else-if="blok && blok.linkLocation && blok.linkLocation.linktype === 'url'"
   :href="makeExternalLink(blok.linkLocation.url)" 
   variant="base"
   :class="BEM_B" 
   :target="blok.targetBlank ? '_blank' : '_self'">
    <span v-if="blok.icon && blok.icon.length > 0" :class="BEM_E('icon')">
      <img :src="blok.icon[0].imageLocation" :alt="blok.icon[0].imageAlt">
    </span>
    <span v-if="blok.linkLabel || blok.linkCaption" :class="BEM_E('contents')">
      <span v-if="blok.linkLabel" :class="BEM_E('label')" v-html="markdown(blok.linkLabel)"/>
      <span v-if="blok.linkCaption" :class="BEM_E('caption')">{{blok.linkCaption}}</span>
    </span>
  </b-button>

  <!-- Basic Btn -->
  <b-button v-else
   :href="link" variant="base" :class="BEM_B" :target="target ? target : '_self'">
    <span v-if="icon" :class="BEM_E('icon')">
      <img :src="icon">
    </span>
    <span v-if="label || caption" :class="BEM_E('contents')">
      <span v-if="label" :class="BEM_E('label')" v-html="markdown(blok.linkLabel)"/>
      <span v-if="caption" :class="BEM_E('caption')">{{caption}}</span>
    </span>
  </b-button>
</template>

<script>
import BaseComponent from '~/src/components/Templates/BaseComponent'
import BEM from '~/mixins/bem.js'
const marked = require('marked')

export default {
  extends: BaseComponent,
  mixins: [BEM],
  props: {
    name: {
      type: String,
      default: 'Btn'
    },
    blok: Object,

    // otherwise
    icon: String,
    label: String,
    caption: String,
    link: String,
    target: [String, Boolean],
    domain: String
  },
  methods: {
    BEM_E: function(el) {
      return BEM.methods.ElCls(this.name, el)
    },
    BEM_M: function(mod) {
      return BEM.methods.ModCls(this.name, mod)
    },

    markdown(txt) {
      marked.setOptions({
        breaks: true,
      })
      if(txt) {
        return marked(txt)
      }
    },

    // prepend with lang
    makeStoryLink (link) {
      let url = link.cached_url
      let lang = this.$store.state.language !== 'en' ? '/' + this.$store.state.language + '/' : '/'
      let strippedUrl = url.indexOf('resources/') > -1 ? url.replace('resources/', '') : url

      if(!strippedUrl.startsWith(lang)) {
        strippedUrl = lang + strippedUrl
      }

      return strippedUrl
    },

    // ensure routing cross domain
    makeExternalStoryLink (link) {
      let url = this.makeStoryLink(link)

      url = this.routeExternalStoryLink(url)

      return url
    },

    // setup links to route
    routeExternalStoryLink (link) {
      let env = process.env.prodUrl
      if(env.includes('resources.wellcertified')) {
        link = process.env.mainUrl + link
      } else {
        link = process.env.resourcesUrl + link
      }

      return link 
    },
    makeExternalLink (link) {
      let lang = '/' + this.$store.state.language
      this.$store.state.language !== 'en' ? lang += '/' : lang = '/'

      let isValidUrl = this.checkUrlValidity(link)
      let rawUrl = isValidUrl ? link : lang + link

      if(isValidUrl) {
        return link
      } else {
        let doesDomainMatch = this.checkResourceMatch(link)
        let strippedLink = link.indexOf('resources/') > -1 ? link.replace('resources/', '') : link

        if(doesDomainMatch) {
          return lang + strippedLink
        } else {
          return this.routeExternalStoryLink(lang + strippedLink)
        }
      }

      return rawUrl
    },

    checkUrlValidity(str) {
      let res = str.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)

      if (res == null) {
        return false
      } else {
        return true
      }
    },

    checkResourceMatch(link) {
      let env = process.env.prodUrl

      let resourceMatch = [
        'resources', '/zh-cn/resources',
        'articles', '/zh-cn/articles',
        'events', '/zh-cn/events',
        'faqs', '/zh-cn/faqs',
        'people', '/zh-cn/people',
        'tools', '/zh-cn/tools',
        'webcasts', '/zh-cn/webcasts']

      let isResource = resourceMatch.some(function(v) { return link.startsWith(v) })
      let domainIsResources = env.includes('resources.wellcertified')

      if(isResource && domainIsResources) {
        return true
      } else if(!isResource && domainIsResources) {
        return false
      } else if(isResource && !domainIsResources) {
        return false
      } else if(!isResource && !domainIsResources) {
        return true
      }

      return false
    }
  },
  computed: {
    computeMods () {
      let arr = []
      if (this.mods && this.mods !== []) {
        arr = this.mods
      }

      if (this.blok && this.blok.variation) {
        arr.push(this.blok.variation)
      } 

      return arr
    },
    computeCls () {
      let arr = []
      if (this.blok && this.blok.classes) {
        arr = this.blok.classes.split(',')
      }

      return arr
    },
    BEM_B () {
      return BEM.methods.BlockCls(this.name, this.computeMods, this.computeCls)
    },
    doesStoryDomainMatch () {
      if(this.blok && this.blok.linkLocation) {
        let match = this.checkResourceMatch(this.blok.linkLocation.cached_url)

        return match
      }

      return true
    }
  }
}
</script>
