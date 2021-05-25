<template>
    <div class="new-stair">
      <div class ="new-stair-text">
        Create a new pair stair, start by picking a name.
      </div>
      <new-stair-options />
    </div>
    
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NewStairOptions from "./NewStairOptions/NewStairOptions.vue"

export default defineComponent({
  name: "NewStair"
  ,
  components: {
    NewStairOptions
  }
});
</script>

<style lang="scss" scoped>
@import "../../colors.scss";

.new-stair {
    @include color-theme('background-color', 'primary-background');

    padding-top: 150px;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
}

.new-stair-text {
    font-size: 24px;
}
</style>