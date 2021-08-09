import Vue from 'vue';
import Vuex from 'vuex';
import router from '../src/router.js';
// import firebase from 'firebase/app';
import firebase from 'firebase';
// import 'firebase/auth';
import 'firebase/firestore';

Vue.use(Vuex);
Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: 'AIzaSyCw7rhXscYo37ewhPUpkSzOwqQT1S2jDJU',
  authDomain: 'vue-rogin.firebaseapp.com',
  projectId: 'vue-rogin',
  storageBucket: 'vue-rogin.appspot.com',
  messagingSenderId: '994492868234',
  appId: '1:994492868234:web:b8337306cea4bbd043af73',
  measurementId: 'G-NZCLEJ2FG7',
};
// firebase.initializeApp(config);

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

Vue.use(Vuex);

export default new Vuex.Store({
  state() {
    return {
      user: {
        uid: '',
        email: '',
        name: '',
        myWallet: '',
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

    checkLogin({ commit }) {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          commit('getCreateLoginData', {
            uid: user.uid,
            email: user.email,
            name: user.displayName,
            myWallet: 700,
          });
          const db = firebase.firestore();
          db.collection('useData')
            .doc(user.uid)
            .set({
              uid: user.uid,
              email: user.email,
              name: user.displayName,
              myWallet: 700,
            });
        }
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
  },
  mutations: {
    getCreateLoginData(state, user) {
      state.user = user;
    },
  },
});
