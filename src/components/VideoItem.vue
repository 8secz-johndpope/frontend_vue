<template>
  <v-flex xs12 sm6 lg4 xl3 pa-2>
    <v-card flat hover>
      <v-layout row>
        <v-flex xs8>
          <v-img
            class="white--text"
            height="200px"
            src="https://www.cnetfrance.fr/i/edit/2019/04/eso1644bsmall.jpg"
          ></v-img>
        </v-flex>
        <v-flex xs4>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-layout column justify-start>
              <v-flex>
                <v-btn flat color="blue">View</v-btn>
              </v-flex>
              <v-flex>
                <v-btn flat color="orange">Manage</v-btn>
              </v-flex>
              <v-flex>
                <v-btn flat color="grey">Share</v-btn>
              </v-flex>
              <v-flex>
                <v-btn flat color="red">Delete</v-btn>
              </v-flex>
            </v-layout>
          </v-card-actions>
        </v-flex>
      </v-layout>
      <v-card-title class="bottomSectionCard blue-grey lighten-5 pt-1" fill-height>
        <v-flex xs12>
          <v-layout align-content-start>
            <div class="videoTitle grey--text text--darken-3">{{video.name}}</div>
          </v-layout>
        </v-flex>
        <v-flex xs12>
          <v-layout fill-height class="videoDetails">
            <div class="grey--text text--darken-1">{{video.created_at.substring(0,10)}}</div>
            <v-spacer></v-spacer>
            <div class="grey--text text--darken-1">{{video.view}} views</div>
            <v-spacer></v-spacer>
            <div class="grey--text text--darken-1">{{video.duration}} sec</div>
          </v-layout>
        </v-flex>
      </v-card-title>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  name: "VideoItem",
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
/* .card-image {
  box-shadow: 1px 1px #cecece;
} */
</style>
