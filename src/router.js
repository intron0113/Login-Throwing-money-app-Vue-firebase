import Vue from 'vue';
import Router from 'vue-router';
import Register from './views/Register.vue';
import Login from './views/Login.vue';
import Dashboard from './views/Dashboard.vue';

Vue.use(Router);

let router = new Router({
  mode: 'history',

  routes: [
    { path: '/', component: Dashboard },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
  ],
});

export default router;
