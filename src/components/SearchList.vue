<template>
  <v-card>
    <v-card-text>
      <SearchListItem
        v-on:resultClicked="$emit('resultClicked')"
        class="searchResultItem"
        v-for="result in results"
        v-bind:key="result._id"
        v-bind:result="result"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import SearchListItem from "./SearchListItem";
export default {
  name: "SearchList",
  components: {
    SearchListItem
  },
  props: ["results"],
  data() {
    return {};
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
</style>
