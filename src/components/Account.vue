<template>
  <v-app>
    <v-app v-if="storedJWT">
      <MyAccount v-on:disconnectSuccess="refreshAuth"/>
    </v-app>
    <v-app v-if="!storedJWT">
      <v-btn @click="clickSignIn">
        <span>Sign In</span>
      </v-btn>
      <v-btn @click="clickRegister">
        <span>Register</span>
      </v-btn>
      <SignIn
        v-bind:userCreated="userCreated"
        v-bind:failure="failure"
        v-on:authSuccess="refreshAuth"
        v-if="indexOfPage == 1"
      />
      <Register
        v-on:addUserSuccess="addUserSuccess"
        v-bind:failure="failure"
        v-if="indexOfPage == 2"
      />
    </v-app>
  </v-app>
</template>

<script>
import SignIn from "./SignIn";
import Register from "./Register";
import MyAccount from "./MyAccount";
export default {
  name: "Account",
  components: {
    SignIn,
    Register,
    MyAccount
  },
  computed: {
    storedName: {
      get: function() {
        console.log("getting name :" + newValue);
        if (localStorage.storedName) {
          return localStorage.storedName;
        } else {
          return "";
        }
      },
      set: function(newValue) {
        localStorage.storedName = newValue;
      }
    },
    storedPass: {
      get: function() {
        if (localStorage.storedPass) {
          return localStorage.storedPass;
        } else {
          return "";
        }
      },
      set: function(newValue) {
        localStorage.storedPass = newValue;
      }
    },
    storedJWT: {
      get: function() {
        if (localStorage.storedJWT) {
          return localStorage.storedJWT;
        } else {
          return "";
        }
      },
      set: function(newValue) {
        localStorage.storedJWT = newValue;
      }
    }
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
