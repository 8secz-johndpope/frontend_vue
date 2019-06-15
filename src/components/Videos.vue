<template>
  <div>
    <div v-if="storedJWT && manageComponent == null">
      <v-btn @click="loadVideos" color="success" block>
        <span>Load videos</span>
      </v-btn>
      <v-btn to="/upload" color="info" block>
        <span>Upload new video</span>
      </v-btn>
      <div>
        <div v-if="loading" class="loading">
          <h1>Loading</h1>
        </div>
        <div v-if="failure" class="failure">{{failureMessage}}</div>
        <v-container fluid>
          <v-layout row wrap fill-height>
            <VideoItem
              v-for="(video, index) in videos"
              v-on:loadVids="loadVideos"
              v-bind:storedJWT="storedJWT"
              v-bind:key="video.id"
              v-bind:video="video"
              v-bind:index="index"
              v-on:manageVideo="manageVideo"
            />
          </v-layout>
        </v-container>
      </div>
    </div>
    <div v-if="storedJWT && manageComponent != null">
      <ManageVideo
        v-bind:componentId="manageComponent"
        v-bind:video="videos[manageComponent]"
        v-bind:storedJWT="storedJWT"
      />
    </div>
    <div v-if="!storedJWT">Please sign in</div>
  </div>
</template>

<script>
import VideoItem from "./VideoItem";
import ManageVideo from "./ManageVideo";
import { getToken } from "../services/getToken";
export default {
  name: "Videos",
  components: {
    VideoItem,
    ManageVideo
  },
  created: function() {
    // if (!this.loadedVideos) {
    this.loadVideos();
    // }
  },
  props: ["storedName", "storedPass", "storedJWT", "loadedVideos"],
  data() {
    return {
      failure: "",
      failureMessage: "",
      status: 0,
      loading: false,
      success: false,
      reloadToken: true,
      videos: [],
      manageComponent: null
    };
  },
  methods: {
    getToken,
    loadVideos() {
      console.log(this.storedJWT);
      this.loading = true;
      var url = "http://127.0.0.1:8000/api/user/";
      if (this.storedJWT) {
        var JWTbody = this.storedJWT.match(/\..+\./g)[0].replace(/\./g, ""); // insert inside computed valued
        var id = JSON.parse(atob(JWTbody)).id; // also
        url += id + "/videos";
        console.log(url);
        fetch(url, {
          method: "GET",
          headers: {
            authorization: "Bearer " + this.storedJWT
          }
        })
          .then(res => {
            this.status = res.status;
            this.loading = false;
            return res.json();
          })
          .then(res => {
            console.log(res);
            if (this.status == 200) {
              this.$emit("loadVids");
              this.videos = res.data;
              this.failure = false;
            } else if (this.status == 401) {
              if (this.reloadToken) {
                this.getToken();
                this.reloadedToken = false;
              }
              this.failureMessage = res.message;
              this.failure = true;
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
    },
    addVideos() {
      this.loading = true;
      var url = "http://127.0.0.1:8000/api/user/";
      if (this.storedJWT) {
        var JWTbody = this.storedJWT.match(/\..+\./g)[0].replace(/\./g, ""); // insert inside computed valued
        var id = JSON.parse(atob(JWTbody)).id; // also
        url += id + "/videos";
        console.log(url);
        fetch(url, {
          method: "GET",
          headers: {
            authorization: "Bearer " + this.storedJWT
          }
        })
          .then(res => {
            this.status = res.status;
            this.loading = false;
            return res.json();
          })
          .then(res => {
            console.log(res);
            if (this.status == 200) {
              this.$emit("loadVids");
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
      } else {
        this.loading = false;
      }
    },
    manageVideo(videoId) {
      console.log(videoId);
      this.manageComponent = videoId;
    }
  },
  watch: {
    storedJWT: function(newVal) {
      this.loadVideos();
    }
  }
};
</script>

<style scoped>
</style>
