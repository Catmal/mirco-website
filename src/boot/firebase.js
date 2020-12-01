import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth"; // for authentication
const config = {
	apiKey: process.env.VUE_APP_API_KEY,
	authDomain: "mirco-website.firebaseapp.com",
	databaseURL: "https://mirco-website.firebaseio.com",
	projectId: "mirco-website",
	storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
	appId: process.env.VUE_APP_EMAIL
};

firebase.initializeApp(config);

const db = firebase.firestore();

export { db, firebase };

export default ({ Vue, store }) => {
	firebase.auth().onAuthStateChanged(user => {
		if (user) {
			store.dispatch("fetchUser", user);
		} else {
			store.commit("LOGOUT");
		}
	});
};
