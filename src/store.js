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
              alert(error.message);
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

    // 投げ銭機能
    async tipping(context, payload) {
      const user = firebase.auth().currentUser;
      const db = firebase.firestore();
      const docRef = db.collection('useData').doc(user.uid);

      await db.runTransaction(async (transaction) => {
        await transaction.get(docRef);
        await transaction.update(docRef, {
          myWallet: firebase.firestore.FieldValue.increment(
            -payload.tippingWallet
          ),
        });
      });
      // firestoreのmyWallet（選択ユーザー）の更新
      db.collection('useData')
        .doc(payload.clickedUserUid)
        .update({
          myWallet: firebase.firestore.FieldValue.increment(
            payload.tippingWallet
          ),
        })

        // storeのmyWallet（ログインユーザー）の更新
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
              alert(error.message);
            });
        })
        // storeのusers（選択ユーザー）の更新
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
            });
        });
    },

    // ログアウト
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

    // ログイン時登録ユーザ名をセット
    setUsersData(state, users) {
      state.users = users;
    },
    setTipping(state, doc) {
      state.user.myWallet = doc.data().myWallet;
    },
  },
});
