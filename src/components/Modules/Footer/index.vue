<template>
  <div :class="BEM_B">
    <div :class="BEM_E('stats')">
      <div class="container">
        <div class="row" v-if="stats">
          <div class="FooterStat">
            <div class="FooterStat__icon">
              <img src="/gif/award.gif" alt="Award gif">
            </div>

            <div v-if="$store.state.language === 'zh-cn'">
            <div class="FooterStat__contents">
              <small>入选快公司杂志</small>
              <p>2019年全球最具创新力企业” 排行榜</p>
            </div>
            </div>

            <div v-else>
            <div class="FooterStat__contents">
              <small>Featured on Fast Company's</small>
              <p>2019 World's Most Innovative Companies List</p>
            </div>
            </div>

          </div>
          <div class="FooterStat FooterStat--math">
            <div class="FooterStat__icon">
              <img src="/gif/people.gif" alt="People gif">
            </div>
            <div v-if="$store.state.language === 'zh-cn'">
            <div class="FooterStat__contents">
              <small><b>{{stats.stat_wellap_certified}}</b>名 WELL AP</small>
              <small><b>{{stats.stat_well_ap_registered}}</b>人待考 WELL AP</small>
              <p>来自全球{{stats.stat_wellap_countries}}个国家{{stats.stat_wellaps}}人</p>
            </div>
            </div>

            <div v-else>
            <div class="FooterStat__contents">
              <small><b>{{stats.stat_wellap_certified}}</b> WELL APs</small>
              <small><b>{{stats.stat_well_ap_registered}}</b> WELL AP exam registrants</small>
              <p><b>{{stats.stat_wellaps}}</b> people from {{stats.stat_wellap_countries}} countries</p>
            </div>
            </div>

          </div>
          <div class="FooterStat FooterStat--math">
            <div class="FooterStat__icon">
              <img src="/gif/building.gif" alt="Projects gif">
            </div>

            <div v-if="$store.state.language === 'zh-cn'">
            <div class="FooterStat__contents">
              <small><b>{{stats.stat_certified}}</b>个已认证 WELL 项目</small>
              <small><b>{{stats.stat_registered}}</b>个待认证项目</small>
              <p>共计{{stats.stat_projects}}个 WELL 项目，{{stats.stat_area}}亿平方英尺</p>
            </div>
            </div>

            <div v-else>
            <div class="FooterStat__contents">
              <small><b>{{stats.stat_certified}}</b> WELL certified projects</small>
              <small><b>{{stats.stat_registered}}</b> WELL registered projects</small>
              <p><b>{{stats.stat_projects}}</b> WELL projects with {{stats.stat_area}} SQ FT</p>
            </div>
            </div>

          </div>
        </div>
      </div>
    </div>
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