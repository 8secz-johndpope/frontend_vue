<template>
  <v-content>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>My</span>
        <router-link to="/" class="font-weight-light">Youtube</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/account" flat>
        <span>Account</span>
      </v-btn>
      <v-btn to="/videos" v-if="storedJWT" flat>
        <span>Videos</span>
      </v-btn>
      <v-btn to="/watch" flat>
        <span>Watch</span>
      </v-btn>
    </v-toolbar>
  </v-content>
</template>

<script>
export default {
  name: "NavBar",
  props: ["storedName", "storedPass", "storedJWT"],
  data() {
    return {};
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
