<template>
  <div>
    <Navigation :blok="$store.state.settings.mainNav[0]"/>
    <div :class="BEM_B" v-scroll="handleScroll">
      <div :class="BEM_E('back-link') + ' container'" v-if="back !== false">
        <nuxt-link :to="'/resources/?type=' + this.name.toLowerCase() + 's'">← All {{this.name}}s</nuxt-link>
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
    }
  },
  head () {
    return {
      title: this.blok && this.blok.metadata ? this.blok.metadata.title : this.blok.title ? this.blok.title : 'A WELL Resource',
      titleTemplate: '%s | ' + this.name + 's | WELL v2',
      meta: [{ hid: 'description', name: 'description', 
      content: this.blok && this.blok.metadata ? this.blok.metadata.description : '' }],
      script: [
        { src: '//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5ccc5566758aaca2', 
          type: 'text/javascript', 
          async: true, 
          defer: true
        }
      ]
    }
  },
  data () {
    return {
      sidebarTop: 0,
      sidebarRight: 0
    }
  },
  mounted () {
    this.getSidebarPos()
  },
  methods: {
    getSidebarPos () {
      let sidebarRef = this.$refs.resourceSidebar
      let sidebarTop = sidebarRef.offsetTop + 60
      let sidebarRight = sidebarRef.getBoundingClientRect()

      this.sidebarTop = sidebarTop
      this.sidebarRight = sidebarRight
      return [sidebarTop, sidebarRight]
    },
    handleScroll (evt, el) {
      let clsName = el.className
      let scrollCls = ' Single--scrolled'
      let includesScroll = clsName.includes(scrollCls)

      // if scroll is greater than the top of sidebar and less than the bottom of the page
      if (window.scrollY > this.sidebarTop && (window.innerHeight + window.scrollY) < document.body.offsetHeight) {
        if (!includesScroll) {
          el.setAttribute('class', clsName + scrollCls)
          this.$refs.resourceSidebar.setAttribute('style', 'left:' + this.sidebarRight.left + 'px')
        }
      } else {
        if (includesScroll) {
          el.setAttribute('class', clsName.replace(scrollCls, ''))
          this.$refs.resourceSidebar.setAttribute('style', 'left: 0')
        }
      }
    }
  }
}
</script>
