<template>
  <div :class="BEM_B">
    <CardList
      :mods="['4-up']"
      :startsWith="this.$store.state.language !== 'en' ? this.$store.state.language + '/team/' : 'team/'"
      :sortOrder="blok.sortBy || 'position:desc'"
      :blok="blok ? blok : []"
      :perPage="25"
      :cardImageDims="['300', '300']" />
  </div>
</template>

<script>
import BaseComponent from '~/src/components/Templates/BaseComponent'
import CardList from '~/src/components/Modules/CardList'

export default {
  extends: BaseComponent,
  components: { CardList },
  props: {
    name: {
      type: String,
      default: 'StaffCardList'
    },
    blok: Object
  }
}
</script>