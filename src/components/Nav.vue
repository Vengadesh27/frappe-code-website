<script setup lang="ts">
import { APP_NAME, GITHUB_OWNER, GITHUB_REPO, DOWNLOAD_RELEASES_URL } from '../config';
</script>

<template>
  <header class="nav">
    <div class="inner">
      <router-link to="/" class="brand">
        <svg class="logo" viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <rect width="40" height="40" rx="10" fill="#121317"/>
          <path d="M20 8 L33 30 H7 Z" fill="white" opacity=".9"/>
          <path d="M20 17 L28 30 H12 Z" fill="#121317" opacity=".6"/>
        </svg>
        <span class="name">{{ APP_NAME }}</span>
      </router-link>

      <nav class="links">
        <router-link to="/#features" class="nav-link">Features</router-link>
        <router-link to="/#download" class="nav-link">Download</router-link>
        <router-link to="/docs" class="nav-link">Docs</router-link>
        <a
          :href="`https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}`"
          class="nav-link"
          target="_blank"
          rel="noopener"
        >GitHub</a>
      </nav>

      <a :href="DOWNLOAD_RELEASES_URL" class="btn-cta" target="_blank" rel="noopener">
        Download
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
          <path d="M6.5 2v7M3 7l3.5 3.5L10 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
  height: var(--nav-h);
}
.inner {
  max-width: calc(var(--max-w) + var(--page-margin) * 2);
  margin: 0 auto;
  padding: 0 var(--page-margin);
  height: 100%;
  display: flex;
  align-items: center;
  gap: 32px;
}
.brand {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  flex-shrink: 0;
  text-decoration: none;
}
.logo {
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  border-radius: 7px;
}
.name {
  font-size: 15px;
  font-weight: 500;
  color: var(--text);
  letter-spacing: -0.01em;
}
.links {
  display: flex;
  align-items: center;
  gap: 2px;
  flex: 1;
}
.nav-link {
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 450;
  color: var(--text-sec);
  border-radius: var(--radius-pill);
  transition: background 140ms, color 140ms;
  text-decoration: none;
}
.nav-link:hover,
.nav-link.router-link-active {
  background: var(--surface-high);
  color: var(--text);
}
.btn-cta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 18px;
  background: var(--text);
  color: var(--bg);
  border-radius: var(--radius-pill);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  flex-shrink: 0;
  transition: opacity 160ms;
  margin-left: auto;
}
.btn-cta:hover { opacity: .85; }

@media (max-width: 768px) {
  .links { display: none; }
  .inner { gap: 0; }
  .btn-cta { margin-left: auto; }
}
</style>
