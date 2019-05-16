<template>
  <div :class="BEM_B">
    <div class="container">
      <div :class="BEM_E('title')" v-if="blok.title || blok.caption || blok.titleBlock">
        <TitleBlock :blok="blok" />
      </div>
      <div v-if="blok.button && blok.button[0]" :class="BEM_E('link')">
        <Btn :blok="blok.button[0]" />
      </div>
      <ol v-if="blok.steps" :class="BEM_E('steps')">
        <li v-for="(item, index) in blok.steps"
          v-bind:key="index"
          :class="BEM_E('step') + ' ' + item.classes">
          <div :class="BEM_E('step-number')">{{index + 1}}</div>
          <div :class="BEM_E('step-details') + ' col-lg-10'">
            <template v-if="item.component == 'RichText'">
              <RichText :blok="item" />
            </template>
            <div v-else class="d-flex">
              <div :class="BEM_E('step-description') + (item.image ? ' col-md-6 col-lg-6' : '')">
                <h2 v-if="item.title" :class="BEM_E('step-title')">{{item.title}}</h2>
                <div v-if="item.caption" :class="BEM_E('step-caption')">
                  <h5>{{item.caption}}</h5>
                </div>
                <div v-if="item.content" :class="BEM_E('step-content')">
                  <div v-html="markdown(item.content)" />
                </div>
                <div v-if="blok && item.button && item.button[0]" :class="BEM_E('link')">
                  <Btn :blok="item.button[0]" />
                </div>
              </div>
              <div v-if="item.image" :class="BEM_E('step-illustration') + ' offset-md-1 col-md-5 offset-lg-1 col-lg-5'">
                <img :src="item.image" alt="">
              </div>
            </div>
          </div>
        </li>
      </ol>
    </div>
  </div>
</div>

</template>



<script>
import BaseComponent from '~/src/components/Templates/BaseComponent'
import RichText from '~/src/components/Modules/RichText'

export default {
  extends: BaseComponent,
  components: { RichText },
  props: {
    name: {
      type: String,
      default: 'Timeline'
    }
  }
}
</script>
