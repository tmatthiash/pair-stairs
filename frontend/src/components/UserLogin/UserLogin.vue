<template>
  <div class="user-login">
    <form class="user-login-form">
      <input class="user-login-form-input" />
      <input class="user-login-form-input" />
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "UserLogin",
  data() {
    return {
      form: {
        name: "",
        password: "",
      },
    };
  },
  computed: {
    getName(): string {
      if (this.initialName) {
        return this.initialName;
      }
      return this.form.name;
    },
  },
  props: {
    initialName: String,
  },
});
</script>

<style lang="sass" scoped>
</style>