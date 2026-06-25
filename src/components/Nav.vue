<script setup lang="ts">
import { APP_NAME, GITHUB_OWNER, GITHUB_REPO } from '../config';
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
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
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
  gap: 8px;
}
.brand {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  flex-shrink: 0;
  text-decoration: none;
  margin-right: 16px;
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
}
.nav-link {
  padding: 6px 13px;
  font-size: 14px;
  font-weight: 450;
  color: var(--text-sec);
  border-radius: var(--radius-pill);
  transition: background 140ms, color 140ms;
  text-decoration: none;
  white-space: nowrap;
}
.nav-link:hover,
.nav-link.router-link-active {
  background: var(--surface-high);
  color: var(--text);
}

@media (max-width: 640px) {
  .links { display: none; }
}
</style>
