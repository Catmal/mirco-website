<template>
  <div class="row q-pa-md q-col-gutter-md">
    <div
      v-for="image in images"
      :key="image.id"
      class="col-lg-2 col-md-3 col-sm-4 col-xs-4 flex flex-center"
      @click="currentImage = image, showImage = true"
    >
      <q-img width="100px" height="100%" :src="image.url" />
    </div>
    <q-dialog v-model="showImage">
      <q-card style="width: auto">
        <q-card-section class="full-width">
          <q-img :src="currentImage.url" width="100%" />
          <q-btn class="q-mt-md" color="accent">Delete</q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { db } from "boot/firebase";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      currentImage: {},
      showImage: false,
    };
  },
  computed: {
    ...mapState(["images"]),
  },
  mounted() {
    this.$store.dispatch("loadImages");
  },
};
</script>
