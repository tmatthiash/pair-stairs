<template>
  <div class="home-page">
    <div class="home-page-banner">
      Track your pair programming dates to make pairing more effective. Log the
      dates that team members pair together to help you plan each day's pairs.
      (pre-alpha website version)
    </div>
    <div class="home-page-button-holder">
      <router-link class="home-page-button-holder-button" to="/newStair"
        >Create a new pair tracker</router-link
      >
      <router-link class="home-page-button-holder-button" to="/joinmatrix"
        >Join an existing pair tracker</router-link
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomePage",
});
</script>

<style lang="scss" scoped>
@import "../colors.scss";

.home-page {
  @include color-theme("background-color", "primary-background");
  @include color-theme("-webkit-box-shadow", "box-shadow-settings");
  @include color-theme("box-shadow", "box-shadow-settings");

  height: 100%;
  width: 100%;
}

.home-page-banner {
  @include color-theme("color", "primary-accent");

  font-size: 36px;
  width: 100%;
  margin-top: 150px;
}

.home-page-button-holder {
  margin-top: 16px;
}

.home-page-button-holder-button {
  @include color-theme("background-color", "primary-accent");
  @include color-theme("border-color", "primary-border");
  @include color-theme("color", "primary-accent-text");

  margin: 0 16px;
  font-size: 30px;
  padding: 4px 16px;
  text-decoration: none;
  border: 1px solid;
  border-radius: 5px;
}

@media only screen and (max-width: 725px) {
  .home-page-banner {
    font-size: 22px;
  }
  .home-page-button-holder {
    display: flex;
    flex-direction: column;
  }
  .home-page-button-holder-button {
    margin-bottom: 30px;
  }
}
</style>
