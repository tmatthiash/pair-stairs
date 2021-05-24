<template>
  <div class="home-page">
    <div class="home-page-banner">
      Welcome to Pair Stairs dot something, you ready to pair up some stairs??????
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomePage"
});
</script>

<style lang="scss">
@import "../colors.scss";

.home-page {    
    @include color-theme('background-color', 'primary-background');

    padding-top: 150px;
    height: 100%;
    width: 100%;
}

.home-page-banner {
  @include color-theme('color', 'primary-accent');

  width: 100%;
  margin-top: 150px;
}
</style>
