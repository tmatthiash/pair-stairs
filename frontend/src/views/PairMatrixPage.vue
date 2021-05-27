<template>
  <div>
  <div>{{ name }}</div>
  <div>{{ pageStatus }}</div>
  <UserLogin v-if="pageStatus === 'unauthorized'"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import UserLogin from "../components/UserLogin/UserLogin.vue";

export default defineComponent({
  name: "PairMatrixPage",
  data() {
    return {
      pageStatus: "pending",
    };
  },
  components: {
    UserLogin,
  },
  methods: {
    getAuthenticationStatus() {
      axios
        .get(
          `http://${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}/api/authentication/`
        )
        .then(response => {
          this.pageStatus = "test"
          this.pageStatus =
            response.data.isUserAuthenticated === true
              ? "authorized"
              : "unauthorized";
        });
    },
  },
  created() {
    this.getAuthenticationStatus();
  },
  props: {
    name: {
      type: String,
      default: "",
    },
  },
});
</script>

<style lang="scss" scoped>
</style>