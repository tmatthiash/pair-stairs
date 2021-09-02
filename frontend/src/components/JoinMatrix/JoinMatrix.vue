<template>
  <div class="join-matrix">
    <div class="join-stair-header">Join an Existing Matrix</div>
    <form @submit="onSubmitJoin">
      <input
        class="join-stair-form-input"
        v-model="form.name"
        required
        placeholder="Name of matrix to join"
      />
      <input
        class="join-stair-password"
        id="passwordInput"
        placeholder="PIN/Password"
        v-model="form.password"
      />
      <button type="submit" class="new-stair-options-form-button">
        Join Matrix
      </button>
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
          `http://${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}/login`,
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

.join-stair-header {
  font-weight: 600;
  font-size: 30px;
  margin-bottom: 20px;
}
</style>
