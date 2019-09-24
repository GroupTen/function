<template>
  <SingleComponent :name="this.name" :slug="slug" v-bind:blok="blok">
    <template slot="image" v-if="blok.image && blok.image[0]">
      <img :src="prepImg(blok.image[0].imageLocation, '1100x550/smart')">
    </template>
    <template slot="header">
      <div :class="BEM_E('meta')">
        <h6 :class="BEM_E('type')">{{this.name}}</h6>
        <h6 v-if="blok.dateTime"
          :class="BEM_E('date')">
          &nbsp;·&nbsp;
          <DateTimeZone :blok="blok" :disableTime="true" :disableTimezone="true" />
        </h6>
      </div>
      <h1 :class="BEM_E('title')" v-if="blok.title">{{blok.title}}</h1>
      <h3 :class="BEM_E('caption')" v-if="blok.caption">{{blok.caption}}</h3>
    </template>
    <template slot="content">
      <div v-html="markdown(blok.content)" />
    </template>
    <template slot="sidebar">
      <div :class="BEM_E('sidebar-field')" v-if="(blok.authors && blok.authors.length > 0) || (blok.guestAuthors && blok.guestAuthors.length > 0)">
        <h6>Author(s)</h6>
        <div :class="BEM_E('sidebar-author')"
          v-if="blok.authors.length > 0"
          v-for="(author, index) in authors" v-bind:key="'author' + index">
          <Card
            v-bind="{
              image: author.content.image[0],
              imageDims: [200, 200],
              path: translatedAuthor(author.full_slug),
              title: author.content.title,
              mods: ['profile', 'bordered']}" />
        </div>
        <div :class="BEM_E('sidebar-author')"
          v-if="blok.guestAuthors.length > 0"
          v-for="(guest, index) in blok.guestAuthors" v-bind:key="'guest' + index">
          <Card
            v-bind="{
              image: guest.image && guest.image.length > 0 ? guest.image[0] : null,
              imageDims: [200, 200],
              title: guest.title,
              caption: guest.caption,
              mods: ['profile', 'bordered']}" />
        </div>
      </div>
      <div :class="BEM_E('sidebar-field')" v-if="tagList && tagList.length > 0">
        <h6>Tags</h6>
        <TagList :tags="tagList" :shouldLink="false" />
      </div>
    </template>
    <template slot="additional">
      <FeaturedCardList contentType="articles" />
    </template>
  </SingleComponent>
</template>

<script>
import BaseComponent from '~/src/components/Templates/BaseComponent'
import SingleComponent from '~/src/components/Templates/SingleComponent'
import Card from '~/src/components/Elements/Card'
import TagList from '~/src/components/Elements/TagList'
import DateTimeZone from '~/src/components/Elements/DateTimeZone'
import FeaturedCardList from '~/src/components/Modules/FeaturedCardList'

export default {
  extends: BaseComponent,
  components: {
    SingleComponent,
    Card,
    TagList,
    DateTimeZone,
    FeaturedCardList
  },
  props: {
    name: {
      type: String,
      default: 'Article'
    },
    blok: Object,
    slug: String,
    tagList: Array
  },
  data () {
    return {
      authors: [],
      featuredArticles: ['']
    }
  },
  mounted: function () {
    this.loadAddlData(this.blok.authors, 'authors')
  },
  methods: {
    translatedAuthor(author) {
      let lang = this.$store.state.language + '/'

      return lang !== 'en/' ? lang + author : author
    }
  }
}
</script>
