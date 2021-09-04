<template>
  <div>
    <h2>Pair Stairs for team {{ getName() }}</h2>
    <div class="matrix-parts-page">
      <div class="matrix-button-holder">
        <button
          class="matrix-parts-holder-tab"
          v-bind:class="{
            'matrix-parts-holder-tab__selected': isUsersTabSelected(),
          }"
          @click="selectedTab = 'Users'"
        >
          Team Members
        </button>
        <button
          class="matrix-parts-holder-tab"
          v-bind:class="{
            'matrix-parts-holder-tab__selected': !isUsersTabSelected(),
          }"
          @click="selectedTab = 'Matrix'"
        >
          Pair Chart
        </button>
        <div class="matrix-parts-holder-spacer" />
      </div>
      <div class="matrix-parts-holder-contents">
        <user-manager v-if="isUsersTabSelected()" />
        <matrix-manager :matrixName="matrixName" v-if="!isUsersTabSelected()" />
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
      selectedTab: null,
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
    isUsersTabSelected() {
      if (this.selectedTab === "Matrix") {
        return false;
      }
      return (
        this.selectedTab === "Users" ||
        ((this.selectedTab === null && this.getUsers?.length) || 0) < 3
      );
    },
  },
  computed: {
    getUsers(): Array<unknown> | null {
      return this.$store.state.userList;
    },
  },
  mounted() {
    this.joinSocket();
    this.socket.on("UPDATE_MATRIX_INFO", (data) => {
      this.$store.commit(MutationTypes.SET_PAIR_MATRIX, data.pairMatrix);
      this.$store.commit(MutationTypes.SET_USER_LIST, data.users);
      this.$store.commit(MutationTypes.SET_USER_PAIR_SETS, data.pairSets);
    });
    this.socket.on("SET_USER_LIST", (data) => {
      this.$store.commit(MutationTypes.SET_USER_LIST, data);
    });
  },
});
</script>

<style lang="scss" scoped>
@import "../../colors.scss";

.matrix-parts-page {
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 80%;
}

.matrix-parts-holder-tab {
  @include color-theme("border-color", "primary-accent");

  height: 35px;
  width: 180px;
  cursor: pointer;
  font-size: 16px;
  border-width: 2px 2px 2px 2px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background-color: transparent;
}

.matrix-parts-holder-contents {
  @include color-theme("border-color", "primary-accent");

  overflow: auto;

  margin-left: auto;
  margin-right: auto;
  border: 2px solid;
  border-radius: 0 0 4px 4px;
  height: 70%;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-top: 0px;
  min-height: 300px;
}
.matrix-parts-holder-tab__selected {
  font-weight: 700;
  font-size: 20px;
  border-bottom: 0;
}

.matrix-button-holder {
  display: flex;
}

.matrix-parts-holder-spacer {
  @include color-theme("border-color", "primary-accent");

  flex-grow: 1;
  border-bottom: 2px solid;
  margin-right: -3px;
}
</style>
