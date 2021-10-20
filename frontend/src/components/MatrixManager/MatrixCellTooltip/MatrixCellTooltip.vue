<template>
  <div v-if="mouseOverId === userId" class="matrix-cell-tooltip">
    Oldest Pair is: {{ oldestUserName }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MatrixCellTooltip",
  props: ["oldestUserName", "mouseOverId", "userId"],
});
</script>

<style lang="scss" scoped>
@import "../../../colors.scss";

.matrix-cell-tooltip {
  @include color-theme("border-color", "primary-accent");


  position: absolute;
  padding: 6px;
  border-radius: 8px;
  background-color: white;
  margin-top: 30px;
  border: 2px solid;
}
</style>