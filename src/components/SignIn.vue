<template>
  <v-app>
    <div v-if="loading" class="loading">
      <h1>Loading</h1>
    </div>
    <h3>Sign In</h3>
    <div v-if="failure" class="failure">{{failureMessage}}</div>
    <div v-if="userCreated" class="success">User created sucessfully</div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field v-model="username" label="Username" required></v-text-field>
      <v-text-field v-model="password" label="Password" required></v-text-field>
      <v-btn :disabled="!valid" color="success" @click="validate">Validate</v-btn>
      <v-btn color="error" @click="reset">Reset Form</v-btn>
    </v-form>
  </v-app>
</template>

<script>
export default {
  name: "SignIn",
  props: ["userCreated", "failure"],
  data: () => ({
    valid: true,
    // failure: false,
    failureMessage: "",
    status: 0,
    loading: false,
    username: "",
    password: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ]
  }),
  methods: {
    reset() {
      this.username = "";
      this.password = "";
    },
    validate() {
      this.loading = true;
      if (this.valid && this.name != "" && this.password != "") {
        var requestBody = {
          login: this.username,
          password: this.password
        };
        fetch("http://127.0.0.1:8000/api/auth", {
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
            console.log(res.data);
            if (this.status == 201) {
              localStorage.storedName = this.username;
              localStorage.storedPass = this.password;
              localStorage.storedJWT = res.data;
              this.$emit("authSuccess");
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
div.success {
  background: #55c1ff;
  text-align: center;
  border-radius: 3px;
  color: white;
  display: inline-block;
  vertical-align: middle;
}
div.failure {
  background: #ff5555;
  text-align: center;
  border-radius: 3px;
  color: white;
  display: inline-block;
  vertical-align: middle;
}
div.loading {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(51, 51, 51, 0.3);
  display: flex;
  z-index: 10;
}
div.loading h1 {
  margin: auto;
  color: white;
}
</style>
