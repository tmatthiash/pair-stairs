<template>
  <div class="user-manager">
    <div class="user-manager-header-area">
      <h3 class="user-manager-header">
        Add people to the team, they'll show up in pair chart tab
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
      <div
        class="user-manager-users-list-item"
        v-for="(user, index) in getUsers"
        :key="index"
      >
        <span class="user-manager-users-list-name">{{ user.name }}</span
        ><button
          class="user-manager-users-list-remove"
          @click="removeUser(user.id)"
        >
          Remove
        </button>
      </div>
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
    };
  },
  computed: {
    getUsers(): Array<unknown> | null {
      return this.$store.state.userList;
    },
  },
  props: ["socket"],
  methods: {
    addNewUser() {
      axios
        .post(
          `${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}/api/user/create/`,
          { userName: this.newUser },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.status === 201) {
            console.log("here");
            this.socket.emit(
              "TRIGGER_UPDATE_USERS",
              this.$store.state.pairMatrix
            );
          }
        });
    },
    removeUser(id: number) {
      axios
        .put(
          `${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}/api/user/remove/`,
          { userId: id }
        )
        .then((res) => {
          console.log("here");
          if (res.status === 204) {
            this.socket.emit(
              "TRIGGER_UPDATE_USERS",
              this.$store.state.pairMatrix
            );
          }
        });
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../colors.scss";

.user-manager {
  height: 100%;
  width: calc(100% - 30px);

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

.user-manager-users-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-manager-users-list-item {
  width: 300px;
  display: flex;
  justify-content: space-between;
}
.user-manager-users-list-name {
  font-weight: 700;
}
.user-manager-users-list-remove {
  @include color-theme("background-color", "primary-accent");
  @include color-theme("border-color", "primary-border");
  @include color-theme("color", "primary-accent-text");

  height: 26px;
  font-size: 16px;
  padding: 4px 16px;
  text-decoration: none;
  border: 1px solid;
  border-radius: 5px;
  cursor: pointer;
}

@media only screen and (max-width: 725px) {
  .user-manager-header {
    font-size: 16px;
  }
  .user-manager-header-area {
    display: flex;
    flex-direction: column;
  }
  .user-manager-new-user-input {
    max-width: 70%;
  }
  .user-manager-add-user-area {
    justify-content: space-between;
  }
}
</style>
