<script setup lang="ts">
import { computed } from 'vue';
import { APP_TAGLINE, APP_SUBTITLE } from '../config';
import { useOS, osLabel } from '../composables/useOS';
import { useRelease, bestAssetForOS, formatBytes } from '../composables/useRelease';

const { os } = useOS();
const { release, loading, releasesPageUrl } = useRelease();

const primaryAsset = computed(() => bestAssetForOS(release.value, os.value));
const version = computed(() => release.value?.tag_name?.replace(/^v/, '') || '');
</script>

<template>
  <section class="hero" id="top">
    <div class="bg-glow" aria-hidden="true"></div>
    <div class="bg-grid" aria-hidden="true"></div>

    <div class="container hero-inner">
      <a class="pill" :href="releasesPageUrl" target="_blank" rel="noopener">
        <span class="dot"></span>
        <span v-if="version">{{ version }} — latest release</span>
        <span v-else-if="loading">Loading latest release…</span>
        <span v-else>Pre-release · check GitHub</span>
      </a>

      <h1 class="headline">
        The <span class="grad">desktop IDE</span><br />
        built for Frappe.
      </h1>

      <p class="lede">{{ APP_TAGLINE }}. {{ APP_SUBTITLE }}</p>

      <div class="cta-row">
        <a v-if="primaryAsset" :href="primaryAsset.browser_download_url" class="btn primary lg" download>
          <span class="os-icon" :data-os="os" aria-hidden="true"></span>
          Download for {{ osLabel(os) }}
          <span class="size dim">{{ formatBytes(primaryAsset.size) }}</span>
        </a>
        <a v-else :href="releasesPageUrl" class="btn primary lg" target="_blank" rel="noopener">
          Download from GitHub
        </a>
        <router-link to="/#download" class="btn ghost lg">All platforms</router-link>
      </div>

      <p class="small-print dim">
        Free and open-source. Works on Linux and macOS.
      </p>
    </div>

    <div class="container preview">
      <div class="preview-frame" aria-hidden="true">
        <div class="window-bar">
          <span class="dot red"></span>
          <span class="dot yellow"></span>
          <span class="dot green"></span>
          <span class="title">frappe-code — chitra-bench</span>
        </div>
        <div class="window-body">
          <aside class="sidebar">
            <div class="sb-item active"><i class="sb-icon files"></i> Explorer</div>
            <div class="sb-item"><i class="sb-icon search"></i> Search</div>
            <div class="sb-item"><i class="sb-icon git"></i> Source Control</div>
            <div class="sb-item"><i class="sb-icon db"></i> Database</div>
            <div class="sb-item"><i class="sb-icon ssh"></i> SSH</div>
            <div class="sb-item"><i class="sb-icon ai"></i> AI Assist</div>
          </aside>
          <section class="editor">
            <div class="tabs">
              <span class="tab active">hooks.py</span>
              <span class="tab">api.py</span>
              <span class="tab">item.json</span>
            </div>
            <pre class="code"><span class="k">from</span> frappe <span class="k">import</span> _
<span class="k">from</span> frappe.utils <span class="k">import</span> nowdate

<span class="c"># Document events — fire on Item save</span>
<span class="k">def</span> <span class="f">validate_item</span>(doc, method):
    <span class="k">if not</span> doc.item_code:
        frappe.throw(_(<span class="s">"Item code is required"</span>))
    doc.last_validated = nowdate()</pre>
          </section>
          <aside class="ai-panel">
            <div class="ai-msg user">Explain this validate_item hook.</div>
            <div class="ai-msg assistant">
              <span class="typing">It's a controller method bound to <code>Item</code>'s <code>validate</code> event…</span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  padding: 92px 0 60px;
  overflow: hidden;
  isolation: isolate;
}
.bg-glow {
  position: absolute;
  inset: -10% -10% 30% -10%;
  background:
    radial-gradient(60% 50% at 50% 0%, rgba(124, 92, 255, 0.35), transparent 70%),
    radial-gradient(40% 40% at 20% 30%, rgba(106, 71, 245, 0.25), transparent 70%),
    radial-gradient(40% 40% at 80% 30%, rgba(74, 222, 128, 0.12), transparent 70%);
  filter: blur(30px);
  z-index: -2;
}
.bg-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(to bottom, transparent 0%, var(--bg) 90%),
    linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
  background-size: 100% 100%, 32px 32px, 32px 32px;
  z-index: -1;
  pointer-events: none;
}
.hero-inner {
  text-align: center;
  padding-top: 24px;
}
.pill {
  text-decoration: none;
  margin-bottom: 28px;
}
.pill .dot {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: var(--success);
  box-shadow: 0 0 12px var(--success);
}
.headline {
  font-size: clamp(40px, 6.8vw, 78px);
  line-height: 1.04;
  letter-spacing: -0.035em;
  font-weight: 800;
  margin: 0 0 24px;
  max-width: 980px;
  margin-inline: auto;
}
.grad {
  background: linear-gradient(110deg, #c4b5fd 0%, #7c5cff 30%, #4ade80 80%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}
.lede {
  font-size: clamp(15px, 1.6vw, 18px);
  color: var(--fg-muted);
  max-width: 660px;
  margin: 0 auto 36px;
  line-height: 1.6;
}
.cta-row {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}
.btn.lg {
  padding: 14px 22px;
  font-size: 15px;
}
.size {
  font-weight: 500;
  margin-left: 4px;
  opacity: 0.85;
}
.small-print {
  margin-top: 16px;
  font-size: 12.5px;
}
.os-icon {
  width: 16px;
  height: 16px;
  display: inline-block;
  background: currentColor;
  mask-position: center;
  mask-repeat: no-repeat;
  mask-size: contain;
  -webkit-mask-position: center;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-size: contain;
}
.os-icon[data-os='linux'] {
  mask-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 2c-2.5 0-4 2-4 5 0 1.5.5 2.5 0 3.5S6 12.5 6 14s2 3 2 4-2 1.5-2 3 4 1 6 1 6 .5 6-1-2-2-2-3 2-2.5 2-4-1.5-2.5-2-3.5S16 8.5 16 7c0-3-1.5-5-4-5z'/%3E%3C/svg%3E");
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 2c-2.5 0-4 2-4 5 0 1.5.5 2.5 0 3.5S6 12.5 6 14s2 3 2 4-2 1.5-2 3 4 1 6 1 6 .5 6-1-2-2-2-3 2-2.5 2-4-1.5-2.5-2-3.5S16 8.5 16 7c0-3-1.5-5-4-5z'/%3E%3C/svg%3E");
}
.os-icon[data-os='mac'] {
  mask-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18 16.5c-.6 1.3-1.3 2.6-2.5 2.6-1.1 0-1.5-.7-2.8-.7s-1.7.7-2.8.7c-1.2 0-2-1.3-2.6-2.6C5.7 13.6 5 9 7.6 6.5c1.2-1.1 2.5-1.6 3.6-1.6.9 0 1.7.4 2.2.4s1.5-.5 2.5-.4c.4 0 1.7.2 2.5 1.2-.1 0-2.1 1.2-2.1 3.6 0 2.9 2.5 3.9 2.5 4 0 .1-.4 1.4-1.3 2.8zM13 4.5c.6-.7 1-1.6 1-2.5-.9 0-2 .6-2.5 1.4-.5.6-.9 1.5-.8 2.4 1 .1 2-.6 2.3-1.3z'/%3E%3C/svg%3E");
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18 16.5c-.6 1.3-1.3 2.6-2.5 2.6-1.1 0-1.5-.7-2.8-.7s-1.7.7-2.8.7c-1.2 0-2-1.3-2.6-2.6C5.7 13.6 5 9 7.6 6.5c1.2-1.1 2.5-1.6 3.6-1.6.9 0 1.7.4 2.2.4s1.5-.5 2.5-.4c.4 0 1.7.2 2.5 1.2-.1 0-2.1 1.2-2.1 3.6 0 2.9 2.5 3.9 2.5 4 0 .1-.4 1.4-1.3 2.8zM13 4.5c.6-.7 1-1.6 1-2.5-.9 0-2 .6-2.5 1.4-.5.6-.9 1.5-.8 2.4 1 .1 2-.6 2.3-1.3z'/%3E%3C/svg%3E");
}
.os-icon[data-os='windows'] {
  mask-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3 5.5L11 4v8H3V5.5zM3 12.5h8v8L3 19v-6.5zM12 4l9-1.3V12h-9V4zm0 9h9v8.3L12 20v-7z'/%3E%3C/svg%3E");
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3 5.5L11 4v8H3V5.5zM3 12.5h8v8L3 19v-6.5zM12 4l9-1.3V12h-9V4zm0 9h9v8.3L12 20v-7z'/%3E%3C/svg%3E");
}

/* Preview window mockup */
.preview {
  margin-top: 70px;
  perspective: 1500px;
}
.preview-frame {
  background: var(--bg-card);
  border: 1px solid var(--border-strong);
  border-radius: 12px;
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.05) inset,
    0 60px 120px -30px rgba(0, 0, 0, 0.8),
    0 0 120px -20px var(--accent-glow);
  overflow: hidden;
  transform: rotateX(8deg);
  transform-origin: 50% 100%;
}
.window-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.02);
  border-bottom: 1px solid var(--border);
}
.window-bar .dot {
  width: 11px;
  height: 11px;
  border-radius: 999px;
}
.window-bar .dot.red { background: #fb7185; }
.window-bar .dot.yellow { background: #fbbf24; }
.window-bar .dot.green { background: #4ade80; }
.window-bar .title {
  margin-left: auto;
  margin-right: auto;
  font-size: 12px;
  color: var(--fg-muted);
}
.window-body {
  display: grid;
  grid-template-columns: 200px 1fr 280px;
  min-height: 320px;
}
.sidebar {
  border-right: 1px solid var(--border);
  padding: 10px 6px;
  font-size: 12.5px;
}
.sb-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: 5px;
  color: var(--fg-muted);
}
.sb-item.active {
  background: var(--accent-soft);
  color: var(--fg);
}
.sb-icon {
  width: 12px;
  height: 12px;
  border-radius: 2px;
  background: currentColor;
  opacity: 0.6;
}
.editor {
  display: flex;
  flex-direction: column;
}
.tabs {
  display: flex;
  border-bottom: 1px solid var(--border);
  font-size: 12.5px;
}
.tab {
  padding: 9px 14px;
  color: var(--fg-muted);
  border-right: 1px solid var(--border);
}
.tab.active {
  color: var(--fg);
  background: var(--bg);
}
.code {
  flex: 1;
  margin: 0;
  padding: 18px 22px;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 12.5px;
  line-height: 1.7;
  color: var(--fg);
  background: var(--bg);
  text-align: left;
  white-space: pre;
  overflow: auto;
}
.code .k { color: #7c5cff; }
.code .f { color: #8e72ff; }
.code .s { color: #4ade80; }
.code .c { color: #6b7280; font-style: italic; }
.ai-panel {
  border-left: 1px solid var(--border);
  padding: 16px 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 12.5px;
}
.ai-msg {
  padding: 10px 12px;
  border-radius: 8px;
  line-height: 1.55;
  text-align: left;
}
.ai-msg.user {
  background: var(--bg-card-hover);
  color: var(--fg);
}
.ai-msg.assistant {
  background: var(--accent-soft);
  color: var(--fg);
}
.ai-msg.assistant code {
  background: rgba(255, 255, 255, 0.06);
  padding: 0 4px;
  border-radius: 3px;
}
@media (max-width: 920px) {
  .window-body {
    grid-template-columns: 160px 1fr;
  }
  .ai-panel {
    display: none;
  }
}
@media (max-width: 560px) {
  .window-body {
    grid-template-columns: 1fr;
  }
  .sidebar {
    display: none;
  }
  .preview-frame {
    transform: none;
  }
  .code {
    font-size: 11px;
    padding: 12px;
  }
}
</style>
