<script setup lang="ts">
interface Feature {
  icon: string;
  title: string;
  body: string;
}

const features: Feature[] = [
  {
    icon: '⌘',
    title: 'VS Code-style workspace',
    body: 'Monaco editor, multi-pane layout, tabs, breadcrumbs, search, and a command palette that already feels like home.',
  },
  {
    icon: '⚙',
    title: 'Bench actions, one click',
    body: 'Migrate, restart, build, clear cache, check health, update — every bench command exposed as a button with live log streaming.',
  },
  {
    icon: '🔌',
    title: 'SSH + remote benches',
    body: 'Connect to staging or production servers, run commands, tunnel ports, and edit files over SSH without leaving the IDE.',
  },
  {
    icon: '🗄',
    title: 'Site & database browser',
    body: 'Browse sites, run queries, dump and restore databases, manage site config and installed apps from a single panel.',
  },
  {
    icon: '🧩',
    title: 'Hooks & print formats',
    body: 'Doctype manager, hooks editor with autocomplete, print format editor with live HTML/CSS preview and snippets.',
  },
  {
    icon: '🌐',
    title: 'Public tunnels via ngrok',
    body: 'Share your dev bench with a teammate or a webhook provider with a one-click ngrok tunnel, scoped to your active site.',
  },
  {
    icon: '🛡',
    title: 'Hardened by default',
    body: 'Electron Fuses locked down, asar integrity validation, no Node CLI inspect, code signing on macOS and Windows.',
  },
];
</script>

<template>
  <section class="section features" id="features">
    <div class="container">
      <span class="pill">Features</span>
      <h2>Everything a Frappe developer needs.<br /><span class="muted">Without the browser tabs.</span></h2>
      <p class="sub">Frappe Code wraps the daily bench developer loop in a single desktop window. No web UI, no jumping between terminals, no half-broken extensions.</p>

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
.features h2 {
  margin-bottom: 6px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 14px;
  margin-top: 12px;
}
.card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 22px 22px 24px;
  transition: border-color 160ms, transform 160ms, background 160ms;
}
.card:hover {
  border-color: var(--border-strong);
  background: var(--bg-card-hover);
  transform: translateY(-2px);
}
.ic {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: var(--accent-soft);
  border: 1px solid rgba(124, 92, 255, 0.25);
  display: grid;
  place-items: center;
  font-size: 20px;
  margin-bottom: 14px;
}
.card h3 {
  margin: 0 0 8px;
  font-size: 16px;
  letter-spacing: -0.01em;
  font-weight: 600;
}
.card p {
  margin: 0;
  font-size: 13.5px;
  color: var(--fg-muted);
  line-height: 1.6;
}
</style>
