import Vue from 'vue';
import Router from 'vue-router';
import Register from './views/Register.vue';
import Login from './views/Login.vue';
import Dashboard from './views/Dashboard.vue';
import firebase from 'firebase';

Vue.use(Router);

// export default
let router = new Router({
  mode: 'history',

  routes: [
    { path: '/', component: Dashboard, meta: { requiresAuth: true } },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
  ],
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth) {
    // このルートはログインされているかどうか認証が必要です。
    // もしされていないならば、ログインページにリダイレクトします。
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        next();
      } else {
        next({
          path: '/login',
          query: { redirect: to.fullPath },
        });
      }
    });
  } else {
    next(); // next() を常に呼び出すようにしてください!
  }
});

export default router;
