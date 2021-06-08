<template>
  <div class="matrix-manager">
    <button @click="toggleMode">TOGGLE MODE {{ isInEditMode }}</button>
    <div
      class="matrix-manager-row"
      v-for="(userY, indexY) in getUserList()"
      :key="indexY"
    >
      <div class="matrix-manager-y-labels">{{ userY.name }}</div>
      <div v-for="(userX, indexX) in getUserList()" :key="indexX">
        <div class="matrix-manager-cell" v-if="indexY - indexX > 0">
          <!-- {{ indexY - indexX }} -->
          <!-- {{ userX.name }}
          {{ userY.name }} -->
          <matrix-cell
            :user1Id="userX.id"
            :user2Id="userY.id"
            :isInEditMode="isInEditMode"
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
      >
        {{ user.name }}
      </div>
    </div>
    <button @click="setPairsForTheDay">SUBMIT</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MatrixCell from "./MatrixCell/MatrixCell.vue";
import io from "socket.io-client";
import axios from "axios";
import { MutationTypes } from "../../store/MutationTypes";

export default defineComponent({
  name: "MatrixManager",
  props: ["matrixName"],
  data() {
    return {
      isInEditMode: false,
      socket: io(
        `${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}`
      ),
    };
  },
  components: { MatrixCell },
  methods: {
    getUserList() {
      if (this.$store.state.userList) {
        return this.$store.state.userList;
      }
    },
    toggleMode() {
      this.isInEditMode = !this.isInEditMode;
    },
    setPairsForTheDay() {
      axios
        .post(
          `http://${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}/api/pairset/batch-create`,
          { pairSetList: this.$store.state.selectedPairs },
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
  },
  mounted() {
    this.socket.emit("join", { matrixName: this.matrixName });
    this.socket.on("SET_USER_PAIR_SETS", (data) => {
      console.log("recienved socket ");
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
  margin-top: 50px;
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
}

.matrix-manager-blank-cell {
  width: 104px;
  border: none;
}
</style>
