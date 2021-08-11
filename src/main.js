import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCw7rhXscYo37ewhPUpkSzOwqQT1S2jDJU',
  authDomain: 'vue-rogin.firebaseapp.com',
  projectId: 'vue-rogin',
  storageBucket: 'vue-rogin.appspot.com',
  messagingSenderId: '994492868234',
  appId: '1:994492868234:web:b8337306cea4bbd043af73',
  measurementId: 'G-NZCLEJ2FG7',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

new Vue({
  router,
  store,

  render: (h) => h(App),
}).$mount('#app');
