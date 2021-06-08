<template>
  <div class="new-stair-options">
    <div class="new-stair-options-text">Start by picking a name.</div>
    <form @submit="onSubmit" class="new-stair-options-form">
      <input
        class="new-stair-options-form-input"
        v-model="form.name"
        required
        placeholder="Name of the new pair of stairs"
      />
      <label class="new-stair-options-form-instruction-label">
        Next enter in a PIN for the room or a password (PIN must be 4 numbers).
        Anything other than 4 numbers will be a password
      </label>
      <label for="passwordInput" v-if="isPin">
        Entering a
        <span class="new-stair-options-form-input-label-last">PIN</span>
      </label>
      <label for="passwordInput" v-else>
        Entering a
        <span class="new-stair-options-form-input-label-last">password</span>
      </label>
      <input
        class="new-stair-options-form-input"
        id="passwordInput"
        placeholder="PIN/Password"
        v-model="form.password"
      />
      <div class="new-stair-options-form-button-area">
        <button type="submit" class="new-stair-options-form-button">
          Create Stair Pairs
        </button>
        <router-link class="new-stair-options-form-button" to="/homepage"
          >Back to Home Page</router-link
        >
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "NewStairOptions",
  data() {
    return {
      isSetToPin: true,
      form: {
        name: "",
        password: "",
      },
    };
  },
  methods: {
    onSubmit(e: { preventDefault: () => void }) {
      e.preventDefault();
      axios
        .post(
          `http://${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}/api/pairmatrix/`,
          this.form
        )
        .then((res) => {
          console.log(res);
        });
    },
    // onSubmit(e: { preventDefault: () => void }) {
    //   e.preventDefault();
    //   axios
    //     .get(
    //       `http://${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}/api/pairmatrix/findbyname/${this.form.name}`)
    //     .then((res) => {
    //       console.log(res);
    //     });
    // },
  },
  computed: {
    isPin() {
      if (
        !isNaN(Number(this.form.password)) &&
        this.form.password.length <= 4
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../../colors.scss";

.new-stair-options {
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.new-stair-options-form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.new-stair-options-form-input {
  @include color-theme("border-color", "primary-accent");

  font-size: 16px;
  height: 36px;
  width: 300px;
  border-radius: 5px;
  border: 1px solid;
  margin-bottom: 40px;
}

.new-stair-options-form-instruction-label {
  margin-bottom: 20px;
  text-align: left;
}

.new-stair-options-form-input-label-last {
  font-weight: 700;
}

.new-stair-options-form-button-area {
  width: 100%;
}

.new-stair-options-form-button {
  @include color-theme("background-color", "primary-accent");
  @include color-theme("border-color", "primary-border");
  @include color-theme("color", "primary-accent-text");

  cursor: pointer;
  width: 212px;
  height: 38px;
  margin: 0 16px;
  font-size: 20px;
  padding: 4px 16px;
  text-decoration: none;
  border: 1px solid;
  border-radius: 5px;
  font-weight: 400;
}
</style>
