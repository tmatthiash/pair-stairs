<template>
    <div>{{ name }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PairStairPage",
  props: {
    name: {
      type: String,
      default: ''
    }
  }
});
</script>

<style lang="scss" scoped>

</style>