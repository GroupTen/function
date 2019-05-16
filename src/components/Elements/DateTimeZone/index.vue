<template>
  <span v-if="this.blok">
    {{dateTimeZone}}
  </span>
</template>

<script>
import BaseComponent from '~/src/components/Templates/BaseComponent'
import moment from 'moment'

export default {
  extends: BaseComponent,
  props: {
    name: {
      type: String,
      default: 'DateTimeZone'
    },
    blok: [Object, String],
    disableTime: {
      type: Boolean,
      default: false
    },
    disableTimezone: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    startDate () {
      if(this.blok && this.blok.dateTime) {
        return moment(this.blok.dateTime).format('MMM D, YYYY' + (!this.disableTime ? ' [at] h:mm A' : ''))
      }
    },
    endDate () {
      if(this.blok && this.blok.endDateTime) {
        return moment(this.blok.endDateTime).format(' h:mm A')
      }
    },
    dateTimeZone () {
      let dtz = ''
      if (this.startDate) {
        dtz += this.startDate 
      }

      if (this.endDate && !this.disableTime) {
        dtz +=' - '
            + this.endDate
      }

      if (this.blok && this.blok.timezone && !this.disableTimezone) {
        dtz += ' ' + this.blok.timezone
      }

      return dtz
    }
  }
}
</script>
