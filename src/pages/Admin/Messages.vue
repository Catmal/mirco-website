<template>
  <div class="q-pa-md">
    <div class="row no-wrap">
      <q-toolbar>
        <q-toolbar-title>
          <h5 class="text-dark">Messages</h5>
        </q-toolbar-title>
      </q-toolbar>
    </div>
    <q-dialog v-model="adding">
      <FormPrenotazioni />
    </q-dialog>
    <q-table
      flat
      bordered
      :filter="filter"
      class="bg-grey-1 q-mt-md"
      :data="messages"
      :columns="columns"
      row-key="id"
      :pagination.sync="pagination"
    >
      <template v-slot:top-left>
        <q-input dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body="props">
        <q-tr>
          <q-td key="date" :props="props">
            <p>{{ formattedDateTime(props.row.date) }}</p>
          </q-td>

          <q-td key="email" :props="props">
            <p>{{ props.row.email }}</p>
          </q-td>
          <q-td key="content" :props="props">
            <p>{{ props.row.content }}</p>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
<script>
import { date } from "quasar";
import { mapState } from "vuex";

export default {
  data() {
    return {
      selectedMessage: {},
      filter: "",
      adding: false,
      columns: [
        {
          name: "date",
          required: true,
          align: "left",
          field: (row) => this.formattedDateTime(row.date),
          format: (val) => `${val}`,
          sortable: true,
          label: "DATE",
          headerClasses: "bg-grey-3 text-accent",
        },
        {
          name: "email",
          required: true,
          align: "left",
          field: (row) => row.email,
          sortable: true,
          label: "EMAIL",
          headerClasses: "bg-grey-3 text-accent",
        },
        {
          name: "content",
          required: true,
          align: "left",
          field: (row) => row.content,
          format: (val) => `${val}`,
          sortable: true,
          label: "CONTENT",
          headerClasses: "bg-grey-3 text-accent",
        },
      ],
      pagination: {
        sortBy: "date",
        descending: true,
        page: 1,
        rowsPerPage: 10,
      },
    };
  },
  mounted() {
    this.$store.dispatch("MessageStore/loadMessages");
  },
  methods: {
    formattedDate(value) {
      return date.formatDate(value, "DD-MM-YYYY");
    },
    formattedDateTime(value) {
      return date.formatDate(value, "DD-MM-YYYY HH:mm");
    },
  },
  computed: {
    ...mapState("MessageStore", ["messages"]),
    ...mapState(["user"]),
  },
};
</script>
