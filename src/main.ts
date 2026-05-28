import { ViteSSG } from 'vite-ssg';
import { createHead } from '@vueuse/head';
import App from './App.vue';
import { routes } from './router';
import './style.css';

// vite-ssg replaces createApp + router setup. It also runs the app once per
// route at build time to emit prerendered HTML — Google sees the full page
// without executing JS, which is what wins the SEO race for an SPA.
export const createApp = ViteSSG(
  App,
  { routes },
  ({ app }) => {
    app.use(createHead());
  },
);
