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
      <span class="pill released-pill">
        <span class="dot"></span>
        Alpha 1 Released
      </span>
      <h2>Download <span class="grad">Frappe Code</span>.</h2>
      <p class="sub">
        Alpha 1 is live. Download for Linux below — macOS coming next.
      </p>

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
            <span class="asset-dl">⬇ Download</span>
          </a>
        </div>
      </div>

      <div class="platform-block platform-block--soon">
        <div class="platform-header">
          <span class="platform-icon">🍎</span>
          <span class="platform-name">macOS</span>
          <span class="platform-badge platform-badge--soon">Coming soon</span>
        </div>
        <p class="soon-note">macOS code signing and notarisation in progress.</p>
      </div>

      <div class="cards">
        <a :href="DOWNLOAD_RELEASES_URL" target="_blank" rel="noopener" class="cta-card primary">
          <div class="cta-head">
            <span class="cta-icon">⬇</span>
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
.download-section {
  position: relative;
  overflow: hidden;
}
.download-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(60% 50% at 50% 100%, rgba(74, 222, 128, 0.12), transparent 70%);
  z-index: -1;
  pointer-events: none;
}
.released-pill {
  background: linear-gradient(110deg, rgba(74, 222, 128, 0.18), rgba(124, 92, 255, 0.18));
  border-color: rgba(74, 222, 128, 0.45);
}
.dot {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: var(--success);
  box-shadow: 0 0 12px var(--success);
}
.grad {
  background: linear-gradient(110deg, #c4b5fd, #7c5cff, #4ade80);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.sub {
  color: var(--fg-muted);
  max-width: 560px;
  margin: 0 auto 40px;
  font-size: 15px;
  line-height: 1.6;
}

/* Platform blocks */
.platform-block {
  background: var(--bg-card);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-lg);
  padding: 24px;
  margin-bottom: 16px;
}
.platform-block--soon {
  border-color: var(--border);
  opacity: 0.6;
}
.platform-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
}
.platform-icon { font-size: 22px; }
.platform-name { font-size: 17px; font-weight: 700; }
.platform-badge {
  margin-left: auto;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--success);
  background: rgba(74, 222, 128, 0.12);
  border: 1px solid rgba(74, 222, 128, 0.3);
  border-radius: 20px;
  padding: 3px 10px;
}
.platform-badge--soon {
  color: var(--fg-muted);
  background: rgba(255,255,255,0.04);
  border-color: var(--border);
}
.asset-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
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
  border-color: var(--accent);
  background: var(--bg-card-hover);
  transform: translateY(-1px);
}
.asset-icon { font-size: 20px; flex-shrink: 0; }
.asset-info { display: flex; flex-direction: column; flex: 1; gap: 2px; }
.asset-label { font-size: 14px; font-weight: 600; }
.asset-desc { font-size: 12px; color: var(--fg-muted); }
.asset-dl {
  font-size: 13px;
  font-weight: 600;
  color: var(--accent);
  white-space: nowrap;
}
.soon-note { font-size: 13px; color: var(--fg-muted); margin: 0; }

/* CTA cards */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
  margin: 32px 0 40px;
}
.cta-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 24px;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: transform 200ms, border-color 200ms, background 200ms;
}
.cta-card:hover {
  transform: translateY(-3px);
  border-color: var(--border-strong);
  background: var(--bg-card-hover);
}
.cta-card.primary {
  border-color: rgba(74, 222, 128, 0.4);
  background: radial-gradient(60% 60% at 0% 0%, rgba(74, 222, 128, 0.10), transparent 60%), var(--bg-card);
}
.cta-head { display: flex; align-items: center; gap: 12px; }
.cta-icon { font-size: 22px; line-height: 1; }
.cta-title { font-size: 17px; font-weight: 700; letter-spacing: -0.01em; }
.cta-body { font-size: 13.5px; color: var(--fg-muted); margin: 0; line-height: 1.6; flex: 1; }
.cta-arrow { font-size: 13px; font-weight: 600; color: var(--accent); }

/* Roadmap */
.roadmap {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 28px 28px 22px;
  max-width: 700px;
  margin: 0 auto;
}
.roadmap-title {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--fg-muted);
  margin-bottom: 16px;
}
.roadmap-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 4px; }
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
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid var(--fg-dim);
  flex-shrink: 0;
  display: grid;
  place-items: center;
}
.state-done .rm-dot { background: var(--success); border-color: var(--success); box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.15); }
.state-inprogress .rm-dot { border-color: var(--accent); }
.rm-dot-inner { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); animation: rmPulse 1.6s ease-in-out infinite; }
@keyframes rmPulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(0.55); opacity: 0.5; } }
.rm-label { flex: 1; }
.state-done .rm-label { color: var(--fg); }
.state-pending .rm-label, .state-pending .rm-state { color: var(--fg-dim); }
.rm-state { font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--fg-muted); }
.state-done .rm-state { color: var(--success); }
.state-inprogress .rm-state { color: var(--accent); }

@media (prefers-reduced-motion: reduce) {
  .rm-dot-inner { animation: none !important; }
}
</style>
