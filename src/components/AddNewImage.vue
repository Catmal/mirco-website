<template>
  <div class="row q-col-gutter-sm">
    <vue-dropzone
      class="q-my-md"
      ref="imgDropZone"
      id="customdropzone"
      :options="dropzoneOptions"
      @vdropzone-complete="afterComplete"
    ></vue-dropzone>
  </div>
</template>
<script>
import firebase from "firebase";
import { db } from "boot/firebase";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
let uuid = require("uuid");
export default {
	data() {
		return {
			dropzoneOptions: {
				url: "https://httpbin.org/post",
				thumbnailWidth: 150,
				thumbnailHeight: 150,
				addRemoveLinks: false,
				acceptedFiles: ".jpg, .jpeg, .png",
				dictDefaultMessage: `Drop`
			},
			images: []
		};
	},
	components: {
		vueDropzone: vue2Dropzone
	},
	methods: {
		async afterComplete(upload) {
			var imageName = uuid.v1();
			this.isLoading = true;
			try {
				//save image
				let file = upload;
				console.log(file);

				var metadata = {
					contentType: "image/png"
				};
				var storageRef = firebase.storage().ref();
				var imageRef = storageRef.child(`images/${imageName}.png`);
				await imageRef.put(file, metadata);
				var downloadURL = await imageRef.getDownloadURL();
				this.images.push({ src: downloadURL });
			} catch (error) {
				console.log(error);
			}
			this.$refs.imgDropZone.removeFile(upload);
			this.$store.commit("ADD_IMAGE");
		}
	}
};
</script>
