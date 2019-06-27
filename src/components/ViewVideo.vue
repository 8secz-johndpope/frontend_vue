<template>
  <v-layout>
    <v-layout v-if="!video">
      <div>Video not found. Choose another one!</div>
    </v-layout>
    <v-layout column>
      <v-layout column v-if="video">
        <v-layout row>
          <v-flex xs8>
            <v-img
              class="white--text"
              height="300px"
              :src="'http://127.0.0.1:8000/api/storage/'+video.thumbnail"
            ></v-img>
          </v-flex>
          <v-flex>
            <v-card-title class="bottomSectionCard blue-grey lighten-5 pt-1" fill-height>
              <v-flex xs12>
                <v-layout fill-height class="videoDetails">
                  <div class="grey--text text--darken-1">{{video.created_at.substring(0,10)}}</div>
                  <v-spacer></v-spacer>
                  <div class="grey--text text--darken-1">{{video.view}} views</div>
                  <v-spacer></v-spacer>
                  <div class="grey--text text--darken-1">{{video.duration}} sec</div>
                </v-layout>
              </v-flex>
              <v-flex xs12>
                <v-layout align-content-start>
                  <div class="videoTitle grey--text text--darken-3">{{video.name}}</div>
                </v-layout>
              </v-flex>
            </v-card-title>
            <v-flex xs4>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-layout column justify-start>
                  <v-flex>
                    <v-btn flat color="grey">Share</v-btn>
                  </v-flex>
                </v-layout>
              </v-card-actions>
            </v-flex>
          </v-flex>
        </v-layout>
      </v-layout>
      <v-layout v-if="comments">
        <Comments
          v-bind:comments="comments"
          v-bind:videoId="videoId"
          v-on:commentAdded="getVideoComments"
          v-bind:storedName="storedName"
          v-bind:storedPass="storedPass"
          v-bind:storedJWT="storedJWT"
          v-on:authSuccess="$emit('authSuccess')"
        />
      </v-layout>
    </v-layout>
  </v-layout>
</template>

<script>
import Comments from "./Comments";
export default {
  name: "ViewVideo",
  components: {
    Comments
  },
  props: ["storedName", "storedPass", "storedJWT"],
  data() {
    return {
      video: "",
      videoId: "",
      videoFormats: [],
      comments: []
    };
  },
  watch: {
    $route(to, from) {
      this.video = "";
      this.getVideo();
    }
  },
  created: function() {
    this.loaded();
  },
  methods: {
    loaded() {
      this.getVideo();
      this.getVideoComments();
    },
    getVideo() {
      this.videoId = this.$route.params.id;
      var url = "http://127.0.0.1:8000/api/videos?id=" + this.videoId;
      fetch(url, {
        method: "GET"
      })
        .then(res => {
          this.status = res.status;
          // console.log(this.status);
          return res.json();
        })
        .then(res => {
          // console.log(res);
          console.log(res);
          if (res.data[0]) {
            this.video = res.data[0];
          }
        })
        .catch(err => {
          console.log(err.message);
        });
    },
    getVideoComments() {
      this.videoId = this.$route.params.id;
      var url = "http://127.0.0.1:8000/api/video/" + this.videoId + "/comments";
      fetch(url, {
        method: "GET"
      })
        .then(res => {
          this.status = res.status;
          return res.json();
        })
        .then(res => {
          console.log(res);
          if (res.data[0]) {
            this.comments = res.data;
          }
        })
        .catch(err => {
          console.log(err.message);
        });
    }
  }
};
</script>

<style scoped>
</style>
