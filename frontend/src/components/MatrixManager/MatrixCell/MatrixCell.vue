<template>
  <div
    class="matrix-cell"
    @click="toggleSelected"
    v-bind:class="{ 'matrix-cell__selected': isPairSelected }"
  >
    {{ getPairSet }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { PairSet } from "../../../types/PairSet";
import { MutationTypes } from "../../../store/MutationTypes";

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
    isPairSelected(): boolean {
      const { selectedPairs } = this.$store.state;
      const foundPairMatch = selectedPairs.filter((pair: string[]) => {
        return pair.includes(this.user1Id) && pair.includes(this.user2Id);
      });
      return foundPairMatch.length > 0 ? true : false;
    },
    // getPairDate() {
    //   const { selectedPairs } = this.$store.state;
    //   const foundPairMatch = selectedPairs.filter((pair: string[]) => {
    //     return pair.includes(this.user1Id) && pair.includes(this.user2Id);
    //   });
    //   return selectedPairs[0].date ? selectedPairs[0].date : "--"
    // },
  },
  methods: {
    toggleSelected() {
      const { selectedPairs } = this.$store.state;
      let newSelectedPairList = [];
      if (this.isPairSelected) {
        newSelectedPairList = selectedPairs.filter((pair: string[]) => {
          return !(pair.includes(this.user1Id) && pair.includes(this.user2Id));
        });
      } else {
        console.log("ids ", this.user1Id, this.user2Id);
        newSelectedPairList = [...selectedPairs, [this.user1Id, this.user2Id]];
      }
      this.$store.commit(
        MutationTypes.SET_SELECTED_PAIR_LIST,
        newSelectedPairList
      );
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
.matrix-cell__selected {
  animation: matrix-cell-pulse 1.5s infinite;
}

@keyframes matrix-cell-pulse {
  0% {
    -moz-box-shadow: inset 0px 0px 8px 0px #24ff0d;
    box-shadow: inset 0px 0px 8px 0px #24ff0d;
  }
  33% {
    -moz-box-shadow: inset 0px 0px 8px 1.5px #24ff0d;
    box-shadow: inset 0px 0px 8px 1.5px #24ff0d;
  }
  66% {
    -moz-box-shadow: inset 0px 0px 8px 3px #24ff0d;
    box-shadow: inset 0px 0px 8px 3px #24ff0d;
  }
  100% {
    -moz-box-shadow: inset 0px 0px 8px 1.5px #24ff0d;
    box-shadow: inset 0px 0px 8px 1.5px #24ff0d;
  }
}
@-webkit-keyframes matrix-cell-pulse {
  0% {
    -webkit-box-shadow: inset 0px 0px 8px 0px #24ff0d;
  }
  33% {
    -webkit-box-shadow: inset 0px 0px 8px 1.5px #24ff0d;
  }
  66% {
    -webkit-box-shadow: inset 0px 0px 8px 3px #24ff0d;
  }
  100% {
    -webkit-box-shadow: inset 0px 0px 8px 1.5px #24ff0d;
  }
}
</style>
