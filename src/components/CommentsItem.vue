<template>
  <v-card-text>
    <div>{{comment.body}}</div>
  </v-card-text>
</template>

<script>
export default {
  name: "CommentsItem",
  created: function() {
    //
  },
  props: ["comment"]
};
</script>

<style scoped>
</style>
