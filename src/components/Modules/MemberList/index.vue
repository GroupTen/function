<template>
  <div :class="BEM_B">
    <div class="container">
      <div class="row">
          <TitleBlock :blok="blok" />
          <ul :class="BEM_E('items')" v-if="members && filteredMembers">
            <li v-for="(member, index) in filteredMembers" :class="BEM_E('item') + ' ' + getFileExt(member.profile_pic)" v-bind:key="index">
              <a :href="validateUrl(member.website)" target="_blank">
                <span v-if="member.profile_pic" :class="BEM_E('image')">
                  <img :src="member.profile_pic" alt="">
                </span>
              </a>
            </li>
          </ul>
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
      default: 'MemberList'
    },
    blok: Object
  },
  data () {
    return {
      members: null,
    }
  },
  mounted () {
    this.fetchMembers()
  },
  methods: {
    fetchMembers () {
      return axios.get('https://v2-api.wellcertified.com/api/membership/org/list')
      .then((res) => {
        this['members'] = res.data
        return res.data
      }).catch((res) => {
        if (!res.response) {
          console.error('no res', res)
        }
      })
    },
    validateUrl(url) {
      if(url && url.startsWith('www')) {
        return 'http://' + url
      }

      return url
    }
  },
  computed: {
    filteredMembers () {
      if(this.members) {
        if(this.blok.type == 'Cornerstone' || this.blok.type == 'Keystone') {
          let members = this.members.filter(member => {
            return member.label == this.blok.type
          })
          return members
        }

        return this.members
      }
    }
  }
}
</script>
