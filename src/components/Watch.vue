<template>
  <div>
    <v-btn @click="loadVideos" color="success" block>
      <span>Load videos</span>
    </v-btn>
    <div>
      <div v-if="loading" class="loading">
        <h1>Loading</h1>
      </div>
      <v-container fluid>
        <v-layout row wrap fill-height>
          <WatchVideoItem v-for="video in videos" v-bind:key="video.id" v-bind:video="video"/>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
import WatchVideoItem from "./WatchVideoItem";
export default {
  name: "WatchVideos",
  components: {
    WatchVideoItem
  },
  created: function() {
    // if (!this.loadedVideosWatch) {
    this.loadVideos();
    // }
  },
  props: ["loadedVideosWatch"],
  data() {
    return {
      failure: "",
      failureMessage: "",
      status: 0,
      loading: false,
      success: false,
      videos: []
    };
  },
  methods: {
    loadVideos() {
      this.loading = true;
      var url = "http://127.0.0.1:8000/api/videos/";
      fetch(url, {
        method: "GET"
      })
        .then(res => {
          this.status = res.status;
          this.loading = false;
          return res.json();
        })
        .then(res => {
          console.log(res);
          if (this.status == 200) {
            this.$emit("loadVidsWatch");
            this.videos = res.data;
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
    }
  }
};
</script>

<style scoped>
</style>
