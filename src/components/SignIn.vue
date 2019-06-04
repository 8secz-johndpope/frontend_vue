<template>
  <v-app>
    <h3>Sign In</h3>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
      <v-text-field v-model="password" :rules="emailRules" label="Password" required></v-text-field>
      <v-btn :disabled="!valid" color="success" @click="validate">Validate</v-btn>
      <v-btn color="error" @click="reset">Reset Form</v-btn>
      <v-btn color="warning" @click="resetValidation">Reset Validation</v-btn>
    </v-form>
  </v-app>
</template>

<script>
export default {
  name: "SignIn",
  data: () => ({
    valid: true,
    email: "",
    password: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ]
  })
};
</script>

<style scoped>
</style>
