<script setup lang="ts">
import { computed } from 'vue';
import { useRelease, assetOS, formatBytes } from '../composables/useRelease';
import { useOS } from '../composables/useOS';

const { release, loading, error, releasesPageUrl } = useRelease();
const { os } = useOS();

interface Platform {
  id: 'linux' | 'mac' | 'windows';
  label: string;
  byline: string;
  extensions: string[];
}

const platforms: Platform[] = [
  { id: 'linux', label: 'Linux', byline: 'AppImage · deb', extensions: ['.AppImage', '.deb'] },
  { id: 'mac', label: 'macOS', byline: 'Intel & Apple Silicon', extensions: ['.dmg', '-mac.zip'] },
];

const assetsByOS = computed(() => {
  const out: Record<string, ReturnType<typeof Array.prototype.filter>> = {};
  if (!release.value) return out;
  for (const p of platforms) {
    out[p.id] = release.value.assets.filter((a) => assetOS(a.name) === p.id);
  }
  return out;
});
</script>

<template>
  <section class="section dl" id="download">
    <div class="container">
      <span class="pill">Download</span>
      <h2>Get Frappe Code <span class="grad">free</span>.</h2>
      <p class="sub">
        Open-source. No account, no telemetry. Pick your platform.
        <a v-if="release" :href="release.html_url" target="_blank" rel="noopener" class="release-link">
          Release notes for {{ release.tag_name }} ↗
        </a>
      </p>

      <div v-if="loading" class="state">Loading latest release from GitHub…</div>
      <div v-else-if="error" class="state error">
        {{ error }}
        <a :href="releasesPageUrl" target="_blank" rel="noopener">Open Releases page ↗</a>
      </div>

      <div v-else class="grid">
        <div
          v-for="p in platforms"
          :key="p.id"
          class="dl-card"
          :class="{ current: os === p.id }"
        >
          <div class="dl-head">
            <span class="os-name">{{ p.label }}</span>
            <span v-if="os === p.id" class="badge">Detected</span>
          </div>
          <div class="byline muted">{{ p.byline }}</div>
          <div v-if="assetsByOS[p.id]?.length" class="assets">
            <a
              v-for="a in assetsByOS[p.id]"
              :key="a.name"
              :href="(a as any).browser_download_url"
              class="asset"
              download
            >
              <span class="name mono">{{ (a as any).name }}</span>
              <span class="size dim">{{ formatBytes((a as any).size) }}</span>
            </a>
          </div>
          <div v-else class="state mini">No asset for this platform yet.</div>
        </div>
      </div>

      <p class="all-releases dim">
        Looking for an older version?
        <a :href="releasesPageUrl" target="_blank" rel="noopener">All releases on GitHub ↗</a>
      </p>
    </div>
  </section>
</template>

<style scoped>
.dl h2 {
  margin-bottom: 6px;
}
.grad {
  background: linear-gradient(110deg, #c4b5fd, #7c5cff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.release-link {
  margin-left: 8px;
  color: var(--accent);
}
.release-link:hover {
  text-decoration: underline;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 14px;
}
.dl-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 22px;
  transition: border-color 160ms;
}
.dl-card.current {
  border-color: rgba(124, 92, 255, 0.45);
  background:
    radial-gradient(80% 80% at 50% 0%, rgba(124, 92, 255, 0.1), transparent 60%),
    var(--bg-card);
}
.dl-head {
  display: flex;
  align-items: center;
  gap: 10px;
}
.os-name {
  font-size: 18px;
  font-weight: 700;
}
.badge {
  font-size: 10.5px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 999px;
  background: var(--accent-soft);
  color: var(--accent);
}
.byline {
  font-size: 13px;
  margin: 2px 0 16px;
}
.assets {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.asset {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 10px 12px;
  background: var(--bg-elev);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  transition: background 120ms, border-color 120ms;
}
.asset:hover {
  background: var(--bg-card-hover);
  border-color: var(--border-strong);
}
.asset .name {
  font-size: 12.5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.asset .size {
  font-size: 12px;
  flex-shrink: 0;
}
.state {
  padding: 26px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--fg-muted);
  text-align: center;
}
.state.error {
  color: var(--warning);
}
.state.mini {
  padding: 14px;
  font-size: 12.5px;
}
.state a {
  margin-left: 8px;
  color: var(--accent);
}
.state a:hover {
  text-decoration: underline;
}
.all-releases {
  margin-top: 22px;
  font-size: 12.5px;
  text-align: center;
}
.all-releases a {
  color: var(--accent);
}
.all-releases a:hover {
  text-decoration: underline;
}
</style>
