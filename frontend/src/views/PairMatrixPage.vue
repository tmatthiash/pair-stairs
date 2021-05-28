<template>
  <div class="pair-matrix-view">
    <div>{{pageStatus}}</div>
    <UserLogin v-if="pageStatus === 'unauthorized'" :initialName="name"/>
    <div v-if="pageStatus === 'authorized'">
      LOGGGGGGGED IN
    </div>
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
        .then((response) => {
          this.pageStatus = "test";
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
@import "../colors.scss";

.pair-matrix-view {
  @include color-theme("background-color", "primary-background");
  @include color-theme("-webkit-box-shadow", "box-shadow-settings");
  @include color-theme("box-shadow", "box-shadow-settings");

  padding-top: 150px;
  height: 100%;
  width: 100%;
}
</style>