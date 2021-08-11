import Vue from 'vue';
import Vuex from 'vuex';
import router from '../src/router.js';
import firebase from 'firebase';
import 'firebase/firestore';

Vue.use(Vuex);
Vue.config.productionTip = false;

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
          dispatch('checkSignUp');
          router.push('/');
        })
        .catch((error) => {
          console.log(error);
        });
    },

    checkSignUp({ commit }) {
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

    login(context, payload) {
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(() => {
          const user = firebase.auth().currentUser;
          const docRef = firebase
            .firestore()
            .collection('useData')
            .doc(user.uid);
          docRef
            .get()
            .then((doc) => {
              if (doc.exists) {
                context.commit('setUserData', doc);
              } else {
                console.log('No such document!');
              }
            })
            .catch((error) => {
              alert(error.message);
            });
        })

        .then(() => {
          router.push('/');
        })
        .catch((error) => {
          alert(error);
        });
    },
    // ログアウト
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          router.push('/login');
        });
    },
  },
  mutations: {
    getCreateLoginData(state, user) {
      state.user = user;
    },
    setUserData(state, doc) {
      state.user['uid'] = doc.data().uid;
      state.user['name'] = doc.data().name;
      state.user['email'] = doc.data().email;
      state.user['myWallet'] = doc.data().myWallet;
    },
  },
});
