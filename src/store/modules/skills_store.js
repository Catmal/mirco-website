import { db } from "boot/firebase";
const SkillStore = {
	namespaced: true,
	state: {
		skills: [],
		loading: false
	},
	actions: {
		async loadSkills({ commit, state }) {
			this.loading = true;
			db.collection("skills").onSnapshot(snapshotChange => {
				commit("SET_SKILLS", snapshotChange);
				this.loading = false;
			});
		},
		async addSkill({ commit, state }, payload) {
			this.loading = true;
			let newSkillRef = db.collection("skills").doc();
			newSkillRef
				.set({
					id: newSkillRef.id,
					name: newSkillRef.name,
					image_url: newSkillRef.image_url,
					category: newSkillRef.category
				})
				.then(ref => {
					this.loading = false;
				});
		},
		updateSkill({ commit }, currentSkill) {
			db.collection("skills")
				.doc(currentSkill.id)
				.update({
					name: currentSkill.name
				});
		},
		async addPortfolioItemSkill({ state }, currentSkill) {
			this.saving = true;
			let newPortfolioItemSkillRef = db
				.collection("portfolio_items")
				.doc(state.currentPortfolioItem.id)
				.collection("portfolio_item_skills")
				.doc();
			newPortfolioItemSkillRef
				.set({
					id: newPortfolioItemSkillRef.id,
					image_url: skill.image_url
				})
				.then(ref => {});
		}
	},
	mutations: {
		SET_SKILLS(state, snapshotChange) {
			state.skills = [];
			snapshotChange.forEach(doc => {
				state.skills.push({
					id: doc.id,
					name: doc.data().name,
					image_url: doc.data().image_url,
					category: doc.data().category
				});
			});
		}
	},
	getters: {
		skillsReservable(state, getters) {
			return state.skills.filter(x => x.reservation_available);
		}
	}
};
export default SkillStore;
