<template>
  <v-card flat hover id="comments">
    <v-card-title>
      <div>Comments section</div>
    </v-card-title>
    <div class="comment-add-div">
      <CommentAdd
        v-bind:videoId="videoId"
        v-on:commentAdded="$emit('commentAdded')"
        v-bind:storedName="storedName"
        v-bind:storedPass="storedPass"
        v-bind:storedJWT="storedJWT"
        v-on:authSuccess="$emit('authSuccess')"
      />
    </div>
    <div class="comment-div" v-for="comment in comments" v-bind:key="comment.id">
      <CommentsItem v-bind:comment="comment"/>
    </div>
  </v-card>
</template>

<script>
import CommentsItem from "./CommentsItem";
import CommentAdd from "./CommentAdd";
export default {
  name: "Comments",
  components: {
    CommentsItem,
    CommentAdd
  },
  created: function() {
    //
  },
  props: ["storedName", "storedPass", "storedJWT", "comments", "videoId"]
};
</script>

<style scoped>
#comments {
  width: 100%;
  margin-top: 30px;
  background-color: #eceff1;
}
.comment-div,
.comment-add-div {
  margin: 20px;
  background-color: #f9f9f9;
}
</style>
