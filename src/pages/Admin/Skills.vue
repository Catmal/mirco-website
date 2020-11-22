<template>
  <div class="q-pa-md">
    <q-toolbar>
      <h5 class="text-dark">Skills</h5>
      <q-space />
      <q-btn @click="add_skill = true" color="green-5">Add</q-btn>
    </q-toolbar>
    <q-dialog v-model="add_skill">
      <AddSkill />
    </q-dialog>
    <q-table :columns="columns" row-key="name" :pagination.sync="pagination" :data="skills">
      <template v-slot:body="props">
        <q-tr :props="props" class="cursor-pointer">
          <q-td key="logo" :props="props">
            <q-img width="30px" :src="props.row.image_url"></q-img>
          </q-td>
          <q-td key="name" :props="props">
            <p>{{ props.row.name }}</p>
            <q-popup-edit v-model="props.row.name" @before-hide="updateSkill(props.row)">
              <q-input v-model="props.row.name" dense autofocus counter />
            </q-popup-edit>
          </q-td>
          <q-td key="category" :props="props">
            <p v-if="props.row.category == 1">Frontend</p>
            <p v-else>Backend</p>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
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

      add_skill: false,
      position: "left",
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
  methods: {
    ...mapActions("SkillStore", ["updateSkill"]),
  },
  components: {
    AddSkill: () => import("../../components/Skills/AddSkill"),
    draggable,
  },
  mounted() {
    this.$store.dispatch("SkillStore/loadSkills");
  },
  computed: {
    ...mapGetters(["user"]),
    ...mapState("SkillStore", ["skills"]),
  },
};
</script>


