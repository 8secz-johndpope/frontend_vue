<template>
  <v-flex xs12 sm6 md4 lg3 pa-2>
    <v-card>
      <v-img
        class="white--text"
        height="200px"
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      >
        <v-container fill-height fluid>
          <v-layout fill-height>
            <v-flex xs12 align-end flexbox>
              <span class="headline">{{video.name}}</span>
            </v-flex>
          </v-layout>
        </v-container>
      </v-img>
      <v-card-title>
        <v-layout column>
          <v-layout>
            <div class="grey--text">{{video.duration}} sec</div>
            <v-spacer></v-spacer>
            <div class="grey--text">{{video.created_at}}</div>
          </v-layout>
          <div>
            <div>{{video.description || 'No description...'}}</div>
            <v-layout align-end justify-end>
              <div class="grey--text">{{video.view}} views</div>
            </v-layout>
          </div>
        </v-layout>
      </v-card-title>
      <v-card-actions>
        <v-btn flat color="blue">View</v-btn>
        <v-spacer></v-spacer>
        <v-btn flat color="grey">Share</v-btn>
      </v-card-actions>
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
</style>
