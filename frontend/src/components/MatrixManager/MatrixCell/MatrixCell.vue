<template>
  <div>
    <div
      v-if="!isInEditMode"
      class="matrix-cell"
      v-bind:style="{
        backgroundColor: `rgba(255, 0, 0, ${getOpacityPercentage}`,
      }"
      @click="toggleSelected"
      v-bind:class="{ 'matrix-cell__selected': isPairSelected }"
    >
      <div>{{ getPairSetDate || "--" }}</div>
    </div>
    <styled-date-picker
      @matrixCellEdited="matrixCellEdited"
      v-if="isInEditMode"
      :dateValue="getPairSetDate"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { PairSet } from "../../../types/PairSet";
import { MutationTypes } from "../../../store/MutationTypes";
import axios from "axios";
import io from "socket.io-client";
import StyledDatePicker from "../../StyledDatePicker/StyledDatePicker.vue";

export default defineComponent({
  name: "MatrixCell",
  props: ["user1Id", "user2Id", "isInEditMode"],
  components: { StyledDatePicker },
  data() {
    return {
      socket: io(
        `${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}`
      ),
    };
  },
  computed: {
    getPairSetDate(): Date | undefined {
      const pairList: PairSet[] = this.$store.state.pairSetList;
      const foundPairSet = pairList.filter((set) => {
        return (
          set.userIdList.includes(this.user1Id) &&
          set.userIdList.includes(this.user2Id)
        );
      });
      return foundPairSet[0]?.date;
    },
    isPairSelected(): boolean {
      const { selectedPairs } = this.$store.state;
      const foundPairMatch = selectedPairs.filter((pair: string[]) => {
        return pair.includes(this.user1Id) && pair.includes(this.user2Id);
      });
      return foundPairMatch.length > 0 ? true : false;
    },
    getPairSetList(): PairSet[] {
      return this.$store.state.pairSetList;
    },
    getOpacityPercentage(): number {
      const dateList = this.getPairSetList.map((pairSet) => {
        return new Date(pairSet.date).getTime();
      });
      const maxDate = Math.max(...dateList);
      const minDate = Math.min(...dateList);
      const minMaxDateDiff = maxDate - minDate;

      if (!this.getPairSetDate) {
        return 0;
      }
      const thisCellDate = new Date(this.getPairSetDate).getTime();
      const dateDiffFromMin = thisCellDate - minDate;
      console.log("diff date ", dateDiffFromMin)
      const dateDiffPercentage = 1 - (dateDiffFromMin / minMaxDateDiff);
      console.log("setting opacity of ", dateDiffPercentage)
      return dateDiffPercentage;
    },
  },
  mounted() {
    this.getOpacityPercentage;
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
        newSelectedPairList = [...selectedPairs, [this.user1Id, this.user2Id]];
      }
      this.$store.commit(
        MutationTypes.SET_SELECTED_PAIR_LIST,
        newSelectedPairList
      );
    },
    matrixCellEdited(changedDate: Date) {
      const editedPairSet = {
        date: changedDate,
        pairList: [this.user1Id, this.user2Id],
      };
      axios
        .put(
          `http://${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}/api/pairset/editSinglePairSet`,
          { editedPairSet },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.status === 200) {
            this.$emit("turnEditModeOff");
            this.socket.emit(
              "TRIGGER_UPDATE_PAIR_SETS",
              this.$store.state.pairMatrix
            );
          }
        });
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../../colors.scss";

.matrix-cell {
  cursor: pointer;
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
