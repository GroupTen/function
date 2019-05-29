<template>
  <div :class="BEM_B">
    <div :class="BEM_E('links') + ' container'">
      <a v-if="blok.homeImage"
        :href="linkHome(blok.homeLink)"
        :class="BEM_E('logo-link')">
        <img
          :class="BEM_E('logo')"
          :src="blok.homeImage">
      </a>
      <div :class="BEM_E('link-lists')">
        <div 
          v-for="(itemList, index) in blok.navItems" 
          v-bind:key="index"
          :class="itemList.classes">
          <h6><FancyText :blok="itemList.title" /></h6>
          <ul :class="itemList.classes !== '' ? BEM_E('link-list') + ' ' + itemList.classes : BEM_E('link-list')">
            <li v-for="(item, index) in itemList.buttons" v-bind:key="index + item.linkLabel">
              <Btn :blok="item" />
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div :class="BEM_E('slim') + ' container'">
      <p :class="BEM_E('caption')" v-if="blok.homeCaption">
        <FancyText :blok="blok.homeCaption" />
      </p>
      <ul :class="BEM_E('social-links')" v-if="socialLinks">
        <li v-for="(link, index) in socialLinks" v-bind:key="index">
          <a :href="link.url" target="_blank" :class="BEM_E('social-link')">
            <Vector :name="'social/' + link.name" width="32" height="32" />
          </a>
        </li>
      </ul>
    </div>
    <div :class="BEM_E('copy') + ' container'">
      <p>&copy; International WELL Building Institute</p>
      <div :class="BEM_E('terms')"
        v-if="blok.copyrightNavItems"
        v-for="(itemList, index) in blok.copyrightNavItems" v-bind:key="index">
        <span v-for="(item, index) in itemList.buttons" v-bind:key="index + item.linkLabel">
          <Btn :blok="item" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import BaseComponent from '~/src/components/Templates/BaseComponent'
import axios from 'axios'

export default {
  extends: BaseComponent,
  props: {
    name: {
      type: String,
      default: 'Footer'
    },
    blok: Object
  },
  data () {
    return {
      socialLinks: this.$store && this.$store.state.settings ? this.$store.state.settings.socialLinks : [],
      stats: null
    }
  },
  mounted () {
    this.fetchStats()
  },
  methods: {
    linkHome (link) {
      let path = ''

      if(this.$store) {
        let lang = this.$store.state.language === 'en' ? '' : this.$store.state.language
        path = lang

        path += link ? link.cached_url : ''
      }

      return path
    },
    fetchStats () {
      return axios.get('https://v2-api.wellcertified.com/api/well/footer-stats')
      .then((res) => {
        this['stats'] = res.data
        return res.data
      }).catch((res) => {
        if (!res.response) {
          console.error('no res', res)
        }
      })
    }
  }
}
</script>