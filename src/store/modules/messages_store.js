import {db} from "boot/firebase";
const MessageStore = {
    namespaced: true,
    state: {
        messages: [],
        loading: false
    },
    actions: {
        async loadMessages(
            {commit, state}
        ) {
            this.loading = true;
            db.collection("messages").onSnapshot(snapshotChange => {
                commit("SET_MESSAGES", snapshotChange);
                this.loading = false;
            });
        }
    },
    mutations: {
        SET_MESSAGES(state, snapshotChange) {
            state.messages = [];
            snapshotChange.forEach(doc => {
                state.messages.push({id: doc.id, email: doc.data().email, content: doc.data().content});
            });
        }
    }
};
export default MessageStore;
