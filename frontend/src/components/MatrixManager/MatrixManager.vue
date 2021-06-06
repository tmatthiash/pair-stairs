<template>
  <div class="matrix-manager">
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
          <matrix-cell :user1Id="userX.id" :user2Id="userY.id" />
        </div>
      </div>
    </div>
    <div class="matrix-manager-x-labels">
      <div class="matrix-manager-blank-cell" />
      <div
        class="matrix-manager-cell"
        v-for="user in getUserList()"
        :key="user.id"
      >
        {{ user.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MatrixCell from "./MatrixCell/MatrixCell.vue";
// import io from "socket.io-client";
// import { MutationTypes } from "../../store/MutationTypes";

export default defineComponent({
  name: "MatrixManager",
  components: { MatrixCell },
  methods: {
    getUserList() {
      if (this.$store.state.userList) {
        return this.$store.state.userList;
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../colors.scss";

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
}

.matrix-manager-cell {
  @include color-theme("background-color", "secondary-background");
  @include color-theme("border-color", "primary-accent");

  width: 100px;
  border: 1px solid;
}

.matrix-manager-blank-cell {
  width: 100px;
  border: 1px solid;
}
</style>