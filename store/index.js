import Vuex from 'vuex'
import axios from 'axios'

const createStore = () => {
  return new Vuex.Store({
    state: {
      cacheVersion: '',
      language: '',
      settings: {
        mainNav: [],
        mainFooter: []
      }
    },
    mutations: {
      setSettings (state, settings) {
        state.settings = settings
      },
      setCacheVersion (state, version) {
        state.cacheVersion = version
      },
      setLanguage (state, language) {
        state.language = language
      }
    },
    actions: {
      loadCacheVersion ({ commit }) {
        return this.$storyapi.get(`cdn/spaces/ringo`).then((res) => {
          commit('setCacheVersion', res.data.space.version)
        })
      },
      loadSettings ({ commit }, context) {
        let lang = context.language !== 'en' ? context.language + '/' : ''
        
        return this.$storyapi.get(`cdn/stories/${lang}settings`, {
          version: context.version
        }).then((res) => {
          commit('setSettings', res.data.story.content)
        })
      }
    }
  })
}

export default createStore
