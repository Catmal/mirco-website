<template>
	<div style="width: 1000px">
		<q-toolbar class="bg-dark full-width">
			<q-toolbar-title>
				<h5 class="text-info text-center">Add Portfolio Item</h5>
			</q-toolbar-title>
		</q-toolbar>
		<q-card class="q-pa-lg">
			<q-card-section class="row items-center">
				<q-form class="full-width">
					<q-btn-toggle
						v-model="newPortfolioItem.category"
						spread
						no-caps
						class="q-mt-lg"
						toggle-color="primary"
						color="white"
						text-color="primary"
						:options="[
							{ label: 'Website', value: '1' },
							{ label: 'WebApp', value: '2' }
						]"
					/>
					<q-input
						v-model="newPortfolioItem.name"
						color="info"
						placeholder="Name"
					>
						<!-- <template v-slot:prepend>
							<q-icon name="email" color="primary" size="xl" />
						</template>-->
					</q-input>
					<q-input
						v-model="newPortfolioItem.description"
						color="info"
						placeholder="Description"
						type="textarea"
					>
						<!-- <template v-slot:prepend>
							<q-icon name="email" color="primary" size="xl" />
						</template>-->
					</q-input>
					<q-btn
						@click="addNewImage = true"
						color="positive"
						class="q-mt-lg full-width"
						>Add New Image</q-btn
					>

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
						@click.prevent="addPortfolioItem(newPortfolioItem)"
						>Add</q-btn
					>
				</q-form>
				<div v-if="images.length > 0" class="image-div">
					<div v-for="image in images" :key="image.src">
						<img :src="image.src" class="image" />
					</div>
				</div>
				<q-dialog v-model="addNewImage">
					<q-card
						style="width: 600px; max-width: 80vw;"
						class="q-pa-md"
					>
						<q-toolbar class="bg-dark text-white text-center">
							<q-toolbar-title
								>Add Image to Portfolio</q-toolbar-title
							>
							<q-space />
						</q-toolbar>
						<q-card-section class="full-width">
							<div class="row q-col-gutter-sm">
								<div
									class="col-3"
									v-for="image in images"
									:key="image.id"
								>
									<q-img
										@click="addPortfolioItemImage(image)"
										class="cursor-pointer"
										:src="image.url"
										v-close-popup
									></q-img>
								</div>
							</div>
						</q-card-section>
					</q-card>
				</q-dialog>
			</q-card-section>
		</q-card>
	</div>
</template>
<script>
import { mapState, mapActions } from "vuex";

import firebase from "firebase";
import { db } from "boot/firebase";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
let uuid = require("uuid");
export default {
	data() {
		return {
			newPortfolioItem: {},
			addNewImage: false,
			dropzoneOptions: {
				url: "https://httpbin.org/post",
				thumbnailWidth: 150,
				thumbnailHeight: 150,
				addRemoveLinks: false,
				acceptedFiles: ".jpg, .jpeg, .png",
				dictDefaultMessage: `Drop`
			}
		};
	},
	components: {
		vueDropzone: vue2Dropzone,
		AddPortfolioItemImage: () => import("./AddPortfolioItemImage")
	},
	computed: {
		...mapState(["images"])
	},
	methods: {
		async addPortfolioItem(newPortfolioItem) {
			this.saving = true;
			let newPortfolioItemRef = db.collection("portfolio_items").doc();
			newPortfolioItemRef
				.set({
					id: newPortfolioItemRef.id,
					name: newPortfolioItem.name,
					image_url: newPortfolioItem.image_url,
					description: newPortfolioItem.description,
					category: newPortfolioItem.category
				})
				.then(ref => {
					this.saving = false;
				})
				.catch(error => {
					console.log(error);
				});
		},
		async addPortfolioItemImage(image) {
			this.newPortfolioItem.image_url = image.url;
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
				this.newPortfolioItem.image_url = downloadURL;
			} catch (error) {
				console.log(error);
			}
			this.$refs.imgDropZone.removeFile(upload);
		}
	}
};
</script>
