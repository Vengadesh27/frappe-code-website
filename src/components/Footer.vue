<script setup lang="ts">
import { APP_NAME, GITHUB_OWNER, GITHUB_REPO } from '../config';
const year = new Date().getFullYear();
</script>

<template>
  <footer class="footer">
    <div class="inner">
      <div class="top">
        <div class="brand">
          <svg width="28" height="28" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <rect width="40" height="40" rx="10" fill="#121317"/>
            <path d="M20 8 L33 30 H7 Z" fill="white" opacity=".9"/>
            <path d="M20 17 L28 30 H12 Z" fill="#121317" opacity=".6"/>
          </svg>
          <div>
            <div class="brand-name">{{ APP_NAME }}</div>
            <div class="brand-sub">A desktop IDE for Frappe</div>
          </div>
        </div>

        <div class="cols">
          <div class="col">
            <div class="col-title">Product</div>
            <router-link to="/#features">Features</router-link>
            <router-link to="/#download">Download</router-link>
            <router-link to="/docs">Documentation</router-link>
          </div>
          <div class="col">
            <div class="col-title">Community</div>
            <a :href="`https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}`" target="_blank" rel="noopener">GitHub</a>
            <a :href="`https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/issues`" target="_blank" rel="noopener">Report an issue</a>
            <a :href="`https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/releases`" target="_blank" rel="noopener">Releases</a>
          </div>
        </div>
      </div>

      <div class="bottom">
        <span>© {{ year }} {{ APP_NAME }}. Released under the MIT license.</span>
        <div class="bottom-links">
          <a :href="`https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}`" target="_blank" rel="noopener">GitHub</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--border);
  background: var(--bg);
}
.inner {
  max-width: calc(var(--max-w) + var(--page-margin) * 2);
  margin: 0 auto;
  padding: 0 var(--page-margin);
}
.top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 48px;
  padding: 52px 0 40px;
  flex-wrap: wrap;
}
.brand {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  flex-shrink: 0;
}
.brand svg { border-radius: 8px; flex-shrink: 0; }
.brand-name {
  font-size: 15px;
  font-weight: 500;
  color: var(--text);
}
.brand-sub {
  font-size: 12.5px;
  color: var(--text-dim);
  margin-top: 2px;
}
.cols {
  display: flex;
  gap: 56px;
  flex-wrap: wrap;
}
.col {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.col-title {
  font-size: 12.5px;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 4px;
  letter-spacing: .02em;
}
.col a {
  font-size: 13px;
  color: var(--text-dim);
  text-decoration: none;
  transition: color 140ms;
}
.col a:hover { color: var(--text); }
.bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px 0;
  border-top: 1px solid var(--border);
  font-size: 12px;
  color: var(--text-dim);
}
.bottom-links {
  display: flex;
  gap: 20px;
}
.bottom-links a {
  font-size: 12px;
  color: var(--text-dim);
  transition: color 140ms;
}
.bottom-links a:hover { color: var(--text); }

@media (max-width: 640px) {
  .top { flex-direction: column; gap: 32px; }
  .bottom { flex-direction: column; gap: 8px; text-align: center; }
}
</style>
