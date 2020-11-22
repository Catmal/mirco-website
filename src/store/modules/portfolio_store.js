import {db} from "boot/firebase";
const PortfolioStore = {
    namespaced: true,
    state: {
        portfolio_items: [],
        loading: false,
        websites_open: false,
        webapps_open: false,
        currentPortfolioItem: {},
        show_portfolio_item: false,
        portfolio_items_open: ""
    },
    actions: {
        async loadPortfolioItems(
            {commit, state}
        ) {
            this.loading = true;
            db.collection("portfolio_items").onSnapshot(snapshotChange => {
                commit("SET_PORTFOLIO_ITEMS", snapshotChange);
                this.loading = false;
            });
        },
        async addPortfolioItem(
            {
                commit,
                state
            },
            payload
        ) {
            this.loading = true;
            let newPortfolioRef = db.collection("portfolio_items").doc();
            newPortfolioRef.set({image_url: payload.currentPortfolioItemPost.id, name: currentPortfolioItemPost.name, description: newPortfolioItem.description, category: newPortfolioItem.category}).then(ref => {
                commit("ADD_ARENILE", payload.newPortfolioItem);
                this.loading = false;
            });
        },
        async addPortfolioItemSkill({
            state
        }, skill) {
            this.saving = true;
            let newPortfolioItemSkillRef = db.collection("portfolio_items").doc(state.currentPortfolioItem.id).collection("portfolio_item_skills").doc();
            newPortfolioItemSkillRef.set({id: newPortfolioItemSkillRef.id, image_url: skill.image_url}).then(ref => {});
        },
        updatePortfolioItem({state}) {
            db.collection("portfolio_items").doc(state.currentPortfolioItem.id).update({
                name: state.currentPortfolioItem.name,
                image_url: state.currentPortfolioItem.image_url,
                description: state.currentPortfolioItem.description,
                link: state.currentPortfolioItem.link ? state.currentPortfolioItem.link : null
            });
        },
        deletePortfolioItem({state}) {
            db.collection("portfolio_items").doc(state.currentPortfolioItem.id).delete().then(function () {
                console.log("Document successfully deleted!");
            }).catch(error => {
                console.error("Error removing document: ", error);
            });
        }
    },
    mutations: {
        SET_PORTFOLIO_ITEMS(state, snapshotChange) {
            state.portfolio_items = [];
            snapshotChange.forEach(doc => {
                state.portfolio_items.push({
                    id: doc.id,
                    name: doc.data().name,
                    image_url: doc.data().image_url,
                    description: doc.data().description,
                    category: doc.data().category,
                    link: doc.data().link
                });
            });
        },

        SET_CURRENT_PORTFOLIO_ITEM(state, portfolio_item) {
            state.currentPortfolioItem = portfolio_item;
        },
        SET_WEBSITES_OPEN(state) {
            state.portfolio_items_open = "1";

            state.websites_open = true;
        },
        SET_WEBAPPS_OPEN(state) {
            state.webapps_open = true;
            state.portfolio_items_open = "2";
        },
        SET_WEBSITES_CLOSED(state) {
            state.websites_open = false;
        },
        SET_WEBAPPS_CLOSED(state) {
            state.webapps_open = false;
        },
        SHOW_PORTFOLIO_ITEM(state) {
            state.show_portfolio_item = true;
        },
        CLOSE_PORTFOLIO_ITEM(state) {
            state.show_portfolio_item = false;
        }
    },
    getters: {
        portfolioItemsList(state, getters) {
            return state.portfolio_items.filter(x => x.category == state.portfolio_items_open);
        }
    }
};
export default PortfolioStore;
