<template>
  <div class="matrix-manager">
    <div class="matrix-manager-header">
      <h2 class="matrix-manager-header-text">
        Pick out the day's pairs and then submit to set them for today, or
        change a pair date manually with manual mode
      </h2>
      <button class="matrix-manager-button" @click="toggleMode">
        {{ isInEditMode ? "Normal Mode" : "Manual Mode" }}
      </button>
    </div>
    <div
      class="matrix-manager-row"
      v-for="(userY, indexY) in getUserList()"
      :key="indexY"
    >
      <div
        class="matrix-manager-y-labels"
        @mouseenter="yAxisMouseoverId = userY.id"
        @mouseleave="yAxisMouseoverId = null"
      >
        <matrix-cell-tooltip
          :userId="userY.id"
          :mouseOverId="yAxisMouseoverId"
          :oldestUserName="getOldestPairName(userY.id)"
        />
        {{ userY.name }}
      </div>
      <div v-for="(userX, indexX) in getUserList()" :key="indexX">
        <div class="matrix-manager-cell" v-if="indexY - indexX > 0">
          <!-- {{ indexY - indexX }} -->
          <!-- {{ userX.name }}
          {{ userY.name }} -->
          <matrix-cell
            @turnEditModeOff="turnEditModeOff"
            :user1Id="userX.id"
            :user2Id="userY.id"
            :isInEditMode="isInEditMode"
            :socket="socket"
          />
        </div>
      </div>
    </div>
    <div class="matrix-manager-x-labels">
      <div class="matrix-manager-blank-cell" />
      <div
        class="matrix-manager-cell matrix-manager-cell-x-label"
        v-for="user in getUserList()"
        :key="user.id"
        @mouseenter="xAxisMouseoverId = user.id"
        @mouseleave="xAxisMouseoverId = null"
      >
        <matrix-cell-tooltip
          :userId="user.id"
          :mouseOverId="xAxisMouseoverId"
          :oldestUserName="getOldestPairName(user.id)"
        />
        {{ user.name }}
      </div>
    </div>
    <button
      :disabled="isInEditMode"
      class="matrix-manager-button"
      :class="{ 'matrix-manager-button__disabled': isInEditMode }"
      @click="setPairsForTheDay"
    >
      Lock in Today's Pairs
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { PairSet } from "../../types/PairSet";
import { User } from "../../types/User";
import MatrixCell from "./MatrixCell/MatrixCell.vue";
import MatrixCellTooltip from "./MatrixCellTooltip/MatrixCellTooltip.vue";
import axios from "axios";
import { MutationTypes } from "../../store/MutationTypes";

export default defineComponent({
  name: "MatrixManager",
  props: ["matrixName", "socket"],
  data() {
    return {
      isInEditMode: false,
      xAxisMouseoverId: null,
      yAxisMouseoverId: null,
    };
  },
  components: { MatrixCell, MatrixCellTooltip },
  methods: {
    getUserList() {
      if (this.$store.state.userList) {
        return this.$store.state.userList;
      }
    },
    getOldestPairName(userId: string): string {
      if (this.getUserList()) {
        const pairList: PairSet[] = this.$store.state.pairSetList;
        const foundPairSet = pairList.filter((set) => {
          return set.userIdList.includes(userId);
        });
        if (foundPairSet.length > 0) {
          const oldestPair = foundPairSet.reduce((oldest, current) => {
            return oldest?.date > current.date ? current : oldest;
          });
          const otherGuyId = oldestPair.userIdList?.filter((id) => {
            return id !== userId;
          });
          const userList: User[] = this.getUserList() || [];
          const otherGuy = userList.filter((user) => {
            return user.id === otherGuyId[0];
          });
          return otherGuy[0].name;
        }
      }
      return "";
    },
    toggleMode() {
      this.isInEditMode = !this.isInEditMode;
    },
    setPairsForTheDay() {
      axios
        .post(
          `${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}/api/pairset/batch-create`,
          { pairSetList: this.$store.state.selectedPairs, date: new Date() },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.status === 201) {
            this.socket.emit(
              "TRIGGER_UPDATE_PAIR_SETS",
              this.$store.state.pairMatrix
            );
            this.$store.commit(MutationTypes.SET_SELECTED_PAIR_LIST, []);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    turnEditModeOff() {
      this.isInEditMode = false;
    },
  },
  mounted() {
    const firstLetterCapitalized =
      this.matrixName.charAt(0).toUpperCase() +
      this.matrixName.slice(1).toLowerCase();
    // this.socket.emit("join", { matrixName: firstLetterCapitalized });
    this.socket.on("SET_USER_PAIR_SETS", (data: any) => {
      console.log("setting user pairs");
      this.$store.commit(MutationTypes.SET_USER_PAIR_SETS, data);
    });
  },
  computed: {
    getSelectedPairs(): string[][] {
      return this.$store.state.selectedPairs;
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../colors.scss";

.matrix-manager {
  width: fit-content;
  margin: auto;
}

.matrix-manager-header {
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
}

.matrix-manager-header-text {
  margin: 0px;
  font-size: 16px;
  max-width: 60%;
}

.matrix-manager-button {
  @include color-theme("background-color", "primary-accent");
  @include color-theme("border-color", "primary-border");
  @include color-theme("color", "primary-accent-text");

  height: 40px;
  font-size: 16px;
  padding: 4px 16px;
  text-decoration: none;
  border: 1px solid;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.matrix-manager-button__disabled {
  opacity: 0;
  cursor: unset;
}

.matrix-manager-row {
  display: flex;
  margin-left: 20px;
}

.matrix-manager-x-labels {
  display: flex;
  margin-left: 20px;
}

.matrix-manager-y-labels {
  @include color-theme("background-color", "secondary-background");
  @include color-theme("border-color", "primary-accent");

  width: 100px;
  border: 1px solid;
  margin: 1px;
  text-overflow: ellipsis;
  overflow: hidden;
}

.matrix-manager-cell {
  @include color-theme("background-color", "secondary-background");
  @include color-theme("border-color", "primary-accent");

  width: 100px;
  border: 1px solid;
  margin: 1px;
  border-radius: 4px;
}

.matrix-manager-cell-x-label {
  border-radius: unset;
  text-overflow: ellipsis;
  overflow: hidden;
}

.matrix-manager-blank-cell {
  width: 104px;
  border: none;
}
</style>
