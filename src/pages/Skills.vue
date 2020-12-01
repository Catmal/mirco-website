<template>
  <q-page class="flex flex-center bg-secondary">
    <div>
      <transition name="title-fade">
        <h1 v-if="showTitle" class="text-dark text-center">
          <q-icon size="82px" name="assessment" color="info" />Skills
        </h1>
      </transition>
      <div class="flex flex-center bg-secondary">
        <transition name="frontend-fade">
          <q-btn
            v-if="showBackend"
            flat
            class="text-dark q-mr-sm"
            size="lg"
            @click="openbe('left')"
          >
            <h3 class="text-weight-thin">Backend</h3>
          </q-btn>
        </transition>
        <transition name="backend-fade">
          <q-btn v-if="showFrontend" @click="open('right')" flat class="text-info" size="md">
            <h3 class="text-weight-thin">Frontend</h3>
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
          @click="add_skill = true"
        ></q-btn>
      </div>
      <q-dialog v-model="frontend" :position="position">
        <div class="flex flex-column q-pa-md bg-white">
          <div style="width: 1000px; max-width: 80vw;">
            <q-toolbar>
              <q-toolbar-title>
                <h3 class="text-primary text-weight-thin">Frontend</h3>
              </q-toolbar-title>
              <q-space />
              <q-btn
                v-if="user.loggedIn"
                class="q-mr-sm q-mb-md"
                size="xl"
                color="secondary"
                icon="add"
                @click="add_skill = true"
              ></q-btn>
            </q-toolbar>
            <div class="row q-col-gutter-md">
              <div class="col-3 q-pa-md" v-for="skill in frontendSkills" :key="skill.id">
                <q-img :src="skill.image_url" />
              </div>
            </div>
          </div>
        </div>
      </q-dialog>
      <q-dialog v-model="backend" :position="position">
        <div class="flex flex-column q-pa-md bg-white">
          <div style="width: 1000px; max-width: 80vw;">
            <q-toolbar>
              <q-toolbar-title>
                <h3 class="text-primary text-weight-thin">Backend</h3>
              </q-toolbar-title>
              <q-space />
            </q-toolbar>
            <div class="row q-col-gutter-md">
              <div class="col-3 q-pa-md" v-for="skill in backendSkills" :key="skill.id">
                <q-img :src="skill.image_url" />
                <q-btn v-if="user.loggedIn" @click="deletePortfolioItemSkill(skill)" icon="delete"></q-btn>
              </div>
            </div>
          </div>
        </div>
      </q-dialog>
      <q-dialog v-model="add_skill" :position="position">
        <AddSkill />
      </q-dialog>
    </div>
    <Menu />
  </q-page>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import { db } from "boot/firebase";
import draggable from "vuedraggable";
export default {
	name: "PageSkills",
	data() {
		return {
			frontend: false,
			backend: false,
			maximizedToggle: true,
			showTitle: false,
			showFrontend: false,
			showBackend: false,
			add_skill: false,
			position: "left",
			hide: false
		};
	},
	components: {
		Menu: () => import("../components/Menu"),
		AddSkill: () => import("../components/Skills/AddSkill"),
		draggable
	},
	mounted() {
		this.showTitle = true;
		this.showBackend = true;
		this.showFrontend = true;
		this.loadSkills();
		this.$store.dispatch("SkillStore/loadSkills");
	},
	computed: {
		...mapGetters(["user"]),
		...mapState("SkillStore", ["skills"]),

		frontendSkills() {
			return this.skills.filter(x => x.category == 1);
		},
		backendSkills() {
			return this.skills.filter(x => x.category == 2);
		}
	},
	methods: {
		checkMove: function(evt) {
			console.log(evt.draggedContext.element.id);
			db.collection("skills")
				.doc(evt.draggedContext.element.id)
				.update({
					order: evt.relatedContext.index
				});
		},
		deletePortfolioItemSkill(skill) {
			this.portfolio_item_skills = [];
			db.collection("skills")
				.doc(skill.id)
				.delete()
				.then(function() {
					console.log("Skill successfully deleted!");
				})
				.catch(function(error) {
					console.error("Error removing document: ", error);
				});
		},
		open(position) {
			this.position = position;
			this.frontend = true;
		},
		openbe(position) {
			this.position = position;
			this.backend = true;
		},
		loadSkills() {
			let skillsRef = db.collection("skills");
			skillsRef.onSnapshot(snapshotChange => {
				this.skills = [];
				snapshotChange.forEach(doc => {
					this.skills.push({
						id: doc.data().id,
						name: doc.data().name,
						image_url: doc.data().image_url
					});
				});
			});
		}
	}
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
.backend-fade-enter-active {
  transition: all 1s ease;
}
.backend-fade-leave-active {
  transition: all 2s cubic-bezier(1, 0.5, 0.8, 2);
}
.backend-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(200px);
  opacity: 0;
}
.frontend-fade-enter-active {
  transition: all 1s ease;
}
.frontend-fade-leave-active {
  transition: all 2s cubic-bezier(1, 0.5, 0.8, 2);
}
.frontend-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(-200px);
  opacity: 0;
}
</style>
