<template>
  <q-layout class="bkg" view="lHh Lpr lFf">
    <q-header v-if="user.loggedIn" class="bg-dark q-pa-sm">
      <div class="row">
        <q-btn v-if="user.loggedIn" lat icon="menu" @click="leftDrawerOpen = !leftDrawerOpen" />
        <q-space />
        <q-btn color="accent" @click.prevent="signOut">logout</q-btn>
      </div>
    </q-header>

    <q-drawer
      v-if="user.loggedIn"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list class="text-dark">
        <q-item>
          <h6>ADMINISTRATION</h6>
        </q-item>
        <q-item clickable v-ripple to="/admin/images">
          <q-item-section avatar>
            <q-icon name="receipt" />
          </q-item-section>

          <q-item-section class="text-bold">Images</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/admin/skills">
          <q-item-section avatar>
            <q-icon name="assessment" />
          </q-item-section>

          <q-item-section class="text-bold">Skills</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/admin/portfolio_items">
          <q-item-section avatar>
            <q-icon name="style" />
          </q-item-section>

          <q-item-section class="text-bold">Portfolio Items</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/admin/messages">
          <q-item-section avatar>
            <q-icon name="mail" />
          </q-item-section>

          <q-item-section class="text-bold">Messages</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase";

export default {
  name: "MainLayout",

  data() {
    return {
      leftDrawerOpen: false,
    };
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/login");
          this.$store.commit("LOGOUT");
        });
    },
  },
};
</script>
