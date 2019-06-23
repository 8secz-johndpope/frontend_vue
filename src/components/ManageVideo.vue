<template>
  <v-layout column>
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
                <v-btn flat color="blue">View</v-btn>
              </v-flex>
              <v-flex>
                <v-btn flat color="grey">Share</v-btn>
              </v-flex>
              <!-- <v-flex>
                <v-btn flat @click="deleteVideo(video.id)" color="red">Delete</v-btn>
              </v-flex> -->
            </v-layout>
          </v-card-actions>
        </v-flex>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <v-flex>
          <v-btn flat color="blue">Get other formats</v-btn>
        </v-flex>
        <v-flex v-if="videoFormats">
          <div v-for="videoFormat in videoFormats" v-bind:key="videoFormat.id">{{videoFormat.code}}</div>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
export default {
  name: "ManageVideo",
  props: ["video", "storedJWT", "componentId"],
  data() {
    return {
      videoFormats: []
    };
  },
  created: function() {
    // if (!this.loadedVideos) {
    this.getVideoFormats();
    // }
  },
  methods: {
    getVideoFormats() {
      this.loading = true;
      var url = "http://127.0.0.1:8000/api/video/" + this.video.id + "/formats";
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
.videoTitle {
  font-size: 1.2rem;
}
.videoDetails {
  font-size: 0.8rem;
}
/* .bottomSectionCard {
  background: grey;
  color: white;
  flex-direction: column;
  align-items: baseline;
  align-content: space-between;
} */
/* .card-image {
  box-shadow: 1px 1px #cecece;
} */
</style>
