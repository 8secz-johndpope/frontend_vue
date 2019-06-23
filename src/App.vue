<template>
  <v-app>
    <NavBar
      class="navbar_"
      v-bind:storedName="storedName"
      v-bind:storedPass="storedPass"
      v-bind:storedJWT="storedJWT"
    />
    <v-container>
      <router-view
        v-on:authSuccess="refreshAuth"
        v-on:disconnectSuccess="refreshAuth"
        v-on:loadVids="loadVids"
        v-on:loadVidsWatch="loadVidsWatch"
        v-bind:storedName="storedName"
        v-bind:storedPass="storedPass"
        v-bind:storedJWT="storedJWT"
        v-bind:loadedVideos="loadedVideos"
        v-bind:loadedVideosWatch="loadedVideosWatch"
      ></router-view>
    </v-container>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar";

export default {
  name: "App",
  components: {
    NavBar
  },
  data() {
    return {
      storedName: "",
      storedPass: "",
      storedJWT: "",
      loadedVideos: false,
      loadedVideosWatch: false
    };
  },
  created: function() {
    this.refreshAuth();
  },
  methods: {
    refreshAuth() {
      console.log("refreshed");
      this.storedName = localStorage.storedName;
      this.storedPass = localStorage.storedPass;
      this.storedJWT = localStorage.storedJWT;
    },
    loadVids() {
      this.loadedVideos = true;
    },
    loadVidsWatch() {
      this.loadedVideosWatch = true;
    }
  }
};
</script>

<style>
.navbar_ {
  z-index: 5;
}
div.success {
  background: #55c1ff;
  text-align: center;
  border-radius: 3px;
  color: white;
  display: inline-block;
  vertical-align: middle;
  width: 100%;
}
div.failure {
  background: #ff5555;
  text-align: center;
  border-radius: 3px;
  color: white;
  display: inline-block;
  vertical-align: middle;
  width: 100%;
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

