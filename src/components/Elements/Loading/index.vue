<template lang="html">
  <div class="loader" v-if="loading">
    <span></span>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: true
  }),
  mounted () {
    
  },
  methods: {
    start () {
      this.loading = true
    },
    finish () {
      this.loading = false
    }
  }
}
</script>