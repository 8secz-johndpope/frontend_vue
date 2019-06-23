<template>
  <v-layout>
    <v-layout v-if="!video">
      <div>Video does not exist. Choose another one!</div>
    </v-layout>
    <v-layout column v-if="video">
      <v-layout row>
        <v-flex xs8>
          <v-img
            class="white--text"
            height="200px"
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
      <v-layout row>
        <v-flex xs12>
          <!-- <v-flex>
          <v-btn flat color="blue">Get other formats</v-btn>
          </v-flex>-->
          <v-flex v-if="videoFormats">
            <div
              v-for="videoFormat in videoFormats"
              v-bind:key="videoFormat.id"
            >{{videoFormat.code}}</div>
          </v-flex>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-layout>
</template>

<script>
export default {
  name: "ViewVideo",
  data() {
    return {
      video: "",
      videoId: "",
      videoFormats: []
    };
  },
  watch: {
    $route(to, from) {
      this.video = "";
      this.getVideo();
    }
  },
  created: function() {
    this.getVideo();
    this.getVideoFormats();
  },
  methods: {
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
    getVideoFormats() {
      this.loading = true;
      var url = "http://127.0.0.1:8000/api/video/" + this.videoId + "/formats";
      if (this.storedJWT) {
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
              // this.$emit("loadVids");
              this.videoFormats = res.data;
            } else {
              this.failureMessage = res.message;
              this.failure = true;
            }
          })
          .catch(err => {
            console.log(err.message);
            this.$emit("loadVids");
            this.failureMessage = err.message;
            this.failure = true;
            this.loading = false;
          });
      }
    }
  }
};
</script>

<style scoped>
</style>
