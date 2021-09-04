<template>
  <div class="pair-matrix-view">
    <UserLogin
      @pageStatusChange="pageStatusChange"
      v-if="pageStatus === 'unauthorized'"
      :initialName="matrixName"
      :setAuthenticationStatus="setAuthenticationStatus"
    />
    <div v-if="pageStatus === 'authorized'">
      <matrix-holder :matrixName="matrixName" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import UserLogin from "../components/UserLogin/UserLogin.vue";
import MatrixHolder from "../components/matrixPageParts/MatrixHolder.vue";

export default defineComponent({
  name: "PairMatrixPage",
  data() {
    return {
      pageStatus: "pending",
    };
  },
  components: {
    UserLogin,
    MatrixHolder,
  },
  methods: {
    getAuthenticationStatus() {
      axios
        .get(
          `http://${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}/api/authentication/${this.matrixName}`
        )
        .then((response) => {
          this.pageStatus =
            response.data.isUserAuthenticated === true
              ? "authorized"
              : "unauthorized";
        });
    },
    pageStatusChange(newStatus: string) {
      this.pageStatus = newStatus;
    },
    setAuthenticationStatus(newStatus: string) {
      this.pageStatus = newStatus;
    },
  },
  created() {
    this.getAuthenticationStatus();
  },
  props: {
    matrixName: {
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
