<template>
  <v-content>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>My</span>
        <span class="font-weight-light">Youtube</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/account" flat>
        <span>Account</span>
      </v-btn>
      <v-btn to="/videos" flat>
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
  name: "NavBar"
};
</script>

<style>
</style>
