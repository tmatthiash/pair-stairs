<template>
  <div>
    <datepicker v-model="selectedDate" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Datepicker from "vue3-datepicker";

export default defineComponent({
  name: "StyledDatePicker",
  props: ["dateValue"],
  data() {
    return {
      selectedDate: new Date(this.dateValue),
    };
  },
  components: {
    Datepicker,
  },
  methods: {
    emitChange(val: string) {
      this.$emit("matrixCellEdited", val)
    }
  },
  watch: {
    selectedDate(val) {
      this.emitChange(val)
    },
  },
});
</script>

<style lang="sass">
.v3dp__datepicker
  input
    padding: 0px
    width: 100%
    background-color: transparent
    border: unset
    height: 21px
    cursor: pointer
    font-size: 15px
    padding-left: 10px
</style>