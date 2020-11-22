<template>
  <div>
    <q-toolbar class="bg-dark">
      <q-toolbar-title>
        <h5 class="text-white text-center">Add Skill</h5>
      </q-toolbar-title>
    </q-toolbar>
    <q-card style="width: 400px" class="q-pa-lg">
      <q-card-section class="row items-center">
        <q-form class="full-width">
          <q-btn-toggle
            v-model="newSkill.category"
            spread
            no-caps
            class="q-mt-lg"
            toggle-color="primary"
            color="white"
            text-color="primary"
            :options="[
							{ label: 'Frontend', value: '1' },
							{ label: 'Backend', value: '2' }
						]"
          />
          <q-input v-model="newSkill.name" color="info" placeholder="Name"></q-input>
          <vue-dropzone
            class="q-my-md"
            ref="imgDropZone"
            id="customdropzone"
            :options="dropzoneOptions"
            @vdropzone-complete="afterComplete"
          ></vue-dropzone>

          <q-btn
            v-close-popup
            color="secondary"
            class="full-width q-mt-md"
            type="submit"
            @click.prevent="addSkill(newSkill)"
          >Add</q-btn>
        </q-form>
        <div v-if="images.length > 0" class="image-div">
          <div v-for="image in images" :key="image.src">
            <img :src="image.src" class="image" />
          </div>
        </div>
      </q-card-section>
    </q-card>
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
			newSkill: {},
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
		async addSkill(newSkill) {
			this.saving = true;
			let newSkillRef = db.collection("skills").doc();
			newSkillRef
				.set({
					id: newSkillRef.id,
					name: newSkill.name,
					image_url: newSkill.image_url,
					category: newSkill.category
				})
				.then(ref => {
					this.saving = false;
				});
		},
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
				this.newSkill.image_url = downloadURL;
			} catch (error) {
				console.log(error);
			}
			this.$refs.imgDropZone.removeFile(upload);
		}
	}
};
</script>
