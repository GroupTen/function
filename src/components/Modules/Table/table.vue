<template>
  <div :class="BEM_B">
    <div class="container">
      <div class="row">
        <div :class="BEM_E('wrapper')">
          <TitleBlock :blok="blok" />
          <div :class="BEM_E('table')">
            <div :class="BEM_E('table-row')"
              v-for="(row, index) in blok.tableRows" v-bind:key="'row' + index">
                <TableRow :blok="row" />
            </div>
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
import TableRow from './tableRow'

export default {
  extends: BaseComponent,
  components: { TableRow },
  props: {
    name: {
      type: String,
      default: 'Table'
    }
  }
}
</script>
