<template>
  <v-app>
    <v-btn @click="clickSignIn">
      <span>Sign In</span>
    </v-btn>
    <v-btn @click="clickRegister">
      <span>Register</span>
    </v-btn>
    <SignIn v-bind:userCreated="userCreated" v-bind:failure="failure" v-if="indexOfPage == 1"/>
    <Register v-on:addUserSuccess="addUserSuccess" v-bind:failure="failure" v-if="indexOfPage"/>
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
      failure: false
    };
  },
  methods: {
    addUserSuccess() {
      this.indexOfPage = 1;
      this.userCreated = true;
    },
    clickSignIn() {
      this.indexOfPage = 1;
      this.userCreated = false;
      this.failure = false;
    },
    clickRegister() {
      this.indexOfPage = 2;
      this.userCreated = false;
      this.failure = false;
    }
  }
};
</script>

<style scoped>
</style>
