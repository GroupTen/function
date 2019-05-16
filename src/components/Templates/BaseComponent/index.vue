<template>
  <div :class="BEM_B">
  </div>
</template>

<script>
import BEM from '~/mixins/bem.js'
import Vector from '~/src/components/Elements/Vector'
import FancyText from '~/src/components/Elements/FancyText'
import Btn from '~/src/components/Elements/Btn'
import Img from '~/src/components/Elements/Image'
import TitleBlock from '~/src/components/Modules/TitleBlock'
const marked = require('marked')

export default {
  mixins: [BEM],
  props: {
    name: {
      type: String,
      default: 'Base'
    },
    blok: Object,
    mods: Array,
    cls: Array
  },
  components: {
    Vector,
    FancyText,
    Btn,
    Img,
    TitleBlock
  },
  data () {
    return {
      BASE_URL: process.env.baseUrl,
      PROD_URL: process.env.prodUrl,
      MAIN_URL: process.env.mainUrl,
      RESOURCES_URL: process.env.resourcesUrl
    }
  },
  methods: {
    handleScroll (evt, el) {
      if (el && window.scrollY > 50) {
        el.setAttribute(
          'style',
          'opacity: 1; transform: translate3d(0, -10px, 0)'
        )
        return window.scrollY > 100
      }
    },
    BEM_E: function(el) {
      return BEM.methods.ElCls(this.name, el)
    },
    BEM_M: function(mod) {
      return BEM.methods.ModCls(this.name, mod)
    },

    getFileExt (path) {
      if (path) {
        // return file extension by splitting name at '.' and 'pop'ping the last index
        return path.split('.').pop()
      }
    },
    canImgResize(image) {
      let imageExt = this.getFileExt(image)
      let supportedTypes = ['jpg', 'jpeg', 'png', 'gif', 'tif']

      if(supportedTypes.includes(imageExt)) {
        return true
      }
    },  
    prepImg(image, option) {
      const imageService = '//img2.storyblok.com/'
      const imgSearch = '//a.storyblok.com'
      let hasString = image && image.indexOf(imgSearch) > -1
      let resizableImg = this.canImgResize(image)

      if (hasString && resizableImg) {
        let path = image.replace(imgSearch, '')
        return imageService + option + path
      }

      return image
    },
    buildFancyText (txt) {
      if (typeof txt === 'string') {
        return txt
      }

      if (txt[0]) {
        return txt[0].customText !== '' ? txt[0].customText : txt[0].existingText
      }

      return ''
    },
    getDate: function (dateStr) {
      let options = { year: 'numeric', month: 'short', day: 'numeric' }
      let months = ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      let date = new Date(dateStr).toLocaleDateString('en-US', options)

      return date
    },
    getTime: function (str) {
      let date = new Date(str).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})

      return date
    },
    loadAddlData (stories, dataField) {
      let filteredStories = []

      if (stories && Array.isArray(stories)) {
          filteredStories = stories.filter((value, index, arr) => {
          return typeof value === 'string'
        })
      }

      let uuids = filteredStories && filteredStories.length > 0 ? filteredStories.toString() : stories
      let lang = this.$store.state.language || ''

      return this.$storyapi.get(`cdn/stories/`, {
        version: 'published',
        cv: this.$store.state.cacheVersion,
        by_uuids: uuids,
        find_by: 'uuid',
      }).then((res) => {
        if (dataField) {
          this[dataField] = res.data.stories
        }
        return res.data.stories
      }).catch((res) => {
        if (!res.response) {
          console.error('no res', res)
        }
      })
    },
    markdown(txt) {
      marked.setOptions({
        breaks: true,
      })
      if(txt) {
        return marked(txt)
      }
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

      if (this.cls && this.cls !== []) {
        arr = this.cls
      }

      if (this.blok && this.blok.classes) {
        arr.push(this.blok.classes.split(','))
      }

      return arr
    },
    BEM_B () {
      return BEM.methods.BlockCls(this.name, this.computeMods, this.computeCls)
    }
  }
}
</script>
