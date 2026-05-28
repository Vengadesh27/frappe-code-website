<script setup lang="ts">
import { GITHUB_OWNER, GITHUB_REPO } from '../config';

const repoUrl = `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}`;
const watchUrl = `${repoUrl}/subscription`;

const milestones = [
  { label: 'Editor + bench actions', state: 'done' },
  { label: 'Sites + database browser', state: 'done' },
  { label: 'Hooks + print formats', state: 'done' },
  { label: 'SSH + remote benches', state: 'done' },
  { label: 'REST API client', state: 'done' },
  { label: 'macOS code signing + notarisation', state: 'inprogress' },
  { label: 'Auto-updates via GitHub Releases', state: 'inprogress' },
  { label: 'Public launch', state: 'pending' },
];
</script>

<template>
  <section class="section coming" id="download">
    <div class="container">
      <span class="pill">Launching soon</span>
      <h2>Coming <span class="grad">soon</span>.</h2>
      <p class="sub">
        Frappe Code is in active pre-release.
        Star the repo to follow along — installers go live the moment we ship.
      </p>

      <div class="cards">
        <a :href="repoUrl" target="_blank" rel="noopener" class="cta-card primary">
          <div class="cta-head">
            <span class="cta-icon">★</span>
            <span class="cta-title">Star on GitHub</span>
          </div>
          <p class="cta-body">
            Get an inbox ping the moment the first stable release ships.
            We'll never email you for anything else.
          </p>
          <span class="cta-arrow">Open repo →</span>
        </a>

        <a :href="watchUrl" target="_blank" rel="noopener" class="cta-card">
          <div class="cta-head">
            <span class="cta-icon">🔔</span>
            <span class="cta-title">Watch releases</span>
          </div>
          <p class="cta-body">
            Subscribe to release notifications on the GitHub repo —
            every tagged version, straight to your notifications.
          </p>
          <span class="cta-arrow">Configure watch →</span>
        </a>

        <router-link to="/docs" class="cta-card">
          <div class="cta-head">
            <span class="cta-icon">📖</span>
            <span class="cta-title">Preview the docs</span>
          </div>
          <p class="cta-body">
            13 sections covering every feature — editor, bench actions,
            sites, doctypes, hooks, print formats, database, API, SSH,
            git, ngrok, preferences, updates.
          </p>
          <span class="cta-arrow">Read docs →</span>
        </router-link>
      </div>

      <div class="roadmap">
        <div class="roadmap-title">Roadmap to public launch</div>
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
.coming {
  position: relative;
  overflow: hidden;
}
.coming::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(60% 50% at 50% 100%, rgba(124, 92, 255, 0.18), transparent 70%);
  z-index: -1;
  pointer-events: none;
}
.coming h2 {
  margin-bottom: 8px;
}
.grad {
  background: linear-gradient(110deg, #c4b5fd, #7c5cff, #4ade80);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  margin-bottom: 40px;
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
  position: relative;
  overflow: hidden;
}
.cta-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, transparent 30%, rgba(255, 255, 255, 0.04) 50%, transparent 70%);
  transform: translateX(-100%);
  transition: transform 600ms ease;
  pointer-events: none;
}
.cta-card:hover {
  transform: translateY(-3px);
  border-color: var(--border-strong);
  background: var(--bg-card-hover);
}
.cta-card:hover::after {
  transform: translateX(100%);
}
.cta-card.primary {
  border-color: rgba(124, 92, 255, 0.45);
  background:
    radial-gradient(60% 60% at 0% 0%, rgba(124, 92, 255, 0.12), transparent 60%),
    var(--bg-card);
}
.cta-head {
  display: flex;
  align-items: center;
  gap: 12px;
}
.cta-icon {
  font-size: 22px;
  line-height: 1;
}
.cta-title {
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.01em;
}
.cta-body {
  font-size: 13.5px;
  color: var(--fg-muted);
  margin: 0;
  line-height: 1.6;
  flex: 1;
}
.cta-arrow {
  font-size: 13px;
  font-weight: 600;
  color: var(--accent);
}

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
.roadmap-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.roadmap-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 9px 4px;
  border-bottom: 1px solid var(--border);
  font-size: 13.5px;
}
.roadmap-item:last-child {
  border-bottom: 0;
}
.rm-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid var(--fg-dim);
  flex-shrink: 0;
  display: grid;
  place-items: center;
}
.state-done .rm-dot {
  background: var(--success);
  border-color: var(--success);
  box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.15);
}
.state-inprogress .rm-dot {
  border-color: var(--accent);
  position: relative;
}
.rm-dot-inner {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  animation: rmPulse 1.6s ease-in-out infinite;
}
@keyframes rmPulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50%      { transform: scale(0.55); opacity: 0.5; }
}
.rm-label {
  flex: 1;
}
.state-done .rm-label {
  color: var(--fg);
}
.state-pending .rm-label,
.state-pending .rm-state {
  color: var(--fg-dim);
}
.rm-state {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--fg-muted);
}
.state-done .rm-state {
  color: var(--success);
}
.state-inprogress .rm-state {
  color: var(--accent);
}

@media (prefers-reduced-motion: reduce) {
  .cta-card::after, .rm-dot-inner { animation: none !important; transition: none !important; }
}
</style>
