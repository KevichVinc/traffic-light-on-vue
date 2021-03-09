import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/red',
    name: 'red',
    component: Home,
  },
  {
    path: '/yellow',
    name: 'yellow',
    component: Home,
  },
  {
    path: '/green',
    name: 'green',
    component: Home,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
