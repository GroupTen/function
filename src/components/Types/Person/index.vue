<template>
  <SingleComponent :name="this.name" v-bind:blok="blok" :slug="slug" backLabel="← Back to Team" backLink="/about#team">
    <template slot="header">
      <div :class="BEM_E('header-image')" v-if="blok && blok.image[0]">
        <img :src="prepImg(blok.image? blok.image[0].imageLocation : null, '100x100/smart')">
      </div>
      <div :class="BEM_E('header-content')">
        <h6 :class="BEM_E('type')">Community</h6>
        <h2 :class="BEM_E('name')" v-if="blok.title" class="mb-0">{{blok.title}}</h2>
        <h3 :class="BEM_E('job')" v-if="blok.caption">{{blok.caption}}</h3>
      </div>
    </template>
    <template slot="image" v-if="blok.cover && blok.cover[0]">
      <img :src="prepImg(blok.cover[0].imageLocation, '1100x350/smart')">
    </template>
    <template slot="content">
      <div v-html="markdown(blok.bio)"></div>
    </template>
    <template slot="sidebar">
      <div
        :class="BEM_E('sidebar-field')"
        v-if="(blok.organization && blok.organization.length > 0) || blok.guestOrganization && blok.guestOrganization.length > 0">
        <h6>Organizations</h6>
        <div :class="BEM_E('sidebar-org')"
          v-if="blok.organization.length > 0"
          v-for="(org, index) in orgs" v-bind:key="'org' + index">
          <Card
            v-bind="{
              image: org.content.profileImage ? org.content.profileImage[0] : null,
              imageDims: [200, 200],
              title: org.content.name,
              mods: ['profile', 'bordered']}" />
        </div>
        <div :class="BEM_E('sidebar-org')"
          v-if="blok.guestOrganization.length > 0"
          v-for="(org, index) in blok.guestOrganization" v-bind:key="'guestOrg' + index">
          <Card
            v-bind="{
              image: org.image[0],
              imageDims: [200, 200],
              title: org.title,
              caption: org.caption,
              mods: ['profile', 'bordered']}" />
        </div>
      </div>
      <div :class="BEM_E('sidebar-field')" v-if="blok.location">
        <h6>Location</h6>
        <p v-html="blok.location" />
      </div>
      <div :class="BEM_E('sidebar-field')" v-if="blok.credentials && blok.credentials.length > 0">
        <h6>Credentials</h6>
        <div :class="BEM_E('credentials')" v-if="blok.credentials">
          <TagList :tags="blok.credentials" :shouldLink="false" />
        </div>
      </div>
      <div :class="[BEM_E('sidebar-field'), BEM_E('favorite-tech')]" v-if="blok.favoriteTech">
        <h6>Favorite Technology</h6>
        <p v-html="blok.favoriteTech" />
      </div>
      <div :class="[BEM_E('sidebar-field'), BEM_E('interests')]" v-if="blok.interests">
        <h6>Hobbies & Activities</h6>
        <div v-html="markdown(blok.interests)"></div>
      </div>
      <div v-if="blok.socialLinks">
        <h6>Connect</h6>
        <ul :class="[BEM_E('sidebar-field'), BEM_E('social-links')]">
          <li v-for="(link, index) in blok.socialLinks" v-bind:key="index">
            <a :href="link.url" target="_blank" :class="BEM_E('social-link')">
              <Vector :name="'social/' + link.name" />
            </a>
          </li>
        </ul>
      </div>
    </template>
  </SingleComponent>
</template>
<script>
import BaseComponent from '~/src/components/Templates/BaseComponent'
import SingleComponent from '~/src/components/Templates/SingleComponent'
import Card from '~/src/components/Elements/Card'
import TagList from '~/src/components/Elements/TagList'

export default {
  extends: BaseComponent,
  components: {
    SingleComponent,
    Card,
    TagList
  },
  props: {
    name: {
      type: String,
      default: 'Person'
    },
    blok: Object,
    slug: String
  },
  data () {
    return {
      orgs: []
    }
  },
  mounted: function () {
    this.loadAddlData(this.blok.organization, 'orgs')
  },
}
</script>
