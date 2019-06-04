<template>
  <v-app>
    <v-btn @click="indexOfPage = 1">
      <span>Sign In</span>
    </v-btn>
    <v-btn @click="indexOfPage = 2">
      <span>Register</span>
    </v-btn>
    <SignIn v-if="indexOfPage == 1"/>
    <Register v-if="indexOfPage == 2"/>
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
      indexOfPage: 1
    };
  }
};
</script>

<style scoped>
</style>
