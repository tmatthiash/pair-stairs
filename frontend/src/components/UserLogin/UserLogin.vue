<template>
  <div class="user-login">
    <div v-if="initialName !== ''" class="user-login-form__unauthorized">
      <form @submit="onSubmitLogin" class="user-login-form-contents">
        <input class="user-login-form-input" v-model="getName" />
        <input class="user-login-form-input" v-model="form.password" />
        <button class="user-login-form-submit">Submit</button>
        <div class="user-login-form-error" v-if="badLoginOccured">
          Name / Password was incorrect
        </div>
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
      badLoginOccured: false,
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
      e.preventDefault();
      axios
        .post(
          `http://${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}/login`,
          { name: this.getName, password: this.form.password },
          { withCredentials: true }
        )
        .then((res) => {
          this.onStatusChange(res.data.success ? "authorized" : "unauthorized");
        })
        .catch((err) => {
          if (err.response.status === 401) {
            this.badLoginOccured = true;
          }
        });
    },
    onStatusChange(newStatus: string) {
      this.$emit("pageStatusChange", newStatus);
    },
  },
  props: {
    initialName: String,
  },
});
</script>

<style lang="sass" scoped>
.user-login
  width: 50%
  margin-left: auto
  margin-right: auto

.user-login-form-contents
  display: flex
  flex-direction: column
</style>
