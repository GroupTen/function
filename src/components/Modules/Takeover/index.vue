<template>
  <div class="Banner">
    <div class="ASpot ASpot--content-left boxed boxed-blue60 color-white">
      <div class="ASpot__single-slide">
        <div class="ASpotSingle " style="background-image:url(//img2.storyblok.com/1400x700/smart/f/52232/1800x900/b99dceb927/about-top-3.png);background-size:cover;">
          <div class="container">
            <div class="row"></div>
          </div>
        </div>
      </div> 
      <div class="container">
        <div class="row">
          <div class="ASpot__text">
            <h1 class="ASpot__title">
              <span class="FancyText ">A new WELL experience is coming soon</span>
            </h1>
            <p class="ASpot__caption"><span class="FancyText ">
              The International WELL Building Institute™ (IWBI™) is leading the global movement to transform our buildings and communities in ways that help people thrive.
            </span></p>
          </div> 
          <div class="ASpot__contents"></div>
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
      default: 'Takeover'
    }
  }
}
</script>
