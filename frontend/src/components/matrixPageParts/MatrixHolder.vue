<template>
  <div>
    <h2>Pair Stairs for team whatever</h2>
    <div class="matrix-parts-page">
      <button class="matrix-parts-holder-tab">Users</button>
      <button class="matrix-parts-holder-tab">Stair Matrix</button>
      <div class="matrix-parts-holder-contents">
        <user-manager :matrixName="matrixName" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UserManager from "../UserManager/UserManager.vue";

export default defineComponent({
  components: { UserManager },
  name: "MatrixHolder",
  data() {
    return {
      userList: [],
    };
  },
  props: {
    matrixName: {
      type: String,
      default: "",
    },
  },
  methods: {
    getUserList() {
      console.log("todo");
    },
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