<template>
  <v-content>
    <v-layout row wrap fill-height>
      <v-flex xs12>
        <div class="title">
          <h1>Home Page</h1>
        </div>
      </v-flex>
      <v-flex xs12>
        <div class="title">
          <p>Please connect or use the watch button to start watching videos</p>
        </div>
      </v-flex>
      <div></div>
    </v-layout>
  </v-content>
</template>

<script>
export default {
  name: "Home"
};
</script>

<style scoped>
.title {
  text-align: center;
}
</style>
