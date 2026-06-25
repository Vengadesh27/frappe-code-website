<script setup lang="ts">
import { GITHUB_OWNER, GITHUB_REPO, DOWNLOAD_RELEASES_URL } from '../config';

const repoUrl = `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}`;

const linuxAssets = [
  { label: 'AppImage', desc: 'Portable · runs on any Linux distro', ext: '.AppImage', icon: '🐧' },
  { label: 'Debian / Ubuntu (.deb)', desc: 'Install with dpkg or apt', ext: '.deb', icon: '📦' },
];

const milestones = [
  { label: 'Editor + bench actions', state: 'done' },
  { label: 'Sites + database browser', state: 'done' },
  { label: 'Hooks + print formats', state: 'done' },
  { label: 'SSH + remote benches', state: 'done' },
  { label: 'REST API client', state: 'done' },
  { label: 'Alpha 1 public release', state: 'done' },
  { label: 'macOS code signing + notarisation', state: 'inprogress' },
  { label: 'Auto-updates via GitHub Releases', state: 'inprogress' },
];
</script>

<template>
  <section class="section download-section" id="download">
    <div class="container">

      <!-- heading -->
      <div class="head">
        <span class="pill">
          <span class="dot"></span>
          Alpha 1 Released
        </span>
        <h2>Download <span class="grad">Frappe Code</span>.</h2>
        <p class="sub">Alpha 1 is live. Download for Linux below — macOS coming next.</p>
      </div>

      <!-- Linux download block -->
      <div class="platform-block">
        <div class="platform-header">
          <span class="platform-icon">🐧</span>
          <span class="platform-name">Linux</span>
          <span class="platform-badge">Available now</span>
        </div>
        <div class="asset-list">
          <a
            v-for="a in linuxAssets"
            :key="a.ext"
            :href="DOWNLOAD_RELEASES_URL"
            target="_blank"
            rel="noopener"
            class="asset-card"
          >
            <span class="asset-icon">{{ a.icon }}</span>
            <div class="asset-info">
              <span class="asset-label">{{ a.label }}</span>
              <span class="asset-desc">{{ a.desc }}</span>
            </div>
            <span class="asset-dl">↓ Download</span>
          </a>
        </div>
      </div>

      <!-- macOS coming soon -->
      <div class="platform-block platform-block--soon">
        <div class="platform-header">
          <span class="platform-icon">🍎</span>
          <span class="platform-name">macOS</span>
          <span class="platform-badge platform-badge--soon">Coming soon</span>
        </div>
        <p class="soon-note">macOS code signing and notarisation in progress.</p>
      </div>

      <!-- CTA cards -->
      <div class="cards">
        <a :href="DOWNLOAD_RELEASES_URL" target="_blank" rel="noopener" class="cta-card primary">
          <div class="cta-head">
            <span class="cta-icon">↓</span>
            <span class="cta-title">All releases</span>
          </div>
          <p class="cta-body">Browse every release, read changelogs, and download any version directly from GitHub.</p>
          <span class="cta-arrow">Open releases →</span>
        </a>

        <a :href="repoUrl" target="_blank" rel="noopener" class="cta-card">
          <div class="cta-head">
            <span class="cta-icon">★</span>
            <span class="cta-title">Star on GitHub</span>
          </div>
          <p class="cta-body">Follow development and get notified when new versions ship.</p>
          <span class="cta-arrow">Open repo →</span>
        </a>

        <router-link to="/docs" class="cta-card">
          <div class="cta-head">
            <span class="cta-icon">📖</span>
            <span class="cta-title">Read the docs</span>
          </div>
          <p class="cta-body">13 sections covering every feature — editor, bench, sites, SSH, database, API, git, and more.</p>
          <span class="cta-arrow">Read docs →</span>
        </router-link>
      </div>

      <!-- Roadmap -->
      <div class="roadmap">
        <div class="roadmap-title">Release milestones</div>
        <ul class="roadmap-list">
          <li
            v-for="m in milestones"
            :key="m.label"
            :class="['roadmap-item', `state-${m.state}`]"
          >
            <span class="rm-dot">
              <span class="rm-dot-inner" v-if="m.state === 'inprogress'"></span>
            </span>
            <span class="rm-label">{{ m.label }}</span>
            <span class="rm-state">
              {{ m.state === 'done' ? 'shipped' : m.state === 'inprogress' ? 'in progress' : 'planned' }}
            </span>
          </li>
        </ul>
      </div>

    </div>
  </section>
</template>

<style scoped>
.head { text-align: center; margin-bottom: 48px; }
.head h2 { margin-bottom: 8px; }

.pill {
  background: var(--surface);
  border: 1px solid rgba(10,124,62,.3);
  color: var(--success);
  margin-bottom: 20px;
}
.dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--success);
  box-shadow: 0 0 6px rgba(10,124,62,.5);
}
.grad {
  background: linear-gradient(110deg, var(--text) 0%, #3279f9 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.sub {
  color: var(--text-sec);
  font-size: 16px;
  line-height: 1.6;
  max-width: 520px;
  margin: 0 auto;
}

/* Platform blocks */
.platform-block {
  background: var(--surface);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-lg);
  padding: 24px;
  margin-bottom: 14px;
}
.platform-block--soon {
  border-color: var(--border);
  opacity: 0.55;
}
.platform-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
}
.platform-icon { font-size: 22px; }
.platform-name { font-size: 17px; font-weight: 500; }
.platform-badge {
  margin-left: auto;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .06em;
  text-transform: uppercase;
  color: var(--success);
  background: var(--success-bg);
  border: 1px solid rgba(10,124,62,.25);
  border-radius: var(--radius-pill);
  padding: 3px 10px;
}
.platform-badge--soon {
  color: var(--text-dim);
  background: var(--surface-high);
  border-color: var(--border);
}
.asset-list { display: flex; flex-direction: column; gap: 10px; }
.asset-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 18px;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  text-decoration: none;
  color: inherit;
  transition: border-color 160ms, background 160ms, transform 160ms;
}
.asset-card:hover {
  border-color: var(--border-strong);
  background: var(--surface);
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(0,0,0,.06);
}
.asset-icon { font-size: 20px; flex-shrink: 0; }
.asset-info { display: flex; flex-direction: column; flex: 1; gap: 2px; }
.asset-label { font-size: 14px; font-weight: 500; }
.asset-desc { font-size: 12px; color: var(--text-dim); }
.asset-dl { font-size: 13px; font-weight: 600; color: var(--accent); white-space: nowrap; }
.soon-note { font-size: 13px; color: var(--text-dim); margin: 0; }

/* CTA cards */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 14px;
  margin: 32px 0 40px;
}
.cta-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 24px;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: transform 200ms, border-color 200ms, background 200ms, box-shadow 200ms;
}
.cta-card:hover {
  transform: translateY(-3px);
  border-color: var(--border-strong);
  background: var(--bg);
  box-shadow: 0 4px 20px rgba(0,0,0,.06);
}
.cta-card.primary {
  border-color: rgba(50,121,249,.25);
  background: rgba(50,121,249,.04);
}
.cta-head { display: flex; align-items: center; gap: 12px; }
.cta-icon { font-size: 22px; line-height: 1; }
.cta-title { font-size: 17px; font-weight: 500; letter-spacing: -.01em; }
.cta-body { font-size: 13.5px; color: var(--text-sec); margin: 0; line-height: 1.6; flex: 1; }
.cta-arrow { font-size: 13px; font-weight: 600; color: var(--accent); }

/* Roadmap */
.roadmap {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 28px 28px 22px;
  max-width: 700px;
  margin: 0 auto;
}
.roadmap-title {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: var(--text-dim);
  margin-bottom: 16px;
}
.roadmap-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0; }
.roadmap-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 9px 4px;
  border-bottom: 1px solid var(--border);
  font-size: 13.5px;
}
.roadmap-item:last-child { border-bottom: 0; }
.rm-dot {
  width: 14px; height: 14px;
  border-radius: 50%;
  border: 2px solid var(--border-strong);
  flex-shrink: 0;
  display: grid;
  place-items: center;
}
.state-done .rm-dot { background: var(--success); border-color: var(--success); }
.state-inprogress .rm-dot { border-color: var(--accent); }
.rm-dot-inner { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); animation: rmPulse 1.6s ease-in-out infinite; }
@keyframes rmPulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(.55);opacity:.5} }
.rm-label { flex: 1; }
.state-pending .rm-label, .state-pending .rm-state { color: var(--text-dim); }
.rm-state { font-size: 11px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: var(--text-dim); }
.state-done .rm-state { color: var(--success); }
.state-inprogress .rm-state { color: var(--accent); }

@media (prefers-reduced-motion: reduce) {
  .rm-dot-inner { animation: none !important; }
}
</style>
