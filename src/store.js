import Vue from 'vue';
import Vuex from 'vuex';
import router from '../src/router.js';

Vue.use(Vuex);

import firebase from 'firebase';

export default new Vuex.Store({
  state() {
    return {
      user: '',
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
    update({ commit }, name) {
      firebase
        .auth()
        .currentUser.updateProfile({
          displayName: name,
        })
        .then(() => {
          commit('getData', name);
          router.push('/');
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  mutations: {
    getData(state, name) {
      state.user = name;
    },
  },
});
