<template>
  <div class="new-stair-options">
    <div class="new stair-options-text">Create a new pair stair, start by picking a name.</div>
    <form>
      <input v-model="form.stairName" required placeholder="Name of the new pair of stairs"/>
      <label>Next enter in a PIN for the room or a password (PIN must be 4 numbers).
           Anything other than 4 numbers will be a password</label>
      <label for="passwordInput" v-if="isPin">{{"Entering a PIN"}}</label>
        <label for="passwordInput" v-else>{{"Entering a Password"}}</label>
        <input id="passwordInput" v-model="form.stairPassOrPin" />
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NewStairOptions",
  data() {
    return {
      isSetToPin: true,
      form: {
        stairName: "",
        stairPassOrPin: "",
      },
    };
  },
  computed: {
      isPin() {
          if(!isNaN(Number(this.form.stairPassOrPin)) && (this.form.stairPassOrPin.length <=4)){
              return true;
          }
          else {
              return false;
          }
      }
  }
});
</script>

<style lang="scss" scoped>
@import "../../../colors.scss";
</style>