<template>
  <div :class="BEM_B">
    <div class="container">
      <div class="row">
        <div :class="BEM_E('title')">
          <TitleBlock :blok="blok" />
        </div>
        <div :class="BEM_E('content')">
          <div v-if="blok.steps" :class="BEM_E('steps')">
            <b-tabs pills>
              <div v-for="(step, index) in blok.steps"
                v-bind:key="index"
                :class="BEM_E('step')">
                <b-tab :title="(index + 1).toString()">
                  <div :class="BEM_E('full-step')">
                    <div :class="BEM_E('step-contents')">
                      <h4 :class="BEM_E('step-title')">{{step.title}}</h4>
                      <h5 :class="BEM_E('step-caption')">{{step.caption}}</h5>
                      <div :class="BEM_E('step-content')">
                        <vue-markdown>{{step.content}}</vue-markdown>
                      </div>
                      <div v-if="step.button && step.button[0]" :class="BEM_E('step-link') + ' d-flex'">
                        <Btn :blok="step.button[0]" />
                      </div>
                    </div>
                    <img
                      v-if="step.image"
                      :class="BEM_E('img')"
                      :src="step.image" />
                  </div>
                </b-tab>
              </div>
            </b-tabs>
          </div>
        </div>
        <div v-if="blok.button && blok.button[0]" :class="BEM_E('link')">
          <Btn :blok="blok.button[0]" />
        </div>
      </div>
    </div>
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
      default: 'Process'
    },
    blok: Object
  },
}
</script>
