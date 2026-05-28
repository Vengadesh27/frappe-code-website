<script setup lang="ts">
import { APP_NAME, GITHUB_OWNER, GITHUB_REPO } from '../config';
const year = new Date().getFullYear();
</script>

<template>
  <footer class="footer">
    <div class="container row">
      <div class="brand">
        <span class="logo" aria-hidden="true"></span>
        <div>
          <div class="name">{{ APP_NAME }}</div>
          <div class="tag dim">A desktop IDE for Frappe & ERPNext.</div>
        </div>
      </div>
      <nav class="links">
        <router-link to="/">Home</router-link>
        <router-link to="/docs">Documentation</router-link>
        <router-link to="/#download">Download</router-link>
        <a :href="`https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}`" target="_blank" rel="noopener">GitHub ↗</a>
        <a :href="`https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/issues`" target="_blank" rel="noopener">Report an issue ↗</a>
      </nav>
    </div>
    <div class="container fineprint dim">
      © {{ year }} {{ APP_NAME }}. Released under the MIT license.
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 50px 0 30px;
  border-top: 1px solid var(--border);
  background: linear-gradient(180deg, transparent, rgba(124, 92, 255, 0.04));
  margin-top: 60px;
}
.row {
  display: flex;
  justify-content: space-between;
  gap: 32px;
  align-items: flex-start;
  flex-wrap: wrap;
}
.brand {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}
.logo {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: linear-gradient(135deg, #8e72ff, #6a47f5);
}
.name {
  font-weight: 700;
  font-size: 15px;
}
.tag {
  font-size: 12.5px;
  margin-top: 2px;
}
.links {
  display: flex;
  flex-wrap: wrap;
  gap: 22px;
  font-size: 13px;
  color: var(--fg-muted);
}
.links a:hover {
  color: var(--fg);
}
.fineprint {
  margin-top: 36px;
  font-size: 11.5px;
  text-align: center;
  border-top: 1px solid var(--border);
  padding-top: 22px;
}
</style>
