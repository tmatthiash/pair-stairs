<template>
    <div>
        <datepicker v-model="selectedDate" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Datepicker from 'vue3-datepicker'
import { ref } from 'vue'


export default defineComponent({
  name: "StyledDatePicker",
  props: ["dateValue"],
  data() {
    return {
      selectedDate: this.getDate
    };
  },
  components: {
    Datepicker,
  },
  computed: {
      getDate(): Date | null {
          if(Number.isNaN(Date.parse(this.dateValue))){
              return null;
          }
          return new Date(this.dateValue)
      }
  }
});
</script>
