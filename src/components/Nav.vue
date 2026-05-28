<script setup lang="ts">
import { APP_NAME, GITHUB_OWNER, GITHUB_REPO } from '../config';
</script>

<template>
  <header class="nav">
    <div class="container row">
      <router-link to="/" class="brand">
        <span class="logo" aria-hidden="true"></span>
        <span class="name">{{ APP_NAME }}</span>
      </router-link>
      <nav class="links">
        <router-link to="/docs">Docs</router-link>
        <router-link to="/#features">Features</router-link>
        <router-link to="/#download">Download</router-link>
        <a :href="`https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}`" target="_blank" rel="noopener">
          GitHub <span class="ext">↗</span>
        </a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(18px) saturate(140%);
  -webkit-backdrop-filter: blur(18px) saturate(140%);
  background: rgba(10, 13, 18, 0.72);
  border-bottom: 1px solid var(--border);
}
.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}
.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--fg);
}
.logo {
  width: 26px;
  height: 26px;
  border-radius: 7px;
  background: linear-gradient(135deg, #8e72ff, #6a47f5);
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1) inset, 0 0 24px var(--accent-glow);
}
.name {
  font-size: 15px;
}
.links {
  display: flex;
  gap: 26px;
  font-size: 13.5px;
  align-items: center;
}
.links a {
  color: var(--fg-muted);
  transition: color 120ms;
}
.links a:hover,
.links a.router-link-active {
  color: var(--fg);
}
.ext {
  display: inline-block;
  transform: translateY(-1px);
  margin-left: 2px;
}
@media (max-width: 640px) {
  .links a:not(:first-child):not(:last-child) {
    display: none;
  }
}
</style>
