<template>
  <div class="bg-dark portfolio-page">
    <div class="row q-pa-md q-col-gutter-md">
      <div class="shadow-1 col-lg-4 col-md-12 col-sm-12 col-xs-12">
        <div class="row rounded-borders">
          <q-toolbar class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
            <h4 class="text-info ellipsis text-weight-medium">
              {{ currentPortfolioItem.name }}
              <q-popup-edit v-if="user.loggedIn">
                <q-input
                  @blur="updatePortfolioItem()"
                  type="text"
                  v-model="currentPortfolioItem.name"
                />
              </q-popup-edit>
            </h4>
          </q-toolbar>
          <q-toolbar class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
            <q-space />
            <q-btn @click="openUrl()" color="primary" class="q-mr-sm">Visit</q-btn>
            <q-btn color="negative" icon="close" @click="closePortfolioItem()"></q-btn>
          </q-toolbar>
          <q-toolbar v-if="user.loggedIn">
            <q-btn
              color="secondary"
              class="q-ml-sm"
              @click="add_portfolio_item_skill = true"
            >add skill</q-btn>
            <q-space />
            <q-btn
              v-if="user.loggedIn"
              color="primary"
              class="q-mr-sm"
              icon="link"
              @click="showLink = true"
            ></q-btn>
            <q-btn
              v-if="user.loggedIn"
              color="accent"
              @click="deletePortfolioItem(), closePortfolioItem()"
            >Delete</q-btn>
          </q-toolbar>
        </div>
        <q-dialog v-model="showLink">
          <q-card class="q-pa-md">
            <q-input @blur="updatePortfolioItem()" hint="url" v-model="currentPortfolioItem.link"></q-input>
          </q-card>
        </q-dialog>

        <div class="row q-pa-md q-mt-lg">
          <div
            @mouseover="hover = portfolio_item_skill"
            @mouseleave="hover = false"
            class="col-lg-2 col-md-1 col-sm-2 col-xs-2"
            v-for="portfolio_item_skill in portfolio_item_skills"
            :key="portfolio_item_skill.id"
          >
            <q-img width="60px" :src="portfolio_item_skill.image_url" />

            <q-btn
              v-if="user.loggedIn"
              color="accent"
              size="xs"
              icon="delete"
              @click="
								deletePortfolioItemSkill(portfolio_item_skill)
							"
            ></q-btn>
          </div>
        </div>
        <div v-if="currentPortfolioItem.description" class="text-info q-mt-xl q-pa-md">
          <p @click="description = true" v-html="currentPortfolioItem.description"></p>
          <q-dialog v-model="description" style="width: 1800px;" v-if="user.loggedIn">
            <q-card class="q-pa-md">
              <vue-editor @blur="updatePortfolioItem()" v-model="currentPortfolioItem.description"></vue-editor>
            </q-card>
          </q-dialog>
        </div>
        <div class="q-my-md" v-else>
          <q-btn color="secondary" @click="description = true">Add Description</q-btn>
          <q-dialog v-model="description" style="width: 1800px;" v-if="user.loggedIn">
            <vue-editor v-model="currentPortfolioItem.description"></vue-editor>
          </q-dialog>
        </div>
      </div>
      <div class="col-lg-8 col-md-12 col-sm-12 col-xs-12">
        <q-img class="rounded-borders shadow-1" width="100%" :src="currentImage.image_url" />
        <q-btn
          v-if="user.loggedIn"
          color="secondary"
          class="q-mt-sm"
          @click="images_open = true"
        >add image</q-btn>
        <draggable
          class="row q-mt-lg q-col-gutter-sm"
          v-model="portfolio_item_images"
          group="people"
          @start="drag = true"
          @end="drag = false"
        >
          <div
            class="col-lg-2 col-md-2 col-sm-2 col-xs-3"
            v-for="portfolio_item_image in portfolio_item_images"
            :key="portfolio_item_image.id"
          >
            <q-img
              class="rounded-borders shadow-1 cursor-pointer"
              @click="setCurrentImage(portfolio_item_image)"
              :src="portfolio_item_image.image_url"
            ></q-img>

            <q-btn
              v-if="user.loggedIn"
              color="accent"
              icon="delete"
              @click="
								deletePortfolioItemImage(portfolio_item_image)
							"
            ></q-btn>
          </div>
        </draggable>

        <q-dialog v-model="websites_open" :position="position">
          <Websites />
        </q-dialog>

        <q-dialog v-model="add_portfolio_item_skill">
          <q-card class="row bg-dark q-pa-md q-col-gutter-sm" style="width: 800px;">
            <div class="col-12 full-width">
              <q-toolbar class="full-width text-info q-mb-md text-center">
                <q-toolbar-title>
                  Add skill to portfolio
                  item
                </q-toolbar-title>
              </q-toolbar>

              <q-separator class="q-my-md" />
            </div>
            <div
              class="col-3 cursor-pointer"
              v-for="skill in unaddedSkills"
              @click="addPortfolioItemSkill(skill)"
              :key="skill.id"
            >
              <q-img :src="skill.image_url" width="80px" />
            </div>
          </q-card>
        </q-dialog>

        <q-dialog v-model="images_open">
          <AddPortfolioItemImage />
        </q-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import { db } from "boot/firebase";
import draggable from "vuedraggable";
import { mapState, mapActions } from "vuex";
import { VueEditor } from "vue2-editor";
import { mapGetters } from "vuex";

export default {
  name: "PortfolioItem",
  data() {
    return {
      description: false,
      add_portfolio_item_skill: false,
      portfolio_item_skills: [],
      portfolio_item_images: [],
      images_open: false,
      currentImage: {},
      add_new_image: false,
      position: "left",
      hover: false,
      showLink: false,
    };
  },
  computed: {
    ...mapGetters(["user"]),
    ...mapState(["images"]),
    ...mapState("SkillStore", ["skills"]),
    ...mapState("PortfolioStore", [
      "portfolio_items",
      "loading",
      "websites_open",
      "currentPortfolioItem",
    ]),

    unaddedSkills() {
      let difference = this.skills.filter(
        (x) => !this.portfolio_item_skills.includes(x)
      );
      return difference;
    },
  },
  components: {
    VueEditor,
    Menu: () => import("../../components/Menu"),
    Websites: () => import("../../components/Portfolio/Websites"),
    AddNewImage: () => import("../../components/AddNewImage"),
    AddPortfolioItemImage: () => import("./AddPortfolioItemImage"),
  },
  mounted() {
    this.$store.dispatch("SkillStore/loadSkills");
    // this.$store.dispatch("loadImages");
    this.loadPortfolioItemImages();
    this.loadPortfolioItemSkills();
    this.currentImage.image_url = this.currentPortfolioItem.image_url;
  },

  methods: {
    ...mapActions("PortfolioStore", [
      "updatePortfolioItem",
      "deletePortfolioItem",
    ]),
    openUrl() {
      window.open(this.currentPortfolioItem.link, "_blank");
    },
    setCurrentImage(portfolio_item_image) {
      this.currentImage = portfolio_item_image;
    },
    async addPortfolioItemSkill(skill) {
      this.saving = true;
      this.portfolio_item_skills = [];
      let newPortfolioItemSkillRef = db
        .collection("portfolio_items")
        .doc(this.currentPortfolioItem.id)
        .collection("portfolio_item_skills")
        .doc();
      newPortfolioItemSkillRef
        .set({
          id: newPortfolioItemSkillRef.id,
          image_url: skill.image_url,
        })
        .then((ref) => {});
    },
    deletePortfolioItemImage(portfolio_item_image) {
      this.portfolio_item_images = [];
      db.collection("portfolio_items")
        .doc(this.currentPortfolioItem.id)
        .collection("portfolio_item_images")
        .doc(portfolio_item_image.id)
        .delete()
        .then(function () {
          console.log("Document successfully deleted!");
        })
        .catch(function (error) {
          console.error("Error removing document: ", error);
        });
    },
    deletePortfolioItemSkill(portfolio_item_skill) {
      this.portfolio_item_skills = [];
      db.collection("portfolio_items")
        .doc(this.currentPortfolioItem.id)
        .collection("portfolio_item_skills")
        .doc(portfolio_item_skill.id)
        .delete()
        .then(function () {
          console.log("Document successfully deleted!");
        })
        .catch(function (error) {
          console.error("Error removing document: ", error);
        });
    },
    closePortfolioItem() {
      this.$store.commit("PortfolioStore/CLOSE_PORTFOLIO_ITEM");
    },
    open(position) {
      this.position = position;
    },

    loadPortfolioItemSkills() {
      db.collection("portfolio_items")
        .doc(this.currentPortfolioItem.id)
        .collection("portfolio_item_skills")
        .onSnapshot((snapshotChange) => {
          snapshotChange.forEach((doc) => {
            this.portfolio_item_skills.push({
              id: doc.id,
              image_url: doc.data().image_url,
            });
          });
        });
    },
    loadPortfolioItemImages() {
      db.collection("portfolio_items")
        .doc(this.currentPortfolioItem.id)
        .collection("portfolio_item_images")
        .onSnapshot((snapshotChange) => {
          snapshotChange.forEach((doc) => {
            this.portfolio_item_images.push({
              id: doc.id,
              image_url: doc.data().image_url,
            });
          });
        });
    },
  },
  created() {
    this.id = this.$route.params.portfolioItemId;
  },
};
</script>

<style scoped>
.portfolio-page {
  min-height: 100vh;
}
</style>
