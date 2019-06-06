<template>
  <v-flex xs12 sm6 lg4 xl3 pa-2>
    <v-card flat hover>
      <v-img
        class="white--text"
        height="200px"
        :src="'http://127.0.0.1:8000/api/storage/'+video.thumbnail"
      ></v-img>
      <v-card-title class="bottomSectionCard blue-grey lighten-5 pt-1" fill-height>
        <v-layout>
          <v-flex xs10>
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
          </v-flex>
          <v-flex xs2>
            <v-btn flat color="grey darken-1" class="shareBtn">Share</v-btn>
          </v-flex>
        </v-layout>
      </v-card-title>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  name: "WatchVideoItem",
  props: ["video"],
  data() {
    return {
      //
    };
  },
  methods: {
    //
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
.shareBtn {
  min-width: 0;
  min-height: 0;
  height: 100%;
  width: 100%;
}
</style>
