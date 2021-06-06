<template>
  <div class="matrix-cell">{{ getPairSet }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { PairSet } from "../../../types/PairSet";

export default defineComponent({
  name: "MatrixCell",
  props: ["user1Id", "user2Id"],
  computed: {
    getPairSet(): unknown {
      const pairList: PairSet[] = this.$store.state.pairSetList;
      const foundPairSet = pairList.filter((set) => {
        return (
          set.userIdList.includes(this.user1Id) &&
          set.userIdList.includes(this.user2Id)
        );
      });
      return foundPairSet[0]?.date || "N/A";
    },
  },
});
</script>


<style lang="scss" scoped>
@import "../../../colors.scss";

.matrix-cell {
  @include color-theme("background-color", "secondary-background");
  @include color-theme("border-color", "primary-accent");

  width: 100px;
  border: 1px solid;
}
</style>
