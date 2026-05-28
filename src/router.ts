import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import Docs from './pages/Docs.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/docs', name: 'docs', component: Docs },
    { path: '/docs/:section', name: 'docs-section', component: Docs },
    { path: '/:catchAll(.*)', redirect: '/' },
  ],
  scrollBehavior(to, _from, saved) {
    if (saved) return saved;
    if (to.hash) return { el: to.hash, top: 80, behavior: 'smooth' };
    return { top: 0 };
  },
});
