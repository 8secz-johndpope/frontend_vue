<template>
  <v-card-text>
    <div v-if="failure" class="failure">{{failureMessage}}</div>
    <div v-if="loading" class="loading">
      <h1>Loading</h1>
    </div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <h6>Submit comment</h6>
      <v-textarea v-model="commentContent" :rules="commentRules"></v-textarea>
      <v-btn :disabled="!valid" color="success" @click="addComment">Submit</v-btn>
    </v-form>
  </v-card-text>
</template>

<script>
import { getToken } from "../services/getToken";
export default {
  name: "CommentAdd",
  created: function() {
    //
  },
  props: ["storedName", "storedPass", "storedJWT", "videoId"],
  data() {
    return {
      failure: "",
      failureMessage: "",
      status: 0,
      loading: false,
      success: false,
      valid: false,
      commentRules: [v => (v && v.length > 0) || "must add text"],
      commentContent: "",
      reloadToken: true
    };
  },
  methods: {
    getToken,
    addComment() {
      this.loading = true;
      if (this.storedJWT && this.commentContent) {
        var url =
          "http://127.0.0.1:8000/api/video/" + this.videoId + "/comment";
        var requestBody = {
          body: this.commentContent
        };
        fetch(url, {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: {
            "Content-Type": "application/json",
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
            if (this.status == 201) {
              console.log("comment added");
              this.$emit("commentAdded");
              this.commentContent = "";
            } else if (this.status == 401) {
              if (this.reloadToken) {
                this.getToken();
                this.reloadToken = false;
              } else {
                this.failureMessage = res.message;
                this.failure = true;
              }
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
    }
  },
  watch: {
    storedJWT: function(newVal) {
      this.addComment();
    }
  }
};
</script>

<style scoped>
</style>
