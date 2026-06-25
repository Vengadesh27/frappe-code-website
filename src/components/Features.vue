<script setup lang="ts">
interface Feature {
  icon: string;
  title: string;
  body: string;
}

const features: Feature[] = [
  { icon: '⌘', title: 'VS Code-style workspace', body: 'Monaco editor, multi-pane layout, tabs, breadcrumbs, global search, snippets library, and a command palette that already feels like home.' },
  { icon: '🔀', title: 'Git integration', body: 'Stage, commit, push, pull, create branches, view diffs, and resolve conflicts — full Git workflow without leaving the IDE.' },
  { icon: '⚡', title: 'Integrated terminal', body: 'Full xterm.js terminal emulator built in. Run bench commands, Python shells, or any shell script directly inside the IDE.' },
  { icon: '🌐', title: 'REST API client', body: 'Built-in HTTP client to test Frappe REST endpoints. Set headers, authentication, and inspect JSON responses without Postman.' },
  { icon: '🗄', title: 'Database browser', body: 'Browse MariaDB tables, run raw SQL queries, view query results, and inspect the schema of any site database.' },
  { icon: '🔌', title: 'SSH + remote benches', body: 'Connect to staging or production servers, run commands, tunnel ports, and edit files over SSH without leaving the IDE.' },
  { icon: '📦', title: 'App & bench manager', body: 'Install, remove, and upgrade Frappe apps. Migrate, restart, build, clear cache, check health — every bench command with live log streaming.' },
  { icon: '🏗', title: 'Sites manager', body: 'Create, delete, rename sites, manage site configuration, installed apps, and jump between multiple Frappe sites instantly.' },
  { icon: '🧩', title: 'Doctype & hooks editor', body: 'Browse all doctypes, edit hooks with autocomplete, manage custom fields, fixtures, and modules from a dedicated editor panel.' },
  { icon: '🖨', title: 'Print format designer', body: 'Design print formats with a live HTML/CSS preview editor and built-in Jinja snippets. See changes in real time.' },
  { icon: '💾', title: 'Backup & restore', body: 'Create database and files backups, schedule automated backups, and restore any site from a backup archive in one click.' },
  { icon: '📋', title: 'Log viewer', body: 'Tail frappe, worker, and scheduler logs in real time. Search, filter by level, and clear logs — all without SSH.' },
  { icon: '📅', title: 'Scheduler & jobs', body: 'View, enable, disable, and manually trigger scheduled jobs. Inspect job history and debug cron-related issues.' },
  { icon: '👥', title: 'User management', body: 'List, create, and manage site users. Reset passwords, change roles, and control access without opening the Frappe desk.' },
  { icon: '📧', title: 'Email configuration', body: 'Set up inbound and outbound email accounts, test SMTP/IMAP connections, and configure email domains per site.' },
  { icon: '🔍', title: 'Dependency checker', body: 'Verify Python, Node.js, wkhtmltopdf, Redis, and MariaDB versions. Detect missing bench prerequisites before they break builds.' },
  { icon: '🌍', title: 'Public tunnels via ngrok', body: 'Share your dev bench with a teammate or webhook provider with a one-click ngrok tunnel, scoped to your active site.' },
  { icon: '🔄', title: 'Auto-updates', body: 'Frappe Code updates itself silently in the background. You get notified when a new version is ready — no manual reinstalls.' },
  { icon: '🌐', title: 'Built-in app browser', body: 'Browse your Frappe site directly inside the IDE with a full tabbed browser — no need to switch to Chrome. Navigate, test forms, and inspect your site without leaving Frappe Code.' },
  { icon: '🛡', title: 'Hardened by default', body: 'Code obfuscation, asar integrity validation, DevTools blocked in production, and sandboxed renderer — secure out of the box.' },
];
</script>

<template>
  <section class="section features" id="features">
    <div class="container">
      <div class="head">
        <span class="pill">Features</span>
        <h2>Everything a Frappe developer needs.<br /><span class="muted">Without the browser tabs.</span></h2>
        <p class="sub">Frappe Code wraps the daily bench developer loop in a single desktop window. No web UI, no jumping between terminals, no half-broken extensions.</p>
      </div>

      <div class="grid">
        <div v-for="f in features" :key="f.title" class="card">
          <div class="ic">{{ f.icon }}</div>
          <h3>{{ f.title }}</h3>
          <p>{{ f.body }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.head { margin-bottom: 48px; }
.features h2 { margin-bottom: 10px; }

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 12px;
}

.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 24px;
  transition: border-color 160ms, transform 160ms, background 160ms, box-shadow 160ms;
}
.card:hover {
  border-color: var(--border-strong);
  background: var(--bg);
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0,0,0,.06);
}

.ic {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: var(--surface-high);
  border: 1px solid var(--border);
  display: grid;
  place-items: center;
  font-size: 20px;
  margin-bottom: 16px;
}

.card h3 {
  margin: 0 0 8px;
  font-size: 15.5px;
  font-weight: 500;
  letter-spacing: -0.01em;
  color: var(--text);
}

.card p {
  margin: 0;
  font-size: 13.5px;
  color: var(--text-sec);
  line-height: 1.65;
}
</style>
