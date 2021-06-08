<template>
  <div>
    <datepicker @change="dateChanged" v-model="selectedDate" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Datepicker from "vue3-datepicker";
// import { ref } from 'vue'
// const picked = ref(new Date())

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
    dateChanged() {
      console.log("date changed");
    },
  },
  watch: {
    selectedDate(val) {
      console.log("date changed");
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