<template>
  <div class="q-pa-md">
    <q-toolbar>
      <h5 class="text-dark">Portfolio Items</h5>
      <q-space />
      <q-btn color="green-5">Add</q-btn>
    </q-toolbar>
    <q-table
      :columns="columns"
      row-key="name"
      :pagination.sync="pagination"
      :data="portfolio_items"
    >
      <template v-slot:body="props">
        <q-tr :props="props" class="cursor-pointer">
          <q-td key="logo" :props="props">
            <q-img width="30px" :src="props.row.image_url"></q-img>
          </q-td>
          <q-td key="name" :props="props">
            <p>{{ props.row.name }}</p>
            <q-popup-edit
              v-model="props.row.name"
              @before-hide="updateAdminPortfolioItem(props.row)"
            >
              <q-input v-model="props.row.name" dense autofocus counter />
            </q-popup-edit>
          </q-td>
          <q-td key="category" :props="props">
            <p v-if="props.row.category == 1">Website</p>
            <p v-else>Web App</p>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { db } from "boot/firebase";
import draggable from "vuedraggable";
export default {
  name: "adminSkills",

  data() {
    return {
      pagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 10,
      },
      frontend: false,
      backend: false,
      maximizedToggle: true,
      showTitle: false,
      showFrontend: false,
      showBackend: false,
      add_portfolio_item: false,
      position: "left",
      hide: false,
      columns: [
        {
          name: "logo",
          required: true,
          align: "left",
          field: (row) => row.image_url,
          sortable: true,
          label: "LOGO",
          headerClasses: "bg-grey-3",
        },
        {
          name: "name",
          required: true,
          align: "left",
          field: (row) => row.name,
          format: (val) => `${val}`,
          sortable: true,
          label: "NAME",
          headerClasses: "bg-grey-3",
        },
        {
          name: "category",
          required: true,
          align: "left",
          field: (row) => row.category,
          sortable: true,
          label: "CATEGORY",
          headerClasses: "bg-grey-3",
        },
      ],
    };
  },
  components: {
    AddSkill: () => import("../../components/Skills/AddSkill"),
    draggable,
  },
  mounted() {
    this.$store.dispatch("PortfolioStore/loadPortfolioItems");
  },
  computed: {
    ...mapGetters(["user"]),
    ...mapState("PortfolioStore", ["portfolio_items"]),
  },
  methods: {
    ...mapActions("PortfolioStore", ["updatePortfolioItem"]),
    updateAdminPortfolioItem(portfolio_item) {
      this.$store.commit(
        "PortfolioStore/SET_CURRENT_PORTFOLIO_ITEM",
        portfolio_item
      );
      this.updatePortfolioItem();
    },
  },
};
</script>


