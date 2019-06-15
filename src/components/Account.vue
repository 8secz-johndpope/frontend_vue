<template>
  <div>
    <div v-if="storedJWT">
      <MyAccount
        v-bind:storedName="storedName"
        v-bind:storedPass="storedPass"
        v-bind:storedJWT="storedJWT"
        v-on:disconnectSuccess="$emit('disconnectSuccess')"
        v-on:authSuccess="$emit('authSuccess')"
      />
    </div>
    <div v-if="!storedJWT">
      <v-btn @click="clickSignIn" block>
        <span>Sign In</span>
      </v-btn>
      <v-btn @click="clickRegister" block>
        <span>Register</span>
      </v-btn>
      <SignIn
        v-bind:userCreated="userCreated"
        v-bind:failure="failure"
        v-on:authSuccess="$emit('authSuccess')"
        v-if="indexOfPage == 1"
      />
      <Register
        v-on:addUserSuccess="addUserSuccess"
        v-bind:failure="failure"
        v-if="indexOfPage == 2"
      />
    </div>
  </div>
</template>

<script>
import SignIn from "./SignIn";
import Register from "./Register";
import MyAccount from "./MyAccount";
import { getToken } from "../services/getToken";
export default {
  name: "Account",
  components: {
    SignIn,
    Register,
    MyAccount
  },
  props: ["storedName", "storedPass", "storedJWT"],
  data() {
    return {
      indexOfPage: 1,
      userCreated: false,
      failure: false
      // storedName: "",
      // storedPass: "",
      // storedJWT: ""
    };
  },
  // computed: {
  //   storedName: function() {
  //     if (localStorage.storedName) {
  //       return localStorage.storedName;
  //     }
  //   },
  //   storedPass: function() {
  //     if (localStorage.storedPass) {
  //       return localStorage.storedPass;
  //     }
  //   },
  //   storedJWT: function() {
  //     if (localStorage.storedJWT) {
  //       return localStorage.storedJWT;
  //     }
  //   }
  // },
  // created: function() {
  //   this.refreshAuth();
  // },
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
    },
    refreshAuth() {
      this.storedName = localStorage.storedName;
      this.storedPass = localStorage.storedPass;
      this.storedJWT = localStorage.storedJWT;
    }
  }
};
</script>

<style scoped>
</style>
