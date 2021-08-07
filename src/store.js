import Vue from 'vue';
import Vuex from 'vuex';
import router from '../src/router.js';

Vue.use(Vuex);

import firebase from 'firebase';

export default new Vuex.Store({
  state() {
    return {
      user: {
        uid: '',
        email: '',
        name: '',
      },
    };
  },
  getters: {
    user: (state) => state.user,
  },

  actions: {
    register({ dispatch }, payload) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(() => {
          dispatch('update', payload.name);
        })
        .catch(function(error) {
          console.log({ code: error.code, message: error.message });
        });
    },
    update({ dispatch }, name) {
      firebase
        .auth()
        .currentUser.updateProfile({
          displayName: name,
        })
        .then(() => {
          dispatch('checkLogin');
          router.push('/');
        })
        .catch((error) => {
          console.log(error);
        });
    },
    login({ dispatch }, payload) {
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(() => {
          dispatch('checkLogin');
          router.push('/');
        })
        .catch((error) => {
          alert(error);
        });
    },
    checkLogin({ commit }) {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          commit('getData', {
            uid: user.uid,
            email: user.email,
            name: user.displayName,
          });
        }
      });
    },
  },

  mutations: {
    getData(state, user) {
      state.user = user;
    },
  },
});
