<template>
  <div :class="BEM_B">
    <div class="container">
      <div class="row">
        <TitleBlock :blok="blok" />
        <div :class="BEM_E('select')" v-if="(blok.defaultTable && blok.discountTable) || blok.tables.length > 0">
          <vSelect v-if="blok.defaultTable && blok.discountTable" v-model="selected" :options="countries" label="name" />
          <vSelect v-else-if="blok.tables && blok.tables.length > 1" v-model="selected" :options="blok.tables" label="label" />
        </div>
        <div :class="BEM_E('table')">
          <Table v-if="tableData && tableData.length > 0" :blok="useTable" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseComponent from '~/src/components/Templates/BaseComponent'
import Table from './table'
import vSelect from 'vue-select'
import countryList from '~/static/json/countryList.json'

export default {
  extends: BaseComponent,
  components: {
    Table,
    vSelect
  },
  props: {
    name: {
      type: String,
      default: 'TableList'
    },
  },
  data () {
    return {
      selected: this.setDefaultTable(),
      tableData: null,
      translatedTableData: null
    }
  },
  mounted () {
    this.loadAddlData(this.selectedTable, 'tableData')
    this.translateTable()
  },
  methods: {
    setDefaultTable() {
      if(this.blok.defaultTable && this.blok.discountTable) {
        // TODO: we could i18n here:
        let tbl = { "name": "United States", "discount": false }
        return tbl
      }

      let tables = this.blok.tables
      let tableDefault = tables.filter(tbl => {
        return tbl.default == true
      })

      if(this.blok.tables.length > 0) {
        if(tableDefault && tableDefault.length > 0) {
          return tableDefault[0]
        } else {
          return this.blok.tables[0]
        }
      }
    },
    translateTable () {
      let lang = this.$store.state.language !== 'en' ? this.$store.state.language + '/' : ''

      if(this.tableData && this.tableData[0].full_slug) {
        let slug = this.tableData[0].full_slug
        return this.$storyapi.get(`cdn/stories/${lang + slug}`, {
          version: 'published'
        }).then((res) => {
          this.translatedTableData = res.data.story
          return res.data.story
        }).catch((res) => {
          if (!res.response) {
            console.error('no res', res)
          }
        })
      }
    }
  },
  computed: {
    countries () {
      if(this.blok.defaultTable && this.blok.discountTable) {
        return countryList
      }
      return null
    },
    selectedTable () {
      if(this.blok.defaultTable && this.blok.discountTable) {
        let tbl = this.selected.discount ? this.blok.discountTable : this.blok.defaultTable
        return tbl
      } else {
        if(this.selected) {
          return this.selected.table
        }
      }

      return null
    },
    useTable () {
      if(this.$store.state.language !== 'en' && this.translatedTableData) {
        return this.translatedTableData.content
      } else if(this.tableData && this.tableData.length > 0) {
        return this.tableData[0].content
      }
    }
  },
  watch: {
    selectedTable (neue, old) {
      if(neue !== old) {
        this.loadAddlData (neue, 'tableData')
      }
    },
    tableData (neue, old ) {
      if(neue !== old) {
        this.translateTable()
      }
    }
  },
}
</script>
