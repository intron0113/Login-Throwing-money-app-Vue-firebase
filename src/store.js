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
      users: [],
    };
  },
  getters: {
    user: (state) => state.user,
    users: (state) => {
      return state.users;
    },
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
          const users = [];
          const mainuser = firebase.auth().currentUser;

          db.collection('useData')
            .where(
              firebase.firestore.FieldPath.documentId(),
              '!=',
              mainuser.uid
            )
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                users.push(doc.data());
                commit('setUsersData', users);
              });
            })
            .catch((error) => {
              console.log(error);
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
                context.commit('setuseData', doc);
              } else {
                console.log('No such document!');
              }
            })
            .catch((error) => {
              console.log(error.message);
            });
        })

        .then(() => {
          const users = [];
          const user = firebase.auth().currentUser;
          const db = firebase.firestore();
          db.collection('useData')
            .where(firebase.firestore.FieldPath.documentId(), '!=', user.uid)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                users.push(doc.data());
                context.commit('setUsersData', users);
              });
            })
            .catch((error) => {
              console.log(error);
            });
        })

        .then(() => {
          router.push('/');
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // ???????????????
    async tipping(context, payload) {
      const user = firebase.auth().currentUser;
      const db = firebase.firestore();
      const docRef = await db.collection('useData').doc(user.uid);
      const docOther = db.collection('useData').doc(payload.clickedUserUid);

      db.runTransaction((t) => {
        t.update(docRef, {
          myWallet: firebase.firestore.FieldValue.increment(
            -payload.tippingWallet
          ),
        });

        // firestore???myWallet?????????????????????????????????

        t.update(docOther, {
          myWallet: firebase.firestore.FieldValue.increment(
            payload.tippingWallet
          ),
        });
      })
        // store???myWallet???????????????????????????????????????
        .then(() => {
          docRef
            .get()
            .then((doc) => {
              if (doc.exists) {
                context.commit('setTipping', doc);
              } else {
                console.log('No such document!');
              }
            })
            .catch((error) => {
              console.log(error.message);
            });
        })

        // store???users?????????????????????????????????
        .then(() => {
          const users = [];
          db.collection('useData')
            .where(firebase.firestore.FieldPath.documentId(), '!=', user.uid)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                users.push(doc.data());
                context.commit('setUsersData', users);
              });
            })
            .catch((error) => {
              console.log(error.message);
            });
        });
    },

    // ???????????????
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          router.push('/login');
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mutations: {
    getCreateLoginData(state, user) {
      state.user = user;
    },
    setuseData(state, doc) {
      state.user['uid'] = doc.data().uid;
      state.user['name'] = doc.data().name;
      state.user['email'] = doc.data().email;
      state.user['myWallet'] = doc.data().myWallet;
    },

    // ?????????????????????????????????????????????
    setUsersData(state, users) {
      state.users = users;
    },
    setTipping(state, doc) {
      state.user.myWallet = doc.data().myWallet;
    },
  },
});
