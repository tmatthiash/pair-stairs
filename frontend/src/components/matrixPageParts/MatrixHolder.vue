<template>
  <div>
    <h2>Pair Stairs for team whatever</h2>
    <div class="matrix-parts-page">
      <button class="matrix-parts-holder-tab" @click="selectedTab = 'Users'">
        Users
      </button>
      <button class="matrix-parts-holder-tab" @click="selectedTab = 'Matrix'">
        Stair Matrix
      </button>
      <div class="matrix-parts-holder-contents">
        <user-manager v-if="selectedTab === 'Users'" />
        <matrix-manager :matrixName="matrixName" v-if="selectedTab === 'Matrix'" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import io from "socket.io-client";
import { MutationTypes } from "../../store/MutationTypes";
import UserManager from "../UserManager/UserManager.vue";
import MatrixManager from "../MatrixManager/MatrixManager.vue";

export default defineComponent({
  components: { UserManager, MatrixManager },
  name: "MatrixHolder",
  data() {
    return {
      socket: io(
        `${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}`
      ),
      selectedTab: "Users",
    };
  },
  props: ["matrixName"],
  methods: {
    joinSocket() {
      this.socket.emit("join", { matrixName: this.getName() });
    },
    getName() {
      return this.matrixName;
    },
  },
  mounted() {
    this.joinSocket();
    this.socket.on("UPDATE_MATRIX_INFO", (data) => {
      this.$store.commit(MutationTypes.SET_PAIR_MATRIX, data.pairMatrix);
      this.$store.commit(MutationTypes.SET_USER_LIST, data.users);
    });
    this.socket.on("SET_USER_LIST", (data) => {
      this.$store.commit(MutationTypes.SET_USER_LIST, data);
    });
  },
});
</script>

<style lang="scss" scoped>
@import "../../colors.scss";

.matrix-parts-holder-tab {
  @include color-theme("border-color", "primary-accent");

  margin-right: 1px;
  font-size: 20px;
  border-width: 2px 2px 0 2px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background-color: transparent;
}

.matrix-parts-holder-contents {
  @include color-theme("border-color", "primary-accent");

  margin-left: auto;
  margin-right: auto;
  border: 2px solid;
  border-radius: 4px;
  height: 70%;
  width: 80%;
}
</style>