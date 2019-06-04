<template>
  <v-app>
    <v-btn @click="clickDisconnect">
      <span>Disconnect</span>
    </v-btn>
  </v-app>
</template>

<script>
export default {
  name: "MyAccount",
  data() {
    return {};
  },
  methods: {
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
  }
};
</script>

<style scoped>
</style>
