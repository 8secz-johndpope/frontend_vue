<template>
  <div>
    <div v-if="loading" class="loading">
      <h1>Loading</h1>
    </div>
    <h3>Register</h3>
    <div v-if="failure" class="failure">{{failureMessage}}</div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" required></v-text-field>
      <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
      <v-text-field v-model="password" :rules="passRules" label="Password" required></v-text-field>
      <v-text-field v-model="rePassword" :rules="rePassRules" label="Re enter Password" required></v-text-field>
      <v-btn :disabled="!valid" color="success" @click="validate">Validate</v-btn>
      <v-btn color="error" @click="reset">Reset Form</v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "Register",
  props: ["failure"],
  data: () => ({
    valid: true,
    failureMessage: "",
    status: 0,
    loading: false,
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
    ]
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
      this.loading = true;
      if (
        this.name != "" &&
        this.email != "" &&
        this.password != "" &&
        this.rePassword != "" &&
        this.valid
      ) {
        var requestBody = {
          username: this.name,
          pseudo: this.name,
          email: this.email,
          password: this.password
        };
        fetch("http://127.0.0.1:8000/api/users", {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: {
            "Content-Type": "application/json"
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

            if (this.status == 201) {
              this.$emit("addUserSuccess");
            } else {
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
    }
  }
};
</script>

<style scoped>
</style>
