export default function ({ app, route, store, isDev }) {
  let version = route.query._storyblok || isDev ? 'draft' : 'published'
  const langs = ['en', 'zh-cn']

  let urlLang = route.fullPath.split('/')[1]
  let hasLang = langs.indexOf(urlLang) !== -1
  let language = hasLang ? urlLang : 'en'

  if (process.server) {
    store.commit('setCacheVersion', app.$storyapi.cacheVersion)
  }

  if ((!store.state.settings._uid || language !== store.state.language) && store.state.language === '') {
    store.commit('setLanguage', language)

    return store.dispatch('loadSettings', {version: version, language: language})
  }
}
