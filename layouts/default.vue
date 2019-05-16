<template>
  <nuxt/>
</template>

<script>
export default {
  head () {
    return {
      script: [
        { src: '/js/swiftype.js', defer: true }
      ]
    }
  }
}
</script>