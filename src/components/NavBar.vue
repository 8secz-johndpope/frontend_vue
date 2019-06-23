<template>
  <span>
    <v-toolbar>
      <v-toolbar-title class="headline text-uppercase">
        <span>My</span>
        <router-link to="/" class="font-weight-light">Youtube</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-layout column class="search">
        <v-flex xs12>
          <v-text-field
            solo
            hide-details
            append-icon="search"
            single-line
            v-model="search"
            @input="searchVideo"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 v-if="results[0]" class="searchResults">
          <SearchList v-bind:results="results" v-on:resultClicked="search = ''"/>
        </v-flex>
      </v-layout>
      <v-btn to="/account" flat>
        <span>Account</span>
      </v-btn>
      <v-btn to="/videos" v-if="storedJWT" flat>
        <span>Videos</span>
      </v-btn>
      <v-btn to="/watch" flat>
        <span>Watch</span>
      </v-btn>
    </v-toolbar>
  </span>
</template>

<script>
import SearchList from "./SearchList";
export default {
  name: "NavBar",
  components: {
    SearchList
  },
  props: ["storedName", "storedPass", "storedJWT"],
  data() {
    return {
      search: "",
      status: "",
      results: []
    };
  },
  methods: {
    searchVideo() {
      if (this.search == "") {
        this.results = "";
      }
      if (this.search != "" && this.search != " ") {
        var requestBody = {
          name: this.search
        };
        var url = "http://127.0.0.1:8012/api/search/";
        fetch(url, {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(res => {
            this.status = res.status;
            // console.log(this.status);
            return res.json();
          })
          .then(res => {
            // console.log(res);
            console.log(res);
            this.results = res.hits.hits;
          })
          .catch(err => {
            console.log(err.message);
          });
      }
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}
.search {
  position: relative;
  z-index: 100;
}
.searchResults {
  width: 100%;
  top: 48px;
  position: absolute;
  z-index: 100;
  background-color: white;
}
.searchResultItem {
  margin-bottom: 10px;
}
</style>
