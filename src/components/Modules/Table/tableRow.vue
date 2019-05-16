<template>
  <div :class="BEM_B">
    <div :class="BEM_E('cell')"
      v-for="(cell, index) in blok.tableCells" v-bind:key="'cell' + index">
        <TableCell :blok="cell" />
    </div>
  </div>
</template>

<script>
import BaseComponent from '~/src/components/Templates/BaseComponent'
import TableCell from './tableCell'

export default {
  extends: BaseComponent,
  components: { TableCell },
  props: {
    name: {
      type: String,
      default: 'TableRow'
    }
  }
}
</script>
