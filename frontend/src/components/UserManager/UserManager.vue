

<template>
  <div class="user-manager">
    <input class="user-manager-new-user-input" />
    <button class="user-manager-nuew-user-submit">Add User</button>
  </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "UserManager",
  props: {
    matrixName: {
      type: String,
      default: "",
    },
  },
});
</script>

<style lang="sass" scoped>
.user-manager
    height: 100%
    width: 100%
</style>