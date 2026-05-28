import type { RouteRecordRaw } from 'vue-router';
import Home from './pages/Home.vue';
import Docs from './pages/Docs.vue';

// vite-ssg consumes this routes array and constructs its own router. The
// catch-all redirect is fine; the dynamic /docs/:section route is mainly
// here for deep-linking and is not prerendered (would create combinatorial
// HTML files for no SEO gain).
export const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: Home },
  { path: '/docs', name: 'docs', component: Docs },
  { path: '/docs/:section', name: 'docs-section', component: Docs },
  { path: '/:catchAll(.*)', redirect: '/' },
];
