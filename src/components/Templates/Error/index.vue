<template>
  <section class="error-container container">
    <div class="error row">
      <div class="error__content">
        <h1>{{statusCode}}</h1>
        <h2>
          {{statusCode == 500 ? 'Something isn’t working right.'
          : statusCode == 403 ? 'You don’t have permission to be here.'
          : 'Something appears to have gone missing.'}}
        </h2>
        <p>
          {{statusCode == 500 ? 'Please bear with us. We’re working hard to fix the problem!'
          : statusCode == 403 ? 'Sorry, you don’t seem to have access to view this page! Please return once you’ve gathered the neccessary credentials.'
          : 'Don’t worry, we’ll get to the bottom of this mystery sooner or later!'}}
        </p>
        <a href="/" class="btn btn-base Btn Btn--outline">
          <span class="Btn__contents">
            <span class="Btn__label">Back to Home</span>
          </span>
        </a>
      </div>
      <div class="error__image">
        <img :src="'/errorPages/' + statusCode + '.png'" alt="">
      </div>
    </div>
  </section>
</template>

<script>
  
export default {
  props: ['error'],
  computed: {
    statusCode() {
      return (this.error && this.error.statusCode) || 500
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/src/assets/scss/_imports.scss";

$_transform: 80px;

.error-page {
  margin-bottom: $module-offset;
  @include media(">=desktop") {
    width: 100vw;
    height: 100vh;
    margin-bottom: 0;
    overflow: hidden;
  }
}

.error {
  @include flex(column-reverse, flex-start, center);
  flex-wrap: nowrap;
  margin: 0 40px;

  @include media(">=desktop") {
    @include flex(row, flex-start, center);    
    margin-left: $_transform / 2;
  }

  &__image {
    position: relative;
    z-index: -1;

    @include media(">=desktop") {
      transform: translateX(-$_transform);
    }

    img {
      @include media("<=tablet") {
        width: 110vw;        
      }
    }
  }

  h1 {
    font-family: $font-family-sans-serif;
    font-size: 80px;
    font-weight: $weight-blackout;

    @include media(">=desktop") {
      font-size: 250px;
    }
  }

  h2 {
    line-height: 1;
    letter-spacing: -0.9px;
  }

  p {
    max-width: 360px;
    color: $grey-mid;
    letter-spacing: 0;
    line-height: 23px;
  }

  .Btn {
    display: inline-block;
  }
}

</style>
