<template>
  <div class="user-manager2">
    <input class="user-manager-new-user-input" v-model="newUser" />
    <button class="user-manager-add-user-button" @click="addNewUser" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import io from "socket.io-client";
import axios from "axios";

export default defineComponent({
  name: "UserManager",
  data() {
    return {
      newUser: "",
      socket: io(
        `${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}`
      ),
    };
  },
  methods: {
    addNewUser() {
      axios
        .post(
          `http://${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}/api/user/create`,
          { userName: this.newUser },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.status === 201) {
            this.socket.emit("TRIGGER_UPDATE_USERS");
          }
        });
    },
  },
});
</script>

<style lang="scss" scoped>
.user-manager2 {
  height: 100%;
  width: 100%;
}
</style>
