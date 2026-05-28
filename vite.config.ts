import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const CANONICAL_URL = 'https://frappecode.netlify.app';

// Per-route head overrides applied to the prerendered HTML emitted by
// vite-ssg. We do this in a hook (instead of using useHead inside each
// page component) because @vueuse/head + vite-ssg's integration isn't
// emitting these tags reliably during SSR. The result is the same:
// each route ends up with its own <title>, description, canonical, and
// og:url.
type RouteHead = { title: string; description: string; path: string };

const ROUTE_HEAD: Record<string, RouteHead> = {
  '/': {
    title: 'Frappe Code — The desktop IDE built for Frappe & ERPNext developers',
    description:
      'Frappe Code is the free, open-source desktop IDE built for Frappe and ERPNext developers. Edit hooks and print formats, run bench commands, manage sites, query databases, and connect to remote benches over SSH — all in one VS Code-style window for Linux and macOS.',
    path: '/',
  },
  '/docs': {
    title:
      'Documentation — Frappe Code | Frappe & ERPNext desktop IDE features explained',
    description:
      'Complete documentation for Frappe Code. Every feature explained in detail: VS Code-style editor, bench actions, site management, doctypes, hooks, print formats, database browser, REST API client, SSH, git, ngrok tunnels, preferences, and auto-updates.',
    path: '/docs',
  },
};

export default defineConfig({
  plugins: [vue()],
  server: { port: 5181, strictPort: true },
  // @ts-expect-error vite-ssg config lives at the root; not in vite's types
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    onPageRendered(route: string, html: string) {
      const key = route === '/index' ? '/' : route;
      const head = ROUTE_HEAD[key];
      if (!head) return html;
      const url = `${CANONICAL_URL}${head.path}`;
      let out = html;
      out = out.replace(/<title>.*?<\/title>/i, `<title>${escape(head.title)}</title>`);
      out = out.replace(
        /<meta name="description" content="[^"]*">/i,
        `<meta name="description" content="${escape(head.description)}">`,
      );
      out = out.replace(
        /<link rel="canonical" href="[^"]*">/i,
        `<link rel="canonical" href="${url}">`,
      );
      out = out.replace(
        /<meta property="og:title" content="[^"]*">/i,
        `<meta property="og:title" content="${escape(head.title)}">`,
      );
      out = out.replace(
        /<meta property="og:description" content="[^"]*">/i,
        `<meta property="og:description" content="${escape(head.description)}">`,
      );
      out = out.replace(
        /<meta property="og:url" content="[^"]*">/i,
        `<meta property="og:url" content="${url}">`,
      );
      out = out.replace(
        /<meta name="twitter:title" content="[^"]*">/i,
        `<meta name="twitter:title" content="${escape(head.title)}">`,
      );
      out = out.replace(
        /<meta name="twitter:description" content="[^"]*">/i,
        `<meta name="twitter:description" content="${escape(head.description)}">`,
      );
      return out;
    },
  },
});

function escape(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
