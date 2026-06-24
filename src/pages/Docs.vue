<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useHead } from '@vueuse/head';
import DocsIllustration from '../components/DocsIllustration.vue';
import { CANONICAL_URL } from '../config';

useHead({
  title: 'Documentation — Frappe Code | Frappe & ERPNext desktop IDE',
  meta: [
    {
      name: 'description',
      content:
        'Complete documentation for Frappe Code: editor, bench actions, sites, doctypes, hooks, print formats, database browser, API client, SSH, git, ngrok, and auto-updates. Every feature explained.',
    },
    { property: 'og:title', content: 'Frappe Code Documentation' },
    {
      property: 'og:description',
      content:
        'Documentation for every feature of Frappe Code, the open-source desktop IDE for Frappe & ERPNext developers.',
    },
    { property: 'og:url', content: `${CANONICAL_URL}/docs` },
    { name: 'twitter:title', content: 'Frappe Code Documentation' },
  ],
  link: [{ rel: 'canonical', href: `${CANONICAL_URL}/docs` }],
});

interface Section {
  id: string;
  title: string;
}

const sections: Section[] = [
  { id: 'getting-started', title: 'Getting started' },
  { id: 'editor', title: 'The editor' },
  { id: 'bench-actions', title: 'Bench actions' },
  { id: 'sites', title: 'Sites' },
  { id: 'doctypes-hooks', title: 'Doctypes, hooks & print formats' },
  { id: 'database', title: 'Database browser' },
  { id: 'api-editor', title: 'API editor' },
  { id: 'ssh', title: 'SSH & remote benches' },
  { id: 'git', title: 'Git integration' },
  { id: 'ngrok', title: 'Public tunnels via ngrok' },
  { id: 'preferences', title: 'Preferences' },
  { id: 'dependencies', title: 'System dependencies' },
  { id: 'updates', title: 'Auto-updates' },
];

const active = ref<string>(sections[0].id);

onMounted(() => {
  const obs = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) active.value = (e.target as HTMLElement).id;
      }
    },
    { rootMargin: '-30% 0px -60% 0px', threshold: 0 },
  );

  // Separate observer for the pop-in reveal: triggers once per section
  // when it enters the viewport, then stops observing it.
  const reveal = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          reveal.unobserve(e.target);
        }
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
  );

  for (const s of sections) {
    const el = document.getElementById(s.id);
    if (el) {
      obs.observe(el);
      reveal.observe(el);
    }
  }
});
</script>

<template>
  <div class="docs-shell">
    <aside class="toc">
      <div class="toc-inner">
        <div class="toc-title">Documentation</div>
        <nav>
          <a
            v-for="s in sections"
            :key="s.id"
            :href="`#${s.id}`"
            :class="{ active: active === s.id }"
          >
            {{ s.title }}
          </a>
        </nav>
      </div>
    </aside>

    <article class="docs-body">
      <header class="docs-header">
        <span class="pill">Documentation</span>
        <h1>Frappe Code in detail.</h1>
        <p class="lede muted">
          Every feature explained, end to end. Each section below shows the
          panel or dialog the feature lives in.
        </p>
      </header>

      <section id="getting-started" class="docs-section">
        <h2>Getting started</h2>
        <DocsIllustration kind="welcome" />
        <p>
          Frappe Code launches into a <strong>Welcome view</strong> with a list of
          recent benches and quick actions. Click <strong>Open Bench Folder…</strong>
          and point it at any <code>frappe-bench</code> directory — the app reads
          the bench's <code>sites/</code>, <code>apps/</code>, and
          <code>common_site_config.json</code> to populate the rest of the UI.
        </p>
        <h3>Create a new bench</h3>
        <p>
          <strong>File → Create New Bench…</strong> opens a dialog with three fields:
        </p>
        <ul>
          <li><strong>Bench Folder Name</strong> — letters, numbers, dots, underscores, dashes.</li>
          <li><strong>Parent Directory</strong> — click <em>Browse</em> to pick where the bench folder will live. Leave blank for <code>$HOME</code>.</li>
          <li><strong>Frappe Branch</strong> — develop, version-15 (default), version-14, version-13.</li>
          <li><strong>Python Version</strong> — only versions <em>actually installed on your system</em> are offered.</li>
        </ul>
        <p class="callout">
          The app probes <code>python3.10/3.11/3.12/3.13</code> on PATH before
          showing the dropdown. If <code>supervisorctl</code> is missing, you'll
          get a heads-up upfront — bench init needs it at the end.
        </p>
      </section>

      <section id="editor" class="docs-section">
        <h2>The editor</h2>
        <DocsIllustration kind="editor" />
        <p>
          The editor is Monaco (the same engine that powers VS Code) with a custom
          <em>frappe-dark</em> / <em>frappe-light</em> theme tuned to match the rest of
          the app. It supports:
        </p>
        <ul>
          <li><strong>Multi-pane layout</strong> — split horizontally or vertically, drag tabs between panes.</li>
          <li><strong>Tabs with breadcrumbs</strong> — shows the file path; click any segment to jump to that folder in the explorer.</li>
          <li><strong>Search</strong> — <code>Ctrl+F</code> in-file, <code>Ctrl+Shift+F</code> across the bench.</li>
          <li><strong>Outline & timeline</strong> — file structure on the left sidebar, file git history on the right.</li>
          <li><strong>Image / CSV / Excel viewers</strong> — opening a binary opens it in the right viewer instead of the editor.</li>
          <li><strong>Auto-save</strong> — togglable with a configurable delay in preferences.</li>
        </ul>
      </section>

      <section id="bench-actions" class="docs-section">
        <h2>Bench actions</h2>
        <DocsIllustration kind="actions" />
        <p>
          The title bar exposes the most-used bench commands as one-click icons.
          The full menu lives behind <strong>⋯ → Bench Actions</strong> and the
          Bench Actions panel surfaces:
        </p>
        <ul>
          <li><strong>Start / Stop bench</strong> — runs <code>bench start</code> as a long-lived child; killed automatically on app quit.</li>
          <li><strong>Migrate</strong> — for the active site or all sites.</li>
          <li><strong>Build</strong> — assets for everything or a single app.</li>
          <li><strong>Restart individual services</strong> — Web, Worker, Scheduler, SocketIO.</li>
          <li><strong>Clear cache</strong> — site cache or website cache only.</li>
          <li><strong>Update bench</strong> — runs <code>bench update</code>.</li>
          <li><strong>Health check</strong> — <code>bench doctor</code> output streamed to the output panel.</li>
          <li><strong>Service status</strong> — quick badge view of web / worker / scheduler / redis.</li>
        </ul>
        <p>
          Output streams to the bottom panel in real time. You can keep typing in
          the editor while a bench command runs.
        </p>
      </section>

      <section id="sites" class="docs-section">
        <h2>Sites</h2>
        <DocsIllustration kind="sites" />
        <p>
          The <strong>Sites</strong> view lists every site in the bench with status
          badges (active / maintenance / inactive), the default-site star, and the
          currently-selected site. From here you can:
        </p>
        <ul>
          <li><strong>Create a new site</strong> — opens a dialog asking for site name (e.g. <code>my-site.localhost</code>), admin password (required, set per-site), and MariaDB root password (optional).</li>
          <li><strong>Use site</strong> — runs <code>bench use &lt;site&gt;</code> and updates the active-site indicator everywhere.</li>
          <li><strong>Drop site</strong> — opens a destructive-confirmation dialog that also collects the MariaDB root password; passes it via <code>--db-root-password</code> so bench doesn't prompt interactively.</li>
          <li><strong>Add to /etc/hosts</strong> — one-time sudo password prompt; the app appends <code>127.0.0.1 site.localhost</code> via <code>sudo tee</code>.</li>
          <li><strong>Restore from backup</strong> — pick a <code>.sql</code> or <code>.sql.gz</code> file, supply credentials, restore.</li>
          <li><strong>Per-site actions</strong> — Site Config, Database, Logs, Backup open in their own draggable modal.</li>
          <li><strong>Apps panel</strong> — install bench apps onto the site with a single click.</li>
        </ul>
      </section>

      <section id="doctypes-hooks" class="docs-section">
        <h2>Doctypes, hooks &amp; print formats</h2>
        <DocsIllustration kind="hooks" />
        <p>
          Three dedicated editors for the metadata you edit most:
        </p>
        <ul>
          <li>
            <strong>Doctype Manager</strong> — list every doctype in the bench, filter
            by module/app, edit JSON directly with schema-aware autocomplete.
          </li>
          <li>
            <strong>Hooks Editor</strong> — opens an app's <code>hooks.py</code> with
            structured editing for <code>doc_events</code>, <code>scheduler_events</code>,
            <code>fixtures</code>, etc. Code completion knows the legal event names.
          </li>
          <li>
            <strong>Print Format Editor</strong> — pick any print format, edit HTML +
            CSS side by side, with a Custom/Disabled/Headings/Labels-Right toggle row
            and margin fields that mirror the Frappe UI.
          </li>
        </ul>
      </section>

      <section id="database" class="docs-section">
        <h2>Database browser</h2>
        <DocsIllustration kind="db" />
        <p>
          Open <strong>Database</strong> from the per-site actions and you get a SQL
          console with table list, schema explorer, and a query editor.
        </p>
        <ul>
          <li>Lists tables for the selected site's database (read from <code>site_config.json</code>).</li>
          <li>Schema panel shows columns, types, indexes, and foreign keys.</li>
          <li>Query editor uses Monaco with SQL highlighting and the same theme as the code editor.</li>
          <li>Result grid with column-resize, sort, and copy-as-CSV.</li>
        </ul>
      </section>

      <section id="api-editor" class="docs-section">
        <h2>API editor</h2>
        <DocsIllustration kind="api" />
        <p>
          A Postman-style REST client built into the app so you can hit your bench's
          API endpoints without leaving the editor — useful for poking at Frappe's
          built-in REST and RPC endpoints, custom whitelisted methods, and webhooks.
        </p>
        <h3>Request builder</h3>
        <ul>
          <li><strong>Method + URL bar</strong> — GET / POST / PUT / PATCH / DELETE / HEAD / OPTIONS with a Send button.</li>
          <li><strong>Params</strong> — key/value editor for query string params; toggleable per row.</li>
          <li><strong>Headers</strong> — auto-suggests common Frappe headers (<code>X-Frappe-CSRF-Token</code>, <code>Authorization: token …</code>).</li>
          <li><strong>Body</strong> — None / JSON / XML / form-data / x-www-form-urlencoded. JSON and XML get Monaco syntax highlighting with the same theme as the main editor.</li>
          <li><strong>Auth</strong> — Bearer token, Basic, or Frappe token (api_key:api_secret) presets.</li>
          <li><strong>Cookies</strong> — per-domain cookie jar persisted to <code>userData</code>.</li>
          <li><strong>Pre-request &amp; Tests</strong> — JavaScript snippets that run before/after the request, with helpers like <code>pm.response.json()</code> and <code>pm.test()</code> for Postman parity.</li>
        </ul>
        <h3>Response viewer</h3>
        <ul>
          <li><strong>Pretty / Raw / Preview</strong> — pretty-prints JSON, renders HTML in a sandboxed preview.</li>
          <li><strong>Headers + cookies</strong> tabs with copy buttons.</li>
          <li><strong>Actual request</strong> — what was actually sent over the wire (post-redirect, post-auth interpolation).</li>
          <li><strong>Console</strong> — output of any <code>console.log</code> from pre-request / test scripts.</li>
          <li><strong>Tests</strong> — green/red pass-fail summary inline below the response.</li>
        </ul>
      </section>

      <section id="ssh" class="docs-section">
        <h2>SSH &amp; remote benches</h2>
        <DocsIllustration kind="ssh" />
        <p>
          Add an SSH host (key or password) in the sidebar and you can:
        </p>
        <ul>
          <li>Open a remote terminal (xterm.js in the bottom panel) with full color and resize.</li>
          <li>Browse the remote filesystem in a tree, open / edit remote files in Monaco.</li>
          <li>Drop file uploads / downloads via SFTP.</li>
          <li>Forward a local port to a remote service — useful for hitting an internal admin port from your laptop browser.</li>
          <li>Run bench commands on the remote bench from the same Bench Actions UI.</li>
        </ul>
      </section>

      <section id="git" class="docs-section">
        <h2>Git integration</h2>
        <DocsIllustration kind="git" />
        <p>
          Per-app git view with status, stage / unstage, commit, push, pull, branch
          switch, and a commit graph. File history (<em>blame</em>) is one click
          from any open file. GitHub token in Preferences lifts the API rate limit
          from 60/hr to 5000/hr for the App Market integration.
        </p>
      </section>

      <section id="ngrok" class="docs-section">
        <h2>Public tunnels via ngrok</h2>
        <DocsIllustration kind="ngrok" />
        <p>
          Hit the globe button in the title bar to start an ngrok tunnel pointing
          at the local web port. Useful for letting a teammate hit your dev bench
          or registering a webhook URL with a third party. The authtoken lives in
          Preferences → Application → Networking and is passed to ngrok as
          <code>NGROK_AUTHTOKEN</code>.
        </p>
      </section>

      <section id="preferences" class="docs-section">
        <h2>Preferences</h2>
        <DocsIllustration kind="prefs" />
        <p>
          A VS Code-style settings page, grouped by category:
        </p>
        <ul>
          <li><strong>Commonly Used</strong> — virtual category pulling settings flagged as common.</li>
          <li><strong>Text Editor</strong> — font, display, indentation, files (auto-save).</li>
          <li><strong>Workbench</strong> — color theme (12+ to pick from).</li>
          <li><strong>Chat</strong> — AI provider, model, API key.</li>
          <li><strong>Application</strong> — bench dir, active site, git author, GitHub PAT, ngrok, updates.</li>
          <li><strong>Security</strong> — toggle external shell commands.</li>
        </ul>
        <p>
          Each category expands in the sidebar to reveal its sub-groups for
          one-click navigation to a specific section.
        </p>
      </section>

      <section id="dependencies" class="docs-section">
        <h2>System dependencies</h2>
        <DocsIllustration kind="deps" />
        <p>
          Preferences → Dependencies shows every system package Frappe needs,
          with a red <em>required</em> badge for missing ones and a one-line
          install command. The current required set is: Python 3.10+, pip, Node.js,
          npm, yarn, git, MariaDB, Redis, wkhtmltopdf, supervisor, curl,
          build-essential, frappe-bench.
        </p>
        <p class="callout">
          Supervisor is marked required because <code>bench init</code> calls
          <code>supervisorctl status</code> at the end. Without it, the bench is
          still created but the last step fails — the app classifies this as a
          warning rather than a failure and tells you exactly that.
        </p>
      </section>

      <section id="updates" class="docs-section">
        <h2>Auto-updates</h2>
        <DocsIllustration kind="updates" />
        <p>
          The app checks GitHub Releases on launch and once per hour (toggleable).
          When a new version is available you'll see a non-blocking dialog: download
          (with a progress bar), then install on the next quit — handled by
          <code>electron-updater</code>. Channels: stable, beta, alpha.
        </p>
        <p>
          You can override the feed URL in Preferences for an internal mirror.
        </p>
      </section>

      <footer class="docs-footer">
        <p class="muted">
          Found something missing or wrong? Open an issue on
          <a href="https://github.com/Vengadesh27/frappe-code/issues" target="_blank" rel="noopener">GitHub ↗</a>.
        </p>
      </footer>
    </article>
  </div>
</template>

<style scoped>
.docs-shell {
  max-width: var(--max-w);
  margin: 0 auto;
  padding: 56px 24px 80px;
  /* The TOC is position: fixed, so reserve left padding to leave space for it
     on wide viewports. On narrow viewports the TOC drops to a static position. */
  padding-left: calc(260px + 48px + 24px);
}
.toc {
  position: fixed;
  top: 84px;
  left: max(24px, calc((100vw - var(--max-w)) / 2 + 24px));
  width: 260px;
  height: calc(100vh - 110px);
  overflow: auto;
}
.toc-title {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--fg-muted);
  margin-bottom: 12px;
  padding: 0 8px;
}
.toc nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.toc a {
  padding: 7px 10px;
  border-radius: 6px;
  font-size: 13.5px;
  color: var(--fg-muted);
  border-left: 2px solid transparent;
}
.toc a:hover {
  color: var(--fg);
  background: var(--bg-card);
}
.toc a.active {
  color: var(--fg);
  background: var(--accent-soft);
  border-left-color: var(--accent);
}

.docs-header {
  margin-bottom: 24px;
}
.docs-header h1 {
  font-size: clamp(34px, 4.5vw, 52px);
  letter-spacing: -0.03em;
  margin: 14px 0 10px;
  font-weight: 800;
  line-height: 1.05;
}
.lede {
  font-size: 16px;
  max-width: 640px;
}


.docs-section {
  padding: 36px 0 28px;
  border-top: 1px solid var(--border);
  /* Pop-in on scroll-into-view via intersection observer in the page script;
     this base style is what the unobserved sections start at. */
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 600ms ease, transform 600ms cubic-bezier(0.16, 1, 0.3, 1);
}
.docs-section.in-view {
  opacity: 1;
  transform: translateY(0);
}
.docs-section:first-of-type {
  border-top: 0;
}
@media (prefers-reduced-motion: reduce) {
  .docs-section {
    opacity: 1 !important;
    transform: none !important;
    animation: none !important;
    transition: none !important;
  }
}
.docs-section h2 {
  font-size: 26px;
  letter-spacing: -0.02em;
  margin: 0 0 12px;
  font-weight: 700;
}
.docs-section h3 {
  font-size: 17px;
  margin: 22px 0 8px;
  font-weight: 600;
}
.docs-section p {
  color: #c8cdd6;
  margin: 10px 0;
}
.docs-section ul {
  padding-left: 22px;
  color: #c8cdd6;
}
.docs-section li {
  margin-bottom: 8px;
}
.docs-section code {
  background: rgba(255, 255, 255, 0.06);
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 0.92em;
}
.callout {
  background: var(--accent-soft);
  border-left: 3px solid var(--accent);
  padding: 12px 16px;
  border-radius: 0 8px 8px 0;
  margin: 18px 0;
  color: #d4d8e1 !important;
}
.docs-footer {
  margin-top: 60px;
  text-align: center;
  font-size: 13px;
}
.docs-footer a {
  color: var(--accent);
}
.docs-footer a:hover {
  text-decoration: underline;
}

@media (max-width: 920px) {
  .docs-shell {
    padding-left: 24px;
  }
  .toc {
    position: static;
    width: auto;
    height: auto;
    left: auto;
    margin-bottom: 30px;
  }
}
</style>
