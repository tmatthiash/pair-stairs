<template>
  <div class="user-login">
    <div v-if="initialName !== ''" class="user-login-form__unauthorized">
      <form @submit="onSubmitLogin" class="user-login-form-contents">
        <input class="user-login-form-input" v-model="getName" />
        <div>{{ getName }}</div>
        <input class="user-login-form-input" v-model="form.password" />
        <button class="user-login-form-submit">Submit</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import axios from "axios";

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
  methods: {
    onSubmitLogin(e: { preventDefault: () => void }) {
      console.log("here");
      e.preventDefault();
      axios
        .post(
          `http://${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}/login`,
          { name: this.getName, password: this.form.password },
          { withCredentials: true }
        )
        .then((res) => console.log("response: ", res));
    },
  },
  props: {
    initialName: String,
  },
});
</script>

<style lang="sass" scoped>
</style>