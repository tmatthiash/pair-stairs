<template>
  <div class="join-matrix">
    <div class="join-stair-header">Join an Existing Matrix</div>
    <form class="join-stair-form" @submit="onSubmitJoin">
      <input
        class="join-stair-form-input"
        v-model="form.name"
        required
        placeholder="Name of matrix to join"
      />
      <input
        class="join-stair-form-input"
        id="passwordInput"
        placeholder="PIN/Password"
        v-model="form.password"
      />
      <button type="submit" class="new-stair-options-form-button">
        Join Matrix
      </button>
      <div class="join-stair-form-error" v-if="badLoginOccured">
        Name / Password was incorrect
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "JoinMatrix",
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
    onSubmitJoin(e: { preventDefault: () => void }) {
      e.preventDefault();
      axios
        .post(
          `{process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}/login`,
          { name: this.form.name, password: this.form.password }
        )
        .then((res) => {
          this.onStatusChange(res.data.success ? "authorized" : "unauthorized");
          this.$router.push({ path: `/pairmatrix/${this.form.name}` });
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
});
</script>

import { defineComponent } from "vue";

<style lang="scss" scoped>
@import "../../colors.scss";

.join-matrix {
  @include color-theme("background-color", "primary-background");
  @include color-theme("-webkit-box-shadow", "box-shadow-settings");
  @include color-theme("box-shadow", "box-shadow-settings");

  padding-top: 150px;
  height: 100%;
  width: 100%;
}

.join-stair-header {
  font-weight: 600;
  font-size: 30px;
  margin-bottom: 20px;
}

.join-stair-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.join-stair-form-input {
  @include color-theme("border-color", "primary-accent");

  margin: 15px;
  font-size: 16px;
  border: 3px solid;
  border-radius: 5px;
  height: 40px;
  max-width: 300px;
}

.new-stair-options-form-button {
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
