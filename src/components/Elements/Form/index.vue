<template>
  <div :class="BEM_B + ' container'">
    <div class="row">
      <TitleBlock
        v-if="blok && (blok.title || blok.caption)"
        :blok="blok" />
      <b-form
        v-if="blok && blok.fields"
        :id="blok.id"
        :inline="blok.inline"
        :name="blok.id"
        method="post"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        :action="successPage ? '/resources/forms/thank-you/?page=' + successPage : '/resources/forms/thank-you'">
        <b-form-group 
          v-for="(field, index) in blok.fields"
          v-bind:key="index"
          :label="field.label"
          :description="field.caption">
          <input type="hidden" name="form-name" :value="blok.id" />
          <div v-if="field.component === 'Form_Input'">
            <b-form-input
              v-if="field.type === 'email'"
              v-model="form[field.id]"
              :id="field.id"
              :name="field.id"
              type="email"
              :placeholder="field.placeholder"
              :value="getDefaultFieldVal(field.id, field.defaultValue)"
              :required="field.required" />
            <b-form-textarea
              v-else-if="field.type === 'textarea'"
              v-model="form[field.id]"
              :id="field.id"
              :name="field.id"
              :placeholder="field.placeholder"
              :rows="3"
              :value="getDefaultFieldVal(field.id, field.defaultValue)"
              :max-rows="6" />
            <b-form-checkbox
              v-else-if="field.type === 'checkbox'"
              v-model="form[field.id]"
              :id="field.id"
              :name="field.id"
              :text="field.text"
              :value="field.value"
              :required="field.required" />
            <b-form-input
              v-else-if="field.type === 'number'"
              v-model="form[field.id]"
              type="number"
              :value="getDefaultFieldVal(field.id, field.defaultValue)"
              :placeholder="field.placeholder"
              :required="field.required" />
            <b-form-input
              v-else-if="field.type === 'telephone'"
              v-model="form[field.id]"
              type="tel"
              :value="getDefaultFieldVal(field.id, field.defaultValue)"
              :placeholder="field.placeholder"
              :required="field.required" />
            <b-form-input
              v-else="field.type === 'text'"
              v-model="form[field.id]"
              :id="field.id"
              :name="field.id"
              type="text"
              :placeholder="field.placeholder"
              :value="getDefaultFieldVal(field.id, field.defaultValue)"
              :required="field.required" />
          </div>
          <div v-else-if="field.component === 'Form_Select'">
            <b-form-checkbox-group
              v-if="field.type === 'checks'"
              v-model="form[field.id]"
              :id="field.id"
              :name="field.id"
              :placeholder="field.placeholder"
              :value="field.defaultValue"
              :required="field.required">
              <b-form-checkbox
                v-for="(box, index) in field.options"
                v-bind:key="index"
                :value="box.value">
                {{box.text}}
              </b-form-checkbox>
            </b-form-checkbox-group>
            <b-form-radio-group
              v-else-if="field.type === 'radio'"
              v-model="form[field.id]"
              :id="field.id"
              :name="field.id"
              :value="field.defaultValue"
              :required="field.required">
              <b-form-radio
                v-for="(box, index) in field.options"
                v-bind:key="index"
                :value="box.value">
                {{box.text}}
              </b-form-radio>
            </b-form-radio-group>
            <b-form-select 
              v-else
              v-model="form[field.id]"
              :id="field.id"
              :name="field.id"
              :options="field.options">
                <template slot="first" v-if="field.placeholder">
                  <option value="">{{field.placeholder}}</option>
                </template>
              </b-form-select>
          </div>
        </b-form-group>
        <b-button type="submit" variant="primary">{{blok.submitLabel || 'Submit'}}</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import BaseComponent from '~/src/components/Templates/BaseComponent'

export default {
  extends: BaseComponent,
  props: {
    name: {
      type: String,
      default: 'Form'
    },
    blok: Object
  },
  methods: {
    getDefaultFieldVal (id, defaultVal) {
      if(this.activeParams && this.$route.query[id]) {
        return this.$route.query[id]
      } else {
        return defaultVal || null
      }
    }
  },
  data () {
    return {
      form: {id: this.blok ? this.blok.id : ''}
    }
  },

  computed: {
    activeParams () {
      return this.params === this.blok.id
    },
    params () {
      return this.$route.query
    },
    successPage () {
      if(this.blok.successPage && this.blok.successPage.length > 0) {

        let successBlok = JSON.stringify(this.blok.successPage[0])
        return encodeURIComponent(successBlok)
      }
    }
  }
}
</script>
