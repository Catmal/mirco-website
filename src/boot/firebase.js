import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth"; // for authentication
const config = {
	apiKey: "AIzaSyAWVtryIFYc7vIQ51cIgRK1X64f5fIG7sY",
	authDomain: "mirco-website.firebaseapp.com",
	databaseURL: "https://mirco-website.firebaseio.com",
	projectId: "mirco-website",
	storageBucket: "mirco-website.appspot.com",
	messagingSenderId: "150510429609",
	appId: "1:150510429609:web:a549c722e38c7e0472d0b8"
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
