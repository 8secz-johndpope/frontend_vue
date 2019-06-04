<template>
  <v-app>
    <v-btn @click="indexOfPage = 1">
      <span>Sign In</span>
    </v-btn>
    <v-btn @click="indexOfPage = 2">
      <span>Register</span>
    </v-btn>
    <SignIn v-bind:userCreated="userCreated" v-if="indexOfPage == 1"/>
    <Register
      v-on:addUserSuccess="addUserSuccess"
      v-on:addUserFailure="addUserFailure"
      v-if="indexOfPage"
    />
  </v-app>
</template>

<script>
import SignIn from "./SignIn";
import Register from "./Register";
export default {
  name: "Account",
  components: {
    SignIn,
    Register
  },
  data() {
    return {
      indexOfPage: 1,
      userCreated: false,
      loading: false
    };
  },
  methods: {
    addUserSuccess() {
      this.indexOfPage = 1;
      this.userCreated = true;
    }
  }
};
</script>

<style scoped>
</style>
