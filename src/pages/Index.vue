<template>
  <q-page class="flex flex-center bg-primary q-pa-md">
    <div>
      <transition name="title-fade">
        <h1 v-show="showTitle" class="text-dark q-pr-xl">Mirco Cattabriga</h1>
      </transition>
      <transition name="subtitle-fade">
        <h3 v-if="showSubSubTitle" class="text-info text-weight-thin text-right">Web Developer</h3>
      </transition>
    </div>
    <Menu />
  </q-page>
</template>

<script>
import Firebase from "firebase";
import { mapGetters } from "vuex";
import bkg from "../bkg.js";

export default {
  name: "PageIndex",
  data() {
    return {
      showTitle: false,
      showSubSubTitle: false,
    };
  },
  components: {
    Menu: () => import("../components/Menu"),
  },
  computed: {
    ...mapGetters(["user"]),
  },
  mounted() {
    this.showTitle = true;
    setTimeout(() => (this.showSubSubTitle = true), 100);
  },
};
</script>

<style lang="scss" scoped>
.title-fade-enter-active {
  transition: all 1.2s ease;
}
.title-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 2);
}
.title-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(-150px);
  opacity: 0;
  transition: all 1s ease;
}
.subtitle-fade-enter-active {
  transition: all 1s ease;
}
.subtitle-fade-leave-active {
  transition: all 1.8s cubic-bezier(1, 0.5, 0.8, 2);
}
.subtitle-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(190px);
  opacity: 0;
}
</style>
