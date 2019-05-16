<template>
  <div :class="BEM_B">
    <div class="Refine__search">
      <input
       type="text"
       ref="search"
       placeholder="Search title.."
       v-model.lazy="search"
       class="Refine__search-input" />
      <span class="Refine__search-go">
        <Vector name="icon/search" width="20" height="20" />
      </span>
    </div>
    <div class="Refine__filter-bar container">
      <div class="Refine__filters">
        <div class="Refine__filter-type">
          <h6 class="Refine__filter-label">Filter by</h6>
          <div class="Refine__active-type">
            <ul class="Refine__active-filters">
              <li class="Refine__active-filter">
                <span>{{queryType}}</span>
              </li>
            </ul>
            <b-dropdown id="type" size="sm" class="Refine__dropdown">
              <a @click="pushQueryParams('tools')">Tools</a>
              <a @click="pushQueryParams('articles')">Articles</a>
              <a @click="pushQueryParams('events')">Events</a>
              <a @click="pushQueryParams('faqs')">FAQs</a>
              <a @click="pushQueryParams('webcasts')">Webcasts</a>
            </b-dropdown>
          </div>
        </div>
        <ul class="Refine__additional-filters">
          <li v-for="(value, key) in this.groupedFilters" class="Refine__filter-list" v-bind:key="key">
            <h6 class="Refine__filter-label" v-b-toggle="key">{{value[0].name.split('/')[0]}}</h6>
            <b-collapse :id="key" visible>
                <div 
                  v-for="(val, index) in value" 
                  v-bind:key="index" 
                  class="Refine__filter-check-wrapper">
                  <b-form-checkbox
                    :id="val.name"
                    class="Refine__filter-check"
                    :value="val.name"
                    v-model="checkedFilters"
                    v-if="index < 3"
                    plain>
                    <span>{{val.name.split('/').length > 1 ? val.name.split('/')[1] : val.name}}</span>
                  </b-form-checkbox>
                </div>
                <div v-if="value && value.length > 2">
                  <h6 v-b-toggle="key + '-more'" class="Refine__filter-label Refine__filter-label--more">See More...</h6>
                  <b-collapse :id="key + '-more'">
                    <div 
                      v-for="(val, index) in value" 
                      class="Refine__filter-check-wrapper"
                      v-bind:key="index + '-more'">
                      <b-form-checkbox
                        :id="val.name"
                        class="Refine__filter-check"
                        :value="val.name"
                        v-model="checkedFilters"
                        v-if="index >= 3"
                        plain>
                        <span>{{val.name.split('/').length > 1 ? val.name.split('/')[1] : val.name}}</span>
                      </b-form-checkbox>
                    </div>
                  </b-collapse>
                </div>
            </b-collapse>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Vector from '~/src/components/Elements/Vector'

export default {
  components: {
    'Vector': Vector
  },
  props: {
    name: {
      type: String,
      default: 'Refine'
    },
    posts: Array,
    queryFilters: String,
    querySearch: String,
    queryType: String,
    mods: Array
  },
  mounted () {
    this.loadTags()
  },
  data () {
    return {
      checkedFilters: this.queryFilters ? this.buildQueryFilters() : [],
      search: this.querySearch || '',
      loadedFilters: [],
      tags: []
    }
  },

  methods: {
    loadTags () {
      return this.$storyapi.get('cdn/tags/', {
        version: 'published',
        starts_with: 'resources/' + this.queryType,
        cv: this.$store.state.cacheVersion,
        sort_by: 'content.title:asc'
      },
      ).then((res) => {
        this.tags = res.data.tags
      }).catch((res) => {
        if (!res.response) {
          console.error('no res', res)
        }
      })
    },

    removeFilter (filter) {
      var index = this.checkedFilters.indexOf(filter)
      if (index !== -1) {
        this.checkedFilters.splice(index, 1)
      }
    },

    pushQueryParams (type, tags, search) {
      let newPath = `../resources/?type=`

      if (type && type !== null) {
        newPath += type
      } else {
        newPath += this.queryType
      }

      if (tags && tags !== null) {
        // loop through tags and += them to newpath using \ divider
        let t = '&tags='
        for (let i = 0; i < tags.length; i++) {
          t += tags[i]
          t += (tags.length !== (i + 1)) ? '\\' : ''
        }

        newPath += t
      }

      if (search && search !== null) {
        newPath += `&search=${search}`
      }

      this.$router.push({ path: newPath })
    },

    buildQueryFilters () {
      return this.queryFilters.split('\\')
    }
  },

  computed: {
    BEM_B () {
      let cls = `${this.name}`
      if (this.mods) {
        for (var mod of this.mods) {
          cls += ` ${this.name}--${mod}`
        }
      }
      return cls
    },

    countSortedTags () {
      // sort tags by how many times they're used
      
      let tags = this.tags
      tags.sort(function(a, b) {
        return b.taggings_count - a.taggings_count
      })

      return tags
    },

    groupedFilters () {
      let grouped = {}
      let tags = this.countSortedTags
      

      // loop through all filters
      this.tags.forEach(function(tag) {
        let tagSplit = tag.name.split('/')

        // ignore if category already exists (e.g. grouped.topics)
        if (grouped[tagSplit[0]] && tagSplit.length <= 1) {

        // filter into group
        } else {
          let filteredFilters = tags.filter(function(filt) {
            let filtSplit = filt.name.split('/')

            return filtSplit[0] === tagSplit[0]
          })

          grouped[tagSplit[0]] = filteredFilters
        }
      })

      return grouped
    },

    searchedList () {
      if (this.filteredPosts) {
        return this.filteredPosts.filter(post => {
          return post.content.title.toLowerCase().includes(this.search.toLowerCase())
        })
      }
    }
  },

  watch: {
    checkedFilters (newFilters, old) {
      this.pushQueryParams(this.queryType, newFilters.length > 0 ? newFilters : null, this.search ? this.search : null)
    },
    search (newSearch) {
      this.pushQueryParams(this.queryType, this.checkedFilters, newSearch !== '' ? newSearch : null)
    },
    queryFilters (newFilters, oldFilters) {
      this.checkedFilters = newFilters ? this.buildQueryFilters() : []
    },
    querySearch (newSearch) {
      this.search = newSearch ? newSearch : ''
    },
    queryType (newType) {
      this.loadTags()
    }
  }
}
</script>