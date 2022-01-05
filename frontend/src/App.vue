<template>
  <!-- <div id="nav"> -->
  <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div> -->
  <router-link class="home-button" to="/"
    >Back to Home Page
  </router-link>
  <router-view />  
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

axios.defaults.withCredentials = true;
export default defineComponent({
  name: "App",
});
</script>

<style lang="scss">
#app {
  font-family: "Nunito Sans", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

*:focus {
  outline: none;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<style lang="scss" scoped>
@import "colors.scss";
.home-button {
  @include color-theme("background-color", "primary-accent");
  @include color-theme("border-color", "primary-border");
  @include color-theme("color", "primary-accent-text");

  position: absolute;
  cursor: pointer;
  width: 212px;
  height: 38px;
  margin: 16px;
  font-size: 20px;
  padding: 4px 16px;
  text-decoration: none;
  border: 1px solid;
  border-radius: 5px;
  display: flex;
  font-weight: 400;
  align-items: center;
  justify-content: center;
}
</style>