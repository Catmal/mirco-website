<template>
	<q-card style="width: 600px; max-width: 80vw;" class="q-pa-md">
		<q-toolbar class="bg-dark text-white text-center">
			<q-toolbar-title>
				Add Image to Portfolio
			</q-toolbar-title>
			<q-space />
			<q-btn color="secondary" @click="add_new_image = !add_new_image"
				>Add New</q-btn
			>
		</q-toolbar>
		<q-card-section class="full-width">
			<div class="row q-col-gutter-sm">
				<div
					class="col-3"
					v-for="image in images"
					:key="image.id"
					v-if="!add_new_image"
				>
					<q-img
						@click="addPortfolioItemImage(image)"
						class="cursor-pointer"
						:src="image.url"
						v-close-popup
					>
					</q-img>
				</div>
				<div v-if="add_new_image" class="col-12">
					<AddNewImage />
				</div>
			</div>
		</q-card-section>
	</q-card>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { db } from "boot/firebase";

export default {
	data() {
		return {
			add_new_image: false
		};
	},
	computed: {
		...mapState(["images"]),
		...mapState("PortfolioStore", ["currentPortfolioItem"])
	},
	components: {
		AddNewImage: () => import("../../components/AddNewImage")
	},
	methods: {
		async addPortfolioItemImage(image) {
			let newPortfolioItemImageRef = db
				.collection("portfolio_items")
				.doc(this.currentPortfolioItem.id)
				.collection("portfolio_item_images")
				.doc();

			newPortfolioItemImageRef
				.set({
					id: newPortfolioItemImageRef.id,
					image_url: image.url
				})
				.then(ref => {});
		}
	}
};
</script>
