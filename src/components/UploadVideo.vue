<template>
  <div>
    <div v-if="loading" class="loading">
      <h1>Loading</h1>
    </div>
    <h3>Upload file</h3>
    <div v-if="failure" class="failure">{{failureMessage}}</div>
    <div v-if="success" class="success">Video uploaded sucessfully</div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field v-model="title" label="Title" required></v-text-field>
      <!-- <v-text-field v-model="videoFile" label="Select video" required></v-text-field> -->
      <v-btn block color="info" @click="selectFile">Select video file</v-btn>
      <input id="video-upload" type="file" @change="onFileChange">
      <v-btn :disabled="!valid" color="success" @click="validate">Validate</v-btn>
      <v-btn color="error" @click="reset">Reset Form</v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "UploadVideo",
  props: ["storedName", "storedPass", "storedJWT", "loadedVideos"],
  data: () => ({
    valid: true,
    failureMessage: "",
    failure: false,
    success: false,
    status: 0,
    loading: false,
    title: "",
    videoFile: ""
  }),
  methods: {
    reset() {
      this.title = "";
      this.videoFile = "";
    },
    selectFile() {
      document.getElementById("video-upload").click();
    },
    onFileChange(e) {
      this.failure = false;
      this.success = false;
      this.videoFile = e.target.files[0] || e.dataTransfer.files[0];
      if (!this.videoFile || !this.videoFile.type.match(/video/)) {
        this.failure = true;
        this.failureMessage = "Problem with file selection";
        return;
      }
    },
    validate() {
      this.loading = true;
      if (this.valid && this.title != "" && this.videoFile != "") {
        var requestBody = {
          name: this.title,
          source: this.videoFile
        };
        var formData = new FormData();
        formData.append("name", this.title);
        formData.append("source", this.videoFile);
        if (this.storedJWT) {
          var url = "http://127.0.0.1:8000/api/user/";
          var JWTbody = this.storedJWT.match(/\..+\./g)[0].replace(/\./g, ""); // insert inside computed valued
          var id = JSON.parse(atob(JWTbody)).id; // also
          url += id + "/video";
          fetch(url, {
            method: "POST",
            body: formData,
            headers: {
              //   "Content-Type": "application/json",
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
              console.log(res.data);
              if (this.status == 201) {
                // this.$emit("authSuccess");
                this.failureMessage = res.message;
                this.success = true;
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
      } else {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
#video-upload {
  display: none;
}
</style>
