<template>
  <div class="user-manager">
    <div class="user-manager-header-area">
      <h3 class="user-manager-header">
        Add people to the team, they'll show up in matrix tab
      </h3>
      <div class="user-manager-add-user-area">
        <input
          placeholder="Name of new person"
          class="user-manager-new-user-input"
          v-model="newUser"
        />
        <button class="user-manager-add-user-button" @click="addNewUser">
          Add
        </button>
      </div>
    </div>
    <div class="user-manager-users-list">
      <div v-for="(user, index) in getUsers" :key="index">{{ user.name }}</div>
    </div>
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
    },
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
            this.socket.emit(
              "TRIGGER_UPDATE_USERS",
              this.$store.state.pairMatrix
            );
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
@import "../../colors.scss";

.user-manager {
  height: 100%;
  width: 100%;
  padding: 0 15px;
}

.user-manager-header-area {
  display: flex;
  justify-content: space-between;
}

.user-manager-header {
  max-width: 300px;
}

.user-manager-add-user-area {
  display: flex;
  align-items: center;
}

.user-manager-add-user-button {
  @include color-theme("background-color", "primary-accent");
  @include color-theme("border-color", "primary-border");
  @include color-theme("color", "primary-accent-text");
  
  margin: 0 16px;
  font-size: 20px;
  padding: 4px 16px;
  text-decoration: none;
  border: 1px solid;
  border-radius: 5px;
  cursor: pointer;
  width: 80px;
  height: 30px;
}

.user-manager-new-user-input {
  @include color-theme("border-color", "primary-accent");

  font-size: 16px;
  border: 2px solid;
  border-radius: 5px;
  height: 30px;
  max-width: 300px;
}
</style>
