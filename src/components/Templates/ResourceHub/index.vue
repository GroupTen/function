<template>
  <div>
    <Navigation :blok="$store.state.settings.mainNav[0]"/>
    <div :class="listView ? BEM_B + 'list' : BEM_B + 'grid'">
<!--       <div v-if="this.posts === null" :class="BEM_E('loading')">
        <div :class="BEM_E('loading-spinner')"></div>
      </div> -->
      <div :class="BEM_E('refined-list') + ' row'">
        <div :class="BEM_E(!showRefine ? 'refine--hidden' : 'refine')">
          <Refine
            :posts="posts ? posts : null"
            v-bind:queryFilters="queryFilters"
            v-bind:querySearch="querySearch"
            v-bind:queryType="contentType"
            v-bind:queryPage="queryPage" />
        </div>
        <div :class="BEM_E('results')">
          <div :class="BEM_E('result-display')">
            <div class="container">
              <div class="row">
                <label class="Refine__filter-label">
                  Order by:
                  <b-form-select v-model="dataSort">
                    <option :value="null" disabled>Order Results by:</option>
                    <option value="content.title:asc">A-Z</option>
                    <option value="content.title:desc">Z-A</option>
                    <option value="content.dateTime:asc">Oldest</option>
                    <option value="content.dateTime:desc">Newest</option>
                  </b-form-select>
                </label>

                <label class="Refine__filter-label">
                  Display:
                  <a @click="() => {this.listView = false}"
                    :class="!this.listView ? 'active' : ''">
                    <Vector name="icon/gridView" />
                  </a>
                  <a @click="() => {this.listView = true}"
                    :class="this.listView ? 'active' : ''">
                    <Vector name="icon/listView" />
                  </a>
                </label>
              </div>
            </div>
          </div>
          <div v-if="!appliedFilters && !appliedSearch && featuredPosts && featuredPosts.length > 0" :class="BEM_E('featured')">
            <CardList 
              :items="featuredPosts"
              :cardMods="listView ? ['list'] : null"
              :mods="listView ? ['feature', 'feature-list'] : ['feature']"
              :collapses="contentType === 'faqs' ? true : false" />
          </div>
          <CardList 
            v-if="posts && posts.length > 0 && nonfeaturedPosts"
            :items="appliedFilters || appliedSearch ? scrubbedPosts : nonfeaturedPosts"
            :cardMods="listView ? ['bordered', 'list', 'full-width', contentType === 'faqs' ? 'no-image' : ''] : ['bordered', contentType === 'faqs' ? 'no-image' : '']"
            :mods="listView ? ['full'] : ['3-up']"
            :collapses="contentType === 'faqs' ? true : false" />
          <div :class="this.totalPosts <= this.perPage ? BEM_E('pagination') + ' hide' : BEM_E('pagination')">
            <b-pagination
              size="sm"
              v-model="currentPage"
              align="center"
              :total-rows="this.totalPosts"
              :per-page="this.perPage" />
          </div>
        </div>
      </div>
    </div>
    <Footer :blok="$store.state.settings.mainFooter[0]" />
  </div>
</template>

<script>
import BaseComponent from '~/src/components/Templates/BaseComponent'
import CardList from '~/src/components/Modules/CardList'
import Refine from './refine'
import Navigation from '~/src/components/Modules/Navigation'
import Footer from '~/src/components/Modules/Footer'

export default {
  extends: BaseComponent,
  components: {
    CardList,
    Refine,
    Navigation,
    Footer
  },
  props: {
    name: {
      type: String,
      default: 'ResourceHub'
    },
    type: String,
    contentType: String,
    queryFilters: String,
    querySearch: String,
    queryType: String,
    querySort: String,
    queryPage: [Number, String],
    viewType: String
  },
  data () {
    return {
      posts: null,
      featuredPosts: null,
      currentPage: parseInt(this.queryPage) || 1,
      totalPosts: 1,
      perPage: 24,
      showRefine: false,
      listView: this.viewType == 'list',
      dataSort: this.querySort || 'content.dateTime:desc',
      dataSearch: this.querySearch || ''
    }
  },
  created () {
    this.fetchFeatured()
    this.fetchPosts()
  },
  methods: {
    fetchFeatured: function () {
      return this.$storyapi.get('cdn/stories/', {
        version: 'published',
        starts_with: this.$store.state.language !== 'en' ? this.$store.state.language + '/' + this.contentType : this.contentType,
        cv: this.$store.state.cacheVersion,
        per_page: 3,
        filter_query: {"featured":{"in": true }}
      },
      ).then((res) => {
        this.featuredPosts = res.data.stories
        return res.data.story
      }).catch((res) => {
        if (!res.response) {
          console.error('no res', res)
        }
      })
    },
    fetchPosts () {
      return this.$storyapi.get('cdn/stories/', {
        version: 'published',
        starts_with: this.$store.state.language !== 'en' ? this.$store.state.language + '/' + this.contentType : this.contentType,
        cv: this.$store.state.cacheVersion,
        sort_by: this.dataSort,
        search_term: this.dataSearch,
        page: this.currentPage,
        per_page: this.perPage,
        with_tag: this.filterTags
      },
      ).then((res) => {
        this.totalPosts = res.total
        this.posts = res.data.stories

        return res.data.story
      }).catch((res) => {
        if (!res.response) {
          console.error('no res', res)
        }
      })
    },
  },
  computed: {
    scrubbedPosts () {
      if (this.posts !== null) {
        return this.posts.filter(function (post) {
          if (post && post.content.private !== true) {
            return true
          }
        })
      }

      return []
    },
    nonfeaturedPosts () {
      if (this.posts !== null) {
        return this.posts.filter(function (post) {
          if (post && post.content.featured === false && post.content.private !== true) {
            return true
          }
        })
      }

      return []
    },

    filterTags () {
      if(this.queryFilters) {
        let tags = this.queryFilters.replace('\\', ',').toString()

        return tags
      }

      return ''
    },
    appliedFilters () {
      if (this.queryFilters) {
        return this.queryFilters !== ''
      }

      return false
    },
    appliedSearch () {
      if (this.querySearch) {
        return this.dataSearch !== ''
      }

      return false
    }
  },
  watch: {
    contentType () {
      this.fetchPosts()
      this.fetchFeatured()
    },
    currentPage () {
      this.fetchPosts()
    },
    queryFilters () {
      this.fetchPosts()
    },
    querySearch (neue) {
      this.dataSearch = neue
      this.fetchPosts()
    },
    dataSort (neue) {
      this.fetchPosts()
    }
  }
}
</script>
