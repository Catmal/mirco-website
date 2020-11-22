import Vue from 'vue'
import Vuex from 'vuex'
import PortfolioStore from "./modules/portfolio_store";
import SkillStore from "./modules/skills_store";
import MessageStore from "./modules/messages_store";

import firebase from "firebase";
import createPersistedState from 'vuex-persistedstate'
// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function ( /* { ssrContext } */
) {
    const Store = new Vuex.Store({
        state: {
            images: [],
            user: {
                loggedIn: false,
                data: null
            }
        },
        actions: {
            async loadImages(
                {commit, dispatch}
            ) {
                var listRef = firebase.storage().ref("images");
                commit("SET_EMPTY");

                listRef.listAll().then(function (result) {
                    result.items.forEach(function (imageRef) {
                        dispatch('displayImage', imageRef);
                    })

                }).catch(function (error) { // Uh-oh, an error occurred!
                });
            },
            fetchUser({
                commit
            }, user) {
                console.log(user)

                commit("SET_LOGGED_IN", user !== null);
                if (user) {

                    commit("SET_USER", {
                        displayName: user.displayName,
                        email: user.email
                    });
                } else {
                    commit("SET_USER", null);
                }
            },
            async displayImage(
                {
                    commit,
                    state
                },
                imageRef
            ) {
                imageRef.getDownloadURL().then(url => {
                    console.log(url)
                    commit("SET_IMAGES", url);
                }).catch(error => { console.log(error)
                });
            }
        },
        mutations: {

            SET_IMAGES(state, url) {

                state.images.push({url: url});
            },
            LOGOUT(state, url) {
                state.user = {}
            },
            ADD_IMAGE(state, url) {

                state.images.push({url: url});
            },
            SET_EMPTY(state) {
                state.images = []

            },
            SET_LOGGED_IN(state, value) {
                state.user.loggedIn = value;
            },
            SET_USER(state, data) {
                state.user.data = data;
            }
        },
        getters: {
            user(state) {
                return state.user
            }
        },
        modules: {
            PortfolioStore,
            SkillStore,
            MessageStore
        },
        plugins: [createPersistedState()],
        // enable strict mode (adds overhead!)
        // for dev mode only
        strict: process.env.DEV
    })

    return Store
}
