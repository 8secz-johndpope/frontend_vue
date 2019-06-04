<template>
  <v-app>
    <h3>Register</h3>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" required></v-text-field>
      <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
      <v-text-field v-model="password" :rules="passRules" label="Password" required></v-text-field>
      <v-text-field v-model="rePassword" :rules="rePassRules" label="Re enter Password" required></v-text-field>
      <v-checkbox
        v-model="checkbox"
        :rules="[v => !!v || 'You must agree to continue!']"
        label="Do you agree?"
        required
      ></v-checkbox>
      <v-btn :disabled="!valid" color="success" @click="validate">Validate</v-btn>
      <v-btn color="error" @click="reset">Reset Form</v-btn>
    </v-form>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  name: "Register",
  data: () => ({
    valid: true,
    name: "",
    email: "",
    password: "",
    rePassword: "",
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 10) || "Name must be less than 10 characters"
    ],
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    passRules: [
      v => !!v || "field is required",
      v =>
        (v &&
          v.length >= 6 &&
          /.*[0-9].*/.test(v) &&
          /.*[A-Z].*/.test(v) &&
          /.*[a-z].*/.test(v)) ||
        "Password must be at least 6 caracters long and contain at least 1 letter, 1 Maj and 1 number"
    ],
    select: null,
    checkbox: false
  }),
  computed: {
    rePassRules: function() {
      return [
        v => !!v || "field is required",
        v => v == this.password || "Must match password"
      ];
    }
  },
  methods: {
    reset() {
      this.name = "";
      this.email = "";
      this.password = "";
      this.rePassword = "";
    },
    validate() {
      if (
        this.name != "" &&
        this.email != "" &&
        this.password != "" &&
        this.rePassword != "" &&
        this.valid
      ) {
        axios
          .post("http://mywebsite/api/users", {
            headers: {
              "Content-Type": "application/json"
            },
            body: {
              username: this.name,
              pseudo: this.name,
              email: this.email,
              password: this.password
            }
          })
          .then(res => console.log(res))
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>

<style scoped>
</style>
