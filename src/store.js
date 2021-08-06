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
    getUserName: (state) => state.user.displayName,
  },

  actions: {
    register({ dispatch }, payload) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          console.log(user);
          dispatch('update', payload.name);
        })
        .catch(function(error) {
          console.log({ code: error.code, message: error.message });
        });
    },
    update({ context }, name) {
      firebase
        .auth()
        .currentUser.updateProfile({
          displayName: name,
        })
        .then(() => {
          console.log('Update successful');
          console.log(context);
          router.push('/');
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
