<template>
  <v-flex xs12 class="searchItem">
    <router-link :to="link" v-on:click.native="$emit('resultClicked')">
      <v-layout row>
        <div>{{result._source.title}}</div>
        <v-spacer></v-spacer>
        <div>video de : {{result._source.user}}</div>
      </v-layout>
    </router-link>
  </v-flex>
</template>

<script>
export default {
  name: "SearchListItem",
  props: ["result"],
  data() {
    return {
      link: "/view/" + this.result._id
    };
  },
  methods: {
    // searchVideo() {
    //
    // }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}
.searchItem {
  padding: 4px;
}
.searchItem:hover {
  background-color: #f3f3f3;
}
</style>
