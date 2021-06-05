<template>
  <div class="user-manager">
    <input class="user-manager-new-user-input" v-model="newUser" />
    <button class="user-manager-add-user-button" @click="addNewUser">
      Add User
    </button>
    <div v-for="(user, index) in getUsers" :key="index">{{ user.name }}</div>
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
  computed: {
    getUsers() {
      return this.$store.state.userList;
    }
  },
  methods: {
    addNewUser() {
      axios
        .post(
          `http://${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}/api/user/create/`,
          { userName: this.newUser }
        )
        .then((res) => {
          if (res.status === 201) {
            this.socket.emit("TRIGGER_UPDATE_USERS", this.$store.state.pairMatrix);
          }
        });
      // axios.get(
      //   `http://${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}/api/user/create/`
      // )
    },
  },
});
</script>

<style lang="scss" scoped>
.user-manager {
  height: 100%;
  width: 100%;
}

.user-manager-add-user-button {
  width: 80px;
  height: 20px;
}
</style>
