<template>
  <div class="new-stair">
    <div class="new-stair-text">Create a new set of pair stairs!</div>
    <new-stair-options />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NewStairOptions from "./NewStairOptions/NewStairOptions.vue";

export default defineComponent({
  name: "NewStair",
  components: {
    NewStairOptions,
  },
});
</script>

<style lang="scss" scoped>
@import "../../colors.scss";

.new-stair {
  @include color-theme("background-color", "primary-background");
  @include color-theme("-webkit-box-shadow", "box-shadow-settings");
  @include color-theme("box-shadow", "box-shadow-settings");

  padding-top: 150px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.new-stair-text {
  font-weight: 600;
  font-size: 30px;
  margin-bottom: 20px;
}

@media only screen and (max-width: 725px) {
  .new-stair {
    padding-top: 15%;
  }
}
</style>
