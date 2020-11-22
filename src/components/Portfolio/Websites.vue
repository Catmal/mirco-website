<template>
  <q-card style="width: 1000px; max-width: 80vw;" class="bg-dark flex flex-column q-pa-md">
    <q-card-section class="full-width">
      <div>
        <q-toolbar>
          <q-toolbar-title>
            <h3 v-if="portfolio_items_open == 1" class="text-info text-weight-thin">Websites</h3>
            <h3 v-if="portfolio_items_open == 2" class="text-info text-weight-thin">WebApps</h3>
          </q-toolbar-title>
          <q-space />
          <q-btn color="accent" icon="close" @click="closeDialogWebsites()"></q-btn>
        </q-toolbar>
        <div class="row q-col-gutter-sm">
          <div
            v-if="portfolio_items_open == 2"
            class="col-lg-4 col-md-6 col-sm-6 col-xs-12 q-pa-md"
            v-for="portfolio_item in webApps"
            :key="portfolio_item.id"
          >
            <div class="text-weight-normal text-info text-bold q-mb-sm">{{ portfolio_item.name }}</div>
            <q-img
              @click="setCurrentPortfolioItem(portfolio_item)"
              class="rounded-borders shadow-1 cursor-pointer"
              width="100%"
              :src="portfolio_item.image_url"
            />
          </div>
          <div
            v-if="portfolio_items_open == 1"
            class="col-lg-4 col-md-6 col-sm-6 col-xs-12 q-pa-md"
            v-for="portfolio_item in webSites"
            :key="portfolio_item.id"
          >
            <div class="text-weight-normal text-info text-bold q-mb-sm">{{ portfolio_item.name }}</div>
            <q-img
              @click="setCurrentPortfolioItem(portfolio_item)"
              class="rounded-borders shadow-1 cursor-pointer"
              width="100%"
              :src="portfolio_item.image_url"
            />
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>
<script>
import { db } from "boot/firebase";
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "Websites",
  computed: {
    ...mapState("PortfolioStore", [
      "portfolio_items",
      "websites_open",
      "currentPortfolioItem",
      "portfolio_items_open",
    ]),
    ...mapGetters("PortfolioStore", ["portfolioItemsList"]),
    webSites() {
      return this.portfolio_items.filter((x) => x.category == 1);
    },
    webApps() {
      return this.portfolio_items.filter((x) => x.category == 2);
    },
  },
  methods: {
    closeDialogWebsites() {
      this.$store.commit("PortfolioStore/SET_WEBSITES_CLOSED");
      this.$store.commit("PortfolioStore/SET_WEBAPPS_CLOSED");
    },
    setCurrentPortfolioItem(portfolio_item) {
      this.$store.commit(
        "PortfolioStore/SET_CURRENT_PORTFOLIO_ITEM",
        portfolio_item
      ),
        this.$store.commit("PortfolioStore/SHOW_PORTFOLIO_ITEM"),
        this.$store.commit("PortfolioStore/SET_WEBSITES_CLOSED");
      this.$store.commit("PortfolioStore/SET_WEBAPPS_CLOSED");
    },
  },
};
</script>
