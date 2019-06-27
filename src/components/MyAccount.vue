<template>
  <div>
    <v-btn @click="clickDisconnect" color="error" block>
      <span>Disconnect</span>
    </v-btn>
    <div>
      <div v-if="loading" class="loading">
        <h1>Loading</h1>
      </div>
      <h3>Change account settings</h3>
      <div v-if="failure" class="failure">{{failureMessage}}</div>
      <div v-if="userUpdated" class="success">User profil updated sucessfully</div>
      <v-form ref="form" v-model="valid" lazy-validation>
        <h5>Change name</h5>
        <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name"></v-text-field>
        <h5>Change email</h5>
        <v-text-field v-model="email" :rules="emailRules" label="E-mail"></v-text-field>
        <h5>Change password</h5>
        <v-text-field v-model="password" :rules="passRules" label="Password"></v-text-field>
        <v-text-field v-model="rePassword" :rules="rePassRules" label="Re enter Password"></v-text-field>
        <v-btn :disabled="!valid" color="success" @click="validate">Validate</v-btn>
        <v-btn color="error" @click="reset">Reset Form</v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
import { getToken } from "../services/getToken";
export default {
  name: "MyAccount",
  props: ["storedName", "storedPass", "storedJWT"],
  data() {
    return {
      valid: true,
      failure: "",
      failureMessage: "",
      status: 0,
      loading: false,
      userUpdated: false,
      name: "",
      email: "",
      password: "",
      rePassword: "",
      reloadToken: true,
      nameRules: [
        v =>
          !v || (v && v.length <= 10) || "Name must be less than 10 characters"
      ],
      emailRules: [v => /.+@.+/.test(v) || !v || "E-mail must be valid"],
      passRules: [
        v =>
          (v &&
            v.length >= 6 &&
            /.*[0-9].*/.test(v) &&
            /.*[A-Z].*/.test(v) &&
            /.*[a-z].*/.test(v)) ||
          !v ||
          "Password must be at least 6 caracters long and contain at least 1 letter, 1 Maj and 1 number"
      ]
    };
  },
  computed: {
    rePassRules: function() {
      return [v => v == this.password || "Must match password"];
    }
  },
  methods: {
    getToken,
    reset() {
      this.name = "";
      this.email = "";
      this.password = "";
      this.rePassword = "";
    },
    validate() {
      this.loading = true;
      if (
        this.valid &&
        (this.name != "" ||
          this.email != "" ||
          (this.password != "" && this.rePassword != ""))
      ) {
        var url = "http://127.0.0.1:8000/api/user/";
        var requestBody = {};
        if (this.name) {
          requestBody.username = this.name;
          requestBody.pseudo = this.name;
        }
        if (this.email) {
          requestBody.email = this.email;
        }
        if (this.password) {
          requestBody.username = this.password;
        }
        if (this.storedJWT) {
          var JWTbody = this.storedJWT.match(/\..+\./g)[0].replace(/\./g, ""); // insert inside computed valued
          var id = JSON.parse(atob(JWTbody)).id; // also
          url += id;
          console.log(url);
          fetch(url, {
            method: "PUT",
            body: JSON.stringify(requestBody),
            headers: {
              "Content-Type": "application/json",
              authorization: "Bearer " + this.storedJWT
            }
          })
            .then(res => {
              this.status = res.status;
              this.loading = false;
              return res.json();
            })
            .then(res => {
              console.log(res);
              console.log(res.status);

              if (this.status == 200) {
                // this.$emit("addUserSuccess");
                this.userUpdated = true;
                this.failure = false;
              } else if (this.status == 401) {
                if (this.reloadToken) {
                  this.getToken();
                  this.reloadToken = false;
                } else {
                  this.failureMessage = res.message;
                  this.failure = true;
                }
                this.userUpdated = false;
              } else {
                this.userUpdated = false;
                this.failureMessage = res.message;
                this.failure = true;
              }
            })
            .catch(err => {
              console.log(err.message);
              this.failureMessage = err.message;
              this.failure = true;
              this.loading = false;
            });
        } else {
          this.loading = false;
        }
      } else {
        this.loading = false;
        this.failureMessage = "not authorized";
        this.failure = true;
        this.$emit("disconnectSuccess");
      }
    },
    clickDisconnect() {
      if (localStorage.storedName) {
        localStorage.removeItem("storedName");
      }
      if (localStorage.storedPass) {
        localStorage.removeItem("storedPass");
      }
      localStorage.removeItem("storedJWT");
      this.$emit("disconnectSuccess");
    }
  },
  watch: {
    storedJWT: function(newVal) {
      this.validate();
    }
  }
};
</script>

<style scoped>
</style>
