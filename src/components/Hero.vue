<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { DOWNLOAD_RELEASES_URL, GITHUB_OWNER, GITHUB_REPO } from '../config';

let animId = 0;

onMounted(() => {
  const canvas = document.getElementById('hero-canvas') as HTMLCanvasElement | null;
  if (!canvas) return;
  const ctx = canvas.getContext('2d')!;
  let W = 0, H = 0;
  interface Dot { x: number; y: number; r: number; vx: number; vy: number; color: string; }
  let dots: Dot[] = [];

  function resize() {
    W = canvas!.width  = canvas!.parentElement!.offsetWidth;
    H = canvas!.height = canvas!.parentElement!.offsetHeight;
    dots = Array.from({ length: 130 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2.2 + 0.6,
      vx: (Math.random() - .5) * .35,
      vy: (Math.random() - .5) * .35,
      color: Math.random() < .55
        ? `rgba(50,121,249,${(Math.random() * .45 + .15).toFixed(2)})`
        : `rgba(234,67,53,${(Math.random() * .35 + .1).toFixed(2)})`,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (const d of dots) {
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = d.color;
      ctx.fill();
      d.x += d.vx; d.y += d.vy;
      if (d.x < 0 || d.x > W) d.vx *= -1;
      if (d.y < 0 || d.y > H) d.vy *= -1;
    }
    animId = requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();
});

onUnmounted(() => {
  cancelAnimationFrame(animId);
});
</script>

<template>
  <section class="hero" id="top">
    <canvas id="hero-canvas" aria-hidden="true"></canvas>

    <div class="hero-inner">
      <div class="hero-brand">
        <svg width="20" height="20" viewBox="0 0 40 40" fill="none">
          <rect width="40" height="40" rx="10" fill="#121317"/>
          <path d="M20 8 L33 30 H7 Z" fill="white" opacity=".9"/>
          <path d="M20 17 L28 30 H12 Z" fill="#121317" opacity=".6"/>
        </svg>
        Frappe Code
      </div>

      <h1 class="headline">
        The desktop IDE built<br />for Frappe developers
      </h1>

      <p class="lede">
        Monaco editor, one-click bench commands, Git, terminal, SSH,<br class="br-md" />
        database browser, API client — all in a single native window.
      </p>

      <div class="cta-row">
        <a :href="DOWNLOAD_RELEASES_URL" class="btn-dl" target="_blank" rel="noopener">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <circle cx="7.5" cy="7.5" r="6.5" stroke="currentColor" stroke-width="1.3"/>
            <path d="M4.5 7l3 2.5 3-2.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7.5 4.5v5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
          </svg>
          Download Alpha 1
        </a>
        <a :href="`https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}`" class="btn-secondary" target="_blank" rel="noopener">
          Explore on GitHub
        </a>
      </div>

      <p class="small-note">Free and open-source · Linux (AppImage &amp; .deb) · Alpha release</p>
    </div>

    <!-- App window mockup -->
    <div class="preview-wrap">
      <div class="app-window">
        <div class="win-bar">
          <span class="dot red"></span>
          <span class="dot yellow"></span>
          <span class="dot green"></span>
          <span class="win-title">Frappe Code — chitra-bench</span>
        </div>
        <div class="win-body">
          <aside class="win-sidebar">
            <div class="sb active">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="2" width="4" height="4" rx=".8" stroke="currentColor" stroke-width="1.2"/><rect x="8" y="2" width="4" height="4" rx=".8" stroke="currentColor" stroke-width="1.2"/><rect x="2" y="8" width="4" height="4" rx=".8" stroke="currentColor" stroke-width="1.2"/><rect x="8" y="8" width="4" height="4" rx=".8" stroke="currentColor" stroke-width="1.2"/></svg>
              Explorer
            </div>
            <div class="sb">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="6" cy="6" r="4" stroke="currentColor" stroke-width="1.2"/><path d="M9.5 9.5L12 12" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
              Search
            </div>
            <div class="sb">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 3v6a2 2 0 0 0 2 2h4M7 1l3 2-3 2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              Git
            </div>
            <div class="sb">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="2" width="10" height="10" rx="1.5" stroke="currentColor" stroke-width="1.2"/><path d="M2 6h10" stroke="currentColor" stroke-width="1.2"/></svg>
              Database
            </div>
            <div class="sb">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 4h10M2 7h7M2 10h5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
              Logs
            </div>
            <div class="sb">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="3" width="12" height="9" rx="1.5" stroke="currentColor" stroke-width="1.2"/><path d="M4 6.5l2 1.5-2 1.5M7.5 9h3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              Terminal
            </div>
            <div class="sb">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="5" r="2.5" stroke="currentColor" stroke-width="1.2"/><path d="M1 12c0-2.8 2.7-5 6-5s6 2.2 6 5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
              SSH
            </div>
          </aside>
          <div class="win-editor">
            <div class="tabs">
              <span class="tab active">hooks.py</span>
              <span class="tab">api.py</span>
              <span class="tab">item.json</span>
            </div>
            <pre class="code"><span class="k">from</span> frappe <span class="k">import</span> _
<span class="k">from</span> frappe.utils <span class="k">import</span> nowdate

<span class="c"># Fires on every Item save</span>
<span class="k">def</span> <span class="f">validate_item</span>(doc, method):
    <span class="k">if not</span> doc.item_code:
        frappe.throw(_(<span class="s">"Item code is required"</span>))
    doc.last_validated = nowdate()</pre>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: var(--nav-h);
  overflow: hidden;
}

canvas#hero-canvas {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.hero-inner {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 80px var(--page-margin) 0;
  max-width: calc(var(--max-w) + var(--page-margin) * 2);
  width: 100%;
}

.hero-brand {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 450;
  color: var(--text-sec);
  margin-bottom: 28px;
}

.headline {
  font-size: clamp(40px, 6vw, 88px);
  font-weight: 450;
  line-height: 1.04;
  letter-spacing: -0.025em;
  color: var(--text);
  margin: 0 0 26px;
}

.lede {
  font-size: clamp(15px, 1.5vw, 17px);
  color: var(--text-sec);
  line-height: 1.65;
  max-width: 640px;
  margin: 0 auto 40px;
}

.cta-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 18px;
}

.btn-dl {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 13px 24px;
  background: var(--text);
  color: var(--bg);
  border-radius: var(--radius-pill);
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
  transition: opacity 160ms;
}
.btn-dl:hover { opacity: .85; }

.btn-secondary {
  display: inline-flex;
  align-items: center;
  padding: 13px 24px;
  background: var(--surface-high);
  color: var(--text);
  border-radius: var(--radius-pill);
  font-size: 15px;
  font-weight: 450;
  text-decoration: none;
  transition: background 160ms;
}
.btn-secondary:hover { background: var(--surface-higher); }

.small-note {
  font-size: 12.5px;
  color: var(--text-dim);
  margin: 0;
}

/* ── App window mockup ── */
.preview-wrap {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: calc(var(--max-w) + var(--page-margin) * 2);
  padding: 52px var(--page-margin) 0;
}

.app-window {
  background: var(--bg);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 8px 60px rgba(0,0,0,.08), 0 1px 0 rgba(0,0,0,.04);
  transform: perspective(1600px) rotateX(4deg);
  transform-origin: 50% 0;
}

.win-bar {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 10px 16px;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
}
.dot { width: 11px; height: 11px; border-radius: 50%; }
.dot.red    { background: #ff5f57; }
.dot.yellow { background: #febc2e; }
.dot.green  { background: #28c840; }
.win-title {
  margin: 0 auto;
  font-size: 12px;
  color: var(--text-dim);
}

.win-body {
  display: grid;
  grid-template-columns: 190px 1fr;
  min-height: 300px;
}

.win-sidebar {
  border-right: 1px solid var(--border);
  padding: 10px 6px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.sb {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 12.5px;
  color: var(--text-dim);
  cursor: pointer;
}
.sb.active {
  background: rgba(33,34,38,.07);
  color: var(--text);
}
.sb svg { flex-shrink: 0; opacity: .7; }

.win-editor { display: flex; flex-direction: column; }
.tabs {
  display: flex;
  border-bottom: 1px solid var(--border);
  background: var(--surface);
}
.tab {
  padding: 8px 16px;
  font-size: 12.5px;
  color: var(--text-dim);
  border-right: 1px solid var(--border);
}
.tab.active {
  color: var(--text);
  background: var(--bg);
}

.code {
  flex: 1;
  margin: 0;
  padding: 18px 22px;
  font-family: 'Google Sans Code', ui-monospace, monospace;
  font-size: 12.5px;
  line-height: 1.7;
  color: var(--text);
  background: var(--bg);
  text-align: left;
  white-space: pre;
  overflow: auto;
}
.code .k { color: #7c3aed; }
.code .f { color: #0077aa; font-style: italic; }
.code .s { color: #067d17; }
.code .c { color: #9ca3af; font-style: italic; }

.br-md { display: none; }

@media (min-width: 900px) {
  .br-md { display: inline; }
}

@media (max-width: 768px) {
  .headline { font-size: 38px; }
  .win-body { grid-template-columns: 1fr; }
  .win-sidebar { display: none; }
  .app-window { transform: none; }
}
</style>
