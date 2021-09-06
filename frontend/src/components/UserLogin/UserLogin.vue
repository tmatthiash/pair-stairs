<template>
  <div class="user-login">
    <div class="user-login-header">Join the {{ initialName }} Matrix</div>

    <!-- <div v-if="initialName !== ''" class="user-login-form__unauthorized"> -->
    <div class="user-login-form__unauthorized">
      <form @submit="onSubmitLogin" class="user-login-form-contents">
        <input
          class="user-login-form-input"
          placeholder="PIN/Password"
          v-model="form.password"
        />
        <button class="user-login-form-submit">Join</button>
        <div class="user-login-form-error" v-if="badLoginOccured">
          PIN / Password was incorrect
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
  methods: {
    onSubmitLogin(e: { preventDefault: () => void }) {
      e.preventDefault();
      axios
        .post(
          `{process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}/login`,
          { name: this.initialName, password: this.form.password },
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

<style lang="scss" scoped>
@import "../../colors.scss";

.user-login-header {
  font-weight: 600;
  font-size: 30px;
  margin-bottom: 20px;
}

.user-login-form-input {
  @include color-theme("border-color", "primary-accent");

  margin: 15px;
  font-size: 16px;
  border: 3px solid;
  border-radius: 5px;
  height: 40px;
  max-width: 300px;
}

.user-login {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-login-form-contents {
  display: flex;
  flex-direction: column;
}

.user-login-form-submit {
  @include color-theme("background-color", "primary-accent");
  @include color-theme("border-color", "primary-border");
  @include color-theme("color", "primary-accent-text");

  margin: 0 16px;
  font-size: 30px;
  padding: 4px 16px;
  text-decoration: none;
  border: 1px solid;
  border-radius: 5px;
  cursor: pointer;
}
</style>
