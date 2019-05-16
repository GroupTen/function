<template>
  <div :class="BEM_B" v-bind:style="{ 
      backgroundImage: blok.image ? 'url(' + prepImg(blok.image, '1200x600/smart') + ')' : 'none',
      backgroundSize: blok.image ? 'cover' : 'initial' }">
    <div class="container">
      <div class="row">
        <div :class="BEM_E('contents')">
          <TitleBlock :blok="metricsContent" />
        </div>
        <div :class="BEM_E('action')" v-if="blok.button && blok.button[0]">
          <Btn v-if="blok.button && blok.button[0]" :class="BEM_E('link')" :blok="blok.button[0]" />
        </div>
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
      default: 'Metrics'
    },
    blok: Object
  },
  mounted () {
    this.fetchStats()
  },
  data () {
    return {
      metrics: null
    }
  },
  methods: {
    fetchStats () {
      return axios.get('https://v2-api.wellcertified.com/api/well/footer-stats')
      .then((res) => {
        this['metrics'] = res.data
        return res.data
      }).catch((res) => {
        if (!res.response) {
          console.error('no res', res)
        }
      })
    }
  },
  computed: {
    metricsContent () {
      let content = {}
      if(this.blok) {
        content.subtitle = this.blok.subtitle
        content.title = this.metricsText

        return content
      }

      return content
    },
    metricsText () {
      if(this.metrics) {
        let sqftArea = this.metrics.stat_area.split(' ')[0]
        let mArea = Math.floor(sqftArea / 10.764) * 100

        let sqftTxt = sqftArea + ' million square feet'
        let enTxt = this.metrics.stat_projects + ' projects encompassing over ' + sqftTxt + ' are applying WELL across ' + this.metrics.stat_countries + ' countries.'

        let zhTxt = '全球'+this.metrics.stat_countries+'个国家逾'+mArea +'万平方米'+this.metrics.stat_projects+'个项目在使用 WELL。'



        let fullTxt = this.$store.state.language == 'zh-cn' ? zhTxt : enTxt

        return fullTxt
      }
    }
  }
}
</script>
