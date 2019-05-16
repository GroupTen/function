<template>
  <div :class="BEM_B">
    <div class="container">
      <div class="row flex-column align-items-center">
        <div :class="BEM_E('title')">
          <TitleBlock :blok="blok" />
        </div>
        <div v-if="blok.questions" :class="BEM_E('items')">
          <div v-for="(item, index) in useList"
            v-bind:key="index"
            :class="BEM_E('item')">
            <a v-b-toggle="'faq-' + index + '-' + id" :class="BEM_E('item-toggle')">
              <span>{{item.content.title}}</span>
              <Vector name="icon/caret-down" width="13" />
            </a>
            <b-collapse :id="'faq-' + index + '-' + id" accordion="faqs" role="tabpanel">
              <div :class="BEM_E('item-content')">
                <div v-html="markdown(item.content.caption)" />
              </div>
            </b-collapse>
          </div>
        </div>
        <div v-if="blok.button && blok.button[0]" :class="BEM_E('link')">
          <Btn :blok="blok.button[0]" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseComponent from '~/src/components/Templates/BaseComponent'

export default {
  extends: BaseComponent,
  props: {
    name: {
      type: String,
      default: 'FaqList'
    },
    blok: Object
  },
  mounted () {
    this.loadAddlData(this.blok.questions, 'questions')
    this.translateQuestions()
  },
  data () {
    return {
      questions: [],
      translatedQuestions: [],
      id: Math.random()
    }
  },
  methods: {
    translateSingleQuestion (slug, lang) {
        return this.$storyapi.get(`cdn/stories/${lang + slug}`, {
          version: 'published'
        }).then((res) => {
          this.translatedQuestions.push(res.data.story)
          return res.data.story
        }).catch((res) => {
          if (!res.response) {
            console.error('no res', res)
          }
        })
    },
    translateQuestions () {
      let lang = this.$store.state.language !== 'en' ? this.$store.state.language + '/' : ''
      if(this.questions && this.questions.length > 0) {
        let slug = this.questions[0].full_slug
        for (var i = this.questions.length - 1; i >= 0; i--) {
          this.translateSingleQuestion(this.questions[i].full_slug, lang)
        }
      }
    }
  },
  computed: {
    useList () {
      if(this.$store.state.language !== 'en' && this.translatedQuestions) {
        return this.translatedQuestions
      } else if(this.questions && this.questions.length > 0) {
        return this.questions
      }
    }
  },
  watch: {
    questions (neue, old ) {
      if(neue !== old) {
        this.translateQuestions()
      }
    }
  }
}
</script>