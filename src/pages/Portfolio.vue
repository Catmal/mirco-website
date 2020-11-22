<template>
  <div>
    <q-page v-show="!show_portfolio_item" class="flex flex-center bg-info">
      <div>
        <transition name="title-fade">
          <h1 class="text-dark text-center">
            <q-icon size="82px" name="style" color="secondary" />Portfolio
          </h1>
        </transition>
        <div class="flex flex-center">
          <transition name="websites-fade">
            <q-btn v-if="showWebsites" flat class="q-mr-sm" size="xl" @click="open('left')">
              <h3 class="text-dark text-weight-thin text-right">Websites</h3>
            </q-btn>
          </transition>
          <transition name="webapps-fade">
            <q-btn v-if="showWebsites" @click="openwa('right')" flat size="xl">
              <h3 class="text-weight-thin text-secondary">Web Apps</h3>
            </q-btn>
          </transition>
        </div>
        <div class="flex flex-center">
          <q-btn
            v-if="user.loggedIn"
            class="q-mr-sm q-mb-md"
            size="xl"
            color="secondary"
            icon="add"
            @click="add_portfolio_item = true"
          ></q-btn>
        </div>
        <q-dialog v-model="websites_open" :position="position">
          <Websites />
        </q-dialog>
        <q-dialog v-model="webapps_open" :position="position">
          <Websites />
        </q-dialog>
        <q-dialog v-model="add_portfolio_item" :position="position">
          <AddPortfolioItem />
        </q-dialog>
      </div>

      <Menu />
    </q-page>
    <div v-if="show_portfolio_item">
      <PortfolioItem />
    </div>
  </div>
</template>

<script>
import { db } from "boot/firebase";
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "PortfolioPage",
  data() {
    return {
      showTitle: false,
      showWebsites: false,
      add_portfolio_item: false,
      position: "left",
      hide: false,
    };
  },
  computed: {
    ...mapGetters(["user"]),

    ...mapState("PortfolioStore", [
      "portfolio_items",
      "websites_open",
      "webapps_open",
      "show_portfolio_item",
    ]),
    webApps() {
      return this.portfolio_items.filter((x) => x.category == 2);
    },
    webSites() {
      return this.portfolio_items.filter((x) => x.category == 1);
    },
  },
  mounted() {
    this.showTitle = true;
    setTimeout(() => (this.showWebsites = true), 100);
  },
  components: {
    Menu: () => import("../components/Menu"),
    AddPortfolioItem: () =>
      import("../components/PortfolioItem/AddPortfolioItem"),
    Websites: () => import("../components/Portfolio/Websites"),
    PortfolioItem: () => import("../components/PortfolioItem/PortfolioItem"),
  },
  methods: {
    open(position) {
      this.position = position;
      this.$store.commit("PortfolioStore/SET_WEBSITES_OPEN");
    },
    openwa(position) {
      this.position = position;
      this.$store.commit("PortfolioStore/SET_WEBAPPS_OPEN");
    },

    closeDialogWebsites() {
      this.$store.commit("PortfolioStore/SET_WEBSITES_CLOSED");
    },
  },
};
</script>
<style lang="scss" scoped>
.title-fade-enter-active {
  transition: all 1.2s ease;
}
// .title-fade-leave-active {
//   transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 2);
// }
.title-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(-150px);
  opacity: 0;
  transition: all 1s ease;
}
.webapps-fade-enter-active {
  transition: all 1s ease;
}
.webapps-fade-leave-active {
  transition: all 2s cubic-bezier(1, 0.5, 0.8, 2);
}
.webapps-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(200px);
  opacity: 0;
}
.websites-fade-enter-active {
  transition: all 1s ease;
}
.websites-fade-leave-active {
  transition: all 2s cubic-bezier(1, 0.5, 0.8, 2);
}
.websites-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(-200px);
  opacity: 0;
}
</style>
