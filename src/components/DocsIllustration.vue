<script setup lang="ts">
defineProps<{ kind: string }>();
// Lightweight SVG illustrations standing in for real screenshots. Each frame
// hints at the UI shape the surrounding section describes — drop a real PNG
// into /public/screenshots/<kind>.png and replace this component with a
// regular <img> when you have one.
</script>

<template>
  <figure class="illu" :class="`k-${kind}`">
    <!-- welcome -->
    <svg v-if="kind === 'welcome'" viewBox="0 0 720 360" xmlns="http://www.w3.org/2000/svg">
      <rect width="720" height="360" rx="10" fill="#11151c" />
      <rect x="20" y="20" width="680" height="24" rx="6" fill="#1c2230" />
      <circle cx="34" cy="32" r="5" fill="#fb7185" /><circle cx="50" cy="32" r="5" fill="#fbbf24" /><circle cx="66" cy="32" r="5" fill="#4ade80" />
      <rect x="40" y="80" width="280" height="38" rx="6" fill="#161b24" stroke="#7c5cff" />
      <text x="58" y="104" fill="#e7e9ee" font-family="Inter" font-size="14" font-weight="600">Open Bench Folder…</text>
      <rect x="40" y="130" width="280" height="38" rx="6" fill="#161b24" stroke="#2a3140" />
      <text x="58" y="154" fill="#9aa1ad" font-family="Inter" font-size="14">Create New Bench…</text>
      <rect x="40" y="180" width="280" height="38" rx="6" fill="#161b24" stroke="#2a3140" />
      <text x="58" y="204" fill="#9aa1ad" font-family="Inter" font-size="14">Open File…</text>
      <rect x="360" y="80" width="320" height="240" rx="8" fill="#0c1218" stroke="#1c2230" />
      <text x="380" y="110" fill="#9aa1ad" font-family="Inter" font-size="12">Recent</text>
      <rect x="380" y="124" width="280" height="28" rx="4" fill="#161b24" />
      <text x="394" y="143" fill="#e7e9ee" font-family="Inter" font-size="12">~/chitra-bench</text>
      <rect x="380" y="160" width="280" height="28" rx="4" fill="#161b24" />
      <text x="394" y="179" fill="#e7e9ee" font-family="Inter" font-size="12">~/Documents/aaxdcd</text>
    </svg>

    <!-- editor -->
    <svg v-else-if="kind === 'editor'" viewBox="0 0 720 360" xmlns="http://www.w3.org/2000/svg">
      <rect width="720" height="360" rx="10" fill="#0c1116" />
      <rect x="0" y="0" width="48" height="360" fill="#11151c" />
      <rect x="48" y="0" width="200" height="360" fill="#11151c" />
      <text x="60" y="28" fill="#9aa1ad" font-family="Inter" font-size="11" font-weight="700" letter-spacing="0.08em">EXPLORER</text>
      <g v-for="(label, i) in ['apps', 'sites', 'config', 'logs', 'env', '— frappe', '— erpnext']" :key="i">
        <text :x="64 + (label.startsWith('—') ? 16 : 0)" :y="56 + i * 22" fill="#9aa1ad" font-family="JetBrains Mono" font-size="12">{{ label }}</text>
      </g>
      <rect x="248" y="0" width="472" height="32" fill="#161b24" />
      <rect x="248" y="0" width="160" height="32" fill="#0c1116" />
      <text x="270" y="20" fill="#e7e9ee" font-family="Inter" font-size="12">hooks.py</text>
      <text x="430" y="20" fill="#9aa1ad" font-family="Inter" font-size="12">api.py</text>
      <text x="496" y="20" fill="#9aa1ad" font-family="Inter" font-size="12">item.json</text>
      <g font-family="JetBrains Mono" font-size="12">
        <text x="266" y="60" fill="#6b7280">1</text><text x="290" y="60" fill="#7c5cff">from</text><text x="324" y="60" fill="#e7e9ee">frappe</text><text x="372" y="60" fill="#7c5cff">import</text><text x="420" y="60" fill="#e7e9ee">_</text>
        <text x="266" y="80" fill="#6b7280">2</text>
        <text x="266" y="100" fill="#6b7280">3</text><text x="290" y="100" fill="#6b7280" font-style="italic"># Hook callbacks</text>
        <text x="266" y="120" fill="#6b7280">4</text><text x="290" y="120" fill="#7c5cff">def</text><text x="320" y="120" fill="#8e72ff">validate_item</text><text x="424" y="120" fill="#e7e9ee">(doc, method):</text>
        <text x="266" y="140" fill="#6b7280">5</text><text x="306" y="140" fill="#7c5cff">if not</text><text x="348" y="140" fill="#e7e9ee">doc.item_code:</text>
        <text x="266" y="160" fill="#6b7280">6</text><text x="322" y="160" fill="#e7e9ee">frappe.throw(_(</text><text x="438" y="160" fill="#4ade80">"Item code required"</text><text x="582" y="160" fill="#e7e9ee">))</text>
      </g>
    </svg>

    <!-- actions -->
    <svg v-else-if="kind === 'actions'" viewBox="0 0 720 220" xmlns="http://www.w3.org/2000/svg">
      <rect width="720" height="220" rx="10" fill="#11151c" />
      <g transform="translate(20,20)">
        <rect width="680" height="40" rx="6" fill="#161b24" />
        <g v-for="(label, i) in ['Start', 'Migrate', 'Build', 'Restart', 'Clear', 'Health', 'Update']" :key="i">
          <rect :x="10 + i * 96" y="6" width="86" height="28" rx="5" fill="#1c2230" />
          <text :x="20 + i * 96" y="25" fill="#e7e9ee" font-family="Inter" font-size="12">{{ label }}</text>
        </g>
      </g>
      <g transform="translate(20,80)">
        <rect width="680" height="120" rx="6" fill="#0c1218" />
        <text x="14" y="22" fill="#9aa1ad" font-family="Inter" font-size="11" font-weight="700" letter-spacing="0.08em">SERVICE STATUS</text>
        <g v-for="(s, i) in [['web','running'], ['worker','running'], ['scheduler','running'], ['redis','running']]" :key="i">
          <rect :x="14 + i * 165" y="38" width="155" height="64" rx="6" fill="#161b24" />
          <circle :cx="30 + i * 165" cy="58" r="4" fill="#4ade80" />
          <text :x="44 + i * 165" y="62" fill="#e7e9ee" font-family="Inter" font-size="13" font-weight="600">{{ s[0] }}</text>
          <text :x="30 + i * 165" y="86" fill="#9aa1ad" font-family="Inter" font-size="11">{{ s[1] }}</text>
        </g>
      </g>
    </svg>

    <!-- sites -->
    <svg v-else-if="kind === 'sites'" viewBox="0 0 720 280" xmlns="http://www.w3.org/2000/svg">
      <rect width="720" height="280" rx="10" fill="#11151c" />
      <g v-for="(s, i) in [['chitra.local','default','selected'], ['demo.localhost','',''], ['test.localhost','','']]" :key="i" :transform="`translate(20, ${20 + i * 78})`">
        <rect width="680" height="64" rx="8" :fill="i === 0 ? '#161b24' : '#0e131a'" :stroke="i === 0 ? '#7c5cff' : '#1c2230'" />
        <circle cx="36" cy="32" r="14" fill="#7c5cff" />
        <text x="64" y="28" fill="#e7e9ee" font-family="Inter" font-size="14" font-weight="600">{{ s[0] }}</text>
        <g v-if="s[1]"><rect x="180" y="16" width="60" height="20" rx="10" fill="#7c5cff33" /><text x="194" y="30" fill="#7c5cff" font-family="Inter" font-size="11" font-weight="600">{{ s[1] }}</text></g>
        <g v-if="s[2]"><rect x="246" y="16" width="68" height="20" rx="10" fill="#4ade8022" /><text x="258" y="30" fill="#4ade80" font-family="Inter" font-size="11" font-weight="600">{{ s[2] }}</text></g>
        <text x="64" y="48" fill="#9aa1ad" font-family="Inter" font-size="12">active · /home/user/bench/sites/{{ s[0] }}</text>
        <g v-for="(b, j) in ['Use', '⚙', '◫', '☷', '↑']" :key="j">
          <rect :x="540 + j * 26" y="18" width="22" height="28" rx="4" fill="#1c2230" />
          <text :x="544 + j * 26 + (b === 'Use' ? -1 : 6)" y="36" fill="#e7e9ee" font-family="Inter" font-size="11" font-weight="600">{{ b }}</text>
        </g>
      </g>
    </svg>

    <!-- hooks -->
    <svg v-else-if="kind === 'hooks'" viewBox="0 0 720 280" xmlns="http://www.w3.org/2000/svg">
      <rect width="720" height="280" rx="10" fill="#0c1116" />
      <rect x="0" y="0" width="220" height="280" fill="#11151c" />
      <text x="16" y="26" fill="#9aa1ad" font-family="Inter" font-size="11" font-weight="700" letter-spacing="0.08em">PRINT FORMATS</text>
      <g v-for="(name, i) in ['35×25mm Stock Recon', 'Sales Invoice', 'Delivery Note', 'Purchase Order']" :key="i">
        <rect x="10" :y="40 + i * 38" width="200" height="32" rx="4" :fill="i === 0 ? '#7c5cff33' : 'transparent'" />
        <text x="22" :y="60 + i * 38" fill="#e7e9ee" font-family="Inter" font-size="12">{{ name }}</text>
      </g>
      <rect x="240" y="20" width="460" height="40" rx="6" fill="#1c2230" />
      <text x="256" y="44" fill="#e7e9ee" font-family="Inter" font-size="13" font-weight="600">35 × 25mm Stock Reconciliation</text>
      <rect x="240" y="76" width="460" height="184" rx="6" fill="#0c1218" stroke="#1c2230" />
      <g font-family="JetBrains Mono" font-size="11.5" v-pre>
        <text x="256" y="100" fill="#6b7280">1</text><text x="278" y="100" fill="#fb7185">&lt;div</text><text x="306" y="100" fill="#fbbf24">class</text><text x="338" y="100" fill="#9aa1ad">=</text><text x="346" y="100" fill="#4ade80">"print-format"</text><text x="448" y="100" fill="#fb7185">&gt;</text>
        <text x="256" y="120" fill="#6b7280">2</text><text x="290" y="120" fill="#7c5cff">{% for</text><text x="334" y="120" fill="#e7e9ee">i in doc.items</text><text x="430" y="120" fill="#7c5cff">%}</text>
        <text x="256" y="140" fill="#6b7280">3</text><text x="302" y="140" fill="#fb7185">&lt;p&gt;</text><text x="328" y="140" fill="#7c5cff">{{</text><text x="346" y="140" fill="#e7e9ee">i.item_code</text><text x="424" y="140" fill="#7c5cff">}}</text><text x="442" y="140" fill="#fb7185">&lt;/p&gt;</text>
      </g>
    </svg>

    <!-- db -->
    <svg v-else-if="kind === 'db'" viewBox="0 0 720 280" xmlns="http://www.w3.org/2000/svg">
      <rect width="720" height="280" rx="10" fill="#11151c" />
      <rect x="0" y="0" width="220" height="280" fill="#0c1116" />
      <text x="16" y="26" fill="#9aa1ad" font-family="Inter" font-size="11" font-weight="700" letter-spacing="0.08em">TABLES</text>
      <g v-for="(t, i) in ['tabItem', 'tabSales Invoice', 'tabCustomer', 'tabSupplier', 'tabAddress']" :key="i">
        <text x="20" :y="56 + i * 26" fill="#e7e9ee" font-family="JetBrains Mono" font-size="12">{{ t }}</text>
      </g>
      <rect x="240" y="20" width="460" height="100" rx="6" fill="#0c1218" stroke="#1c2230" />
      <g font-family="JetBrains Mono" font-size="11.5">
        <text x="256" y="44" fill="#7c5cff">SELECT</text><text x="304" y="44" fill="#e7e9ee">name, item_code, stock_qty</text>
        <text x="256" y="64" fill="#7c5cff">FROM</text><text x="296" y="64" fill="#e7e9ee">tabItem</text>
        <text x="256" y="84" fill="#7c5cff">WHERE</text><text x="304" y="84" fill="#e7e9ee">disabled =</text><text x="380" y="84" fill="#fbbf24">0</text>
      </g>
      <rect x="240" y="132" width="460" height="128" rx="6" fill="#0c1218" stroke="#1c2230" />
      <g font-family="Inter" font-size="11">
        <text x="256" y="150" fill="#9aa1ad" font-weight="700">name</text><text x="380" y="150" fill="#9aa1ad" font-weight="700">item_code</text><text x="540" y="150" fill="#9aa1ad" font-weight="700">stock_qty</text>
        <g v-for="i in 4" :key="i"><text x="256" :y="170 + (i-1) * 18" fill="#e7e9ee">ITM-000{{i}}</text><text x="380" :y="170 + (i-1) * 18" fill="#e7e9ee">SKU-A{{i}}</text><text x="540" :y="170 + (i-1) * 18" fill="#fbbf24">{{ i * 12 }}</text></g>
      </g>
    </svg>

    <!-- ssh -->
    <svg v-else-if="kind === 'ssh'" viewBox="0 0 720 260" xmlns="http://www.w3.org/2000/svg">
      <rect width="720" height="260" rx="10" fill="#0c1116" />
      <rect x="0" y="0" width="200" height="260" fill="#11151c" />
      <text x="16" y="26" fill="#9aa1ad" font-family="Inter" font-size="11" font-weight="700" letter-spacing="0.08em">SSH HOSTS</text>
      <g v-for="(h, i) in ['prod.frappe.dev', 'staging.frappe', 'jumpbox-01']" :key="i">
        <circle cx="22" :cy="56 + i * 32" r="5" fill="#4ade80" />
        <text x="36" :y="60 + i * 32" fill="#e7e9ee" font-family="Inter" font-size="12">{{ h }}</text>
      </g>
      <rect x="220" y="20" width="480" height="220" rx="6" fill="#000" />
      <g font-family="JetBrains Mono" font-size="11.5">
        <text x="234" y="44" fill="#4ade80">user@prod</text><text x="304" y="44" fill="#e7e9ee">:~/bench$ bench --version</text>
        <text x="234" y="64" fill="#e7e9ee">5.22.5</text>
        <text x="234" y="84" fill="#4ade80">user@prod</text><text x="304" y="84" fill="#e7e9ee">:~/bench$ bench migrate</text>
        <text x="234" y="104" fill="#9aa1ad">Migrating chitra.local</text>
        <text x="234" y="124" fill="#4ade80">Updating DocTypes for frappe</text>
        <text x="234" y="144" fill="#4ade80">Updating DocTypes for erpnext</text>
        <text x="234" y="164" fill="#fbbf24">Compiling assets…</text>
      </g>
    </svg>

    <!-- git -->
    <svg v-else-if="kind === 'git'" viewBox="0 0 720 260" xmlns="http://www.w3.org/2000/svg">
      <rect width="720" height="260" rx="10" fill="#11151c" />
      <text x="20" y="36" fill="#e7e9ee" font-family="Inter" font-size="14" font-weight="600">apps/erpnext · main · ↑2 ↓0</text>
      <g v-for="(c, i) in [['feat: invoice qr code', '#4ade80', '+128 −12'], ['fix: doctype list filter', '#fbbf24', '+4 −22'], ['refactor: hooks loader', '#7c5cff', '+312 −180']]" :key="i" :transform="`translate(20, ${68 + i * 56})`">
        <circle cx="12" cy="20" r="6" :fill="c[1]" />
        <line x1="12" y1="26" x2="12" y2="56" :stroke="c[1] as string" stroke-width="2" />
        <rect x="30" y="6" width="660" height="38" rx="6" fill="#1c2230" />
        <text x="44" y="22" fill="#e7e9ee" font-family="Inter" font-size="13">{{ c[0] }}</text>
        <text x="44" y="38" fill="#9aa1ad" font-family="JetBrains Mono" font-size="11">a1b2c3d · vengadesh · 2h ago · {{ c[2] }}</text>
      </g>
    </svg>

    <!-- ngrok -->
    <svg v-else-if="kind === 'ngrok'" viewBox="0 0 720 200" xmlns="http://www.w3.org/2000/svg">
      <rect width="720" height="200" rx="10" fill="#11151c" />
      <rect x="20" y="20" width="320" height="160" rx="8" fill="#0c1218" stroke="#1c2230" />
      <text x="40" y="50" fill="#9aa1ad" font-family="Inter" font-size="11" font-weight="700" letter-spacing="0.08em">LOCAL</text>
      <text x="40" y="80" fill="#e7e9ee" font-family="JetBrains Mono" font-size="13">http://chitra.local:8000</text>
      <text x="40" y="110" fill="#9aa1ad" font-family="Inter" font-size="12">Running on your machine</text>
      <line x1="340" y1="100" x2="380" y2="100" stroke="#7c5cff" stroke-width="2" stroke-dasharray="4 4" />
      <text x="346" y="92" fill="#7c5cff" font-family="Inter" font-size="11">ngrok</text>
      <rect x="380" y="20" width="320" height="160" rx="8" fill="#7c5cff22" stroke="#7c5cff" />
      <text x="400" y="50" fill="#7c5cff" font-family="Inter" font-size="11" font-weight="700" letter-spacing="0.08em">PUBLIC</text>
      <text x="400" y="80" fill="#e7e9ee" font-family="JetBrains Mono" font-size="13">https://chitra-7d.ngrok.app</text>
      <text x="400" y="110" fill="#9aa1ad" font-family="Inter" font-size="12">Share with anyone, anywhere</text>
    </svg>

    <!-- prefs -->
    <svg v-else-if="kind === 'prefs'" viewBox="0 0 720 280" xmlns="http://www.w3.org/2000/svg">
      <rect width="720" height="280" rx="10" fill="#11151c" />
      <rect x="0" y="0" width="220" height="280" fill="#0c1116" />
      <text x="16" y="26" fill="#9aa1ad" font-family="Inter" font-size="11" font-weight="700" letter-spacing="0.08em">SETTINGS</text>
      <g v-for="(cat, i) in ['Commonly Used', 'Text Editor', 'Workbench', 'Chat', 'Features', 'Application', 'Dependencies', 'Security']" :key="i">
        <rect x="10" :y="40 + i * 26" width="200" height="22" rx="4" :fill="cat === 'Application' ? '#7c5cff33' : 'transparent'" />
        <text x="22" :y="56 + i * 26" fill="#e7e9ee" font-family="Inter" font-size="12">{{ cat }}</text>
      </g>
      <text x="240" y="44" fill="#e7e9ee" font-family="Inter" font-size="16" font-weight="700">Application</text>
      <g v-for="(s, i) in ['Bench: Directory', 'Bench: Active Site', 'Git: User Name', 'Git: User Email']" :key="i" :transform="`translate(240, ${68 + i * 50})`">
        <text x="0" y="14" fill="#e7e9ee" font-family="Inter" font-size="13" font-weight="600">{{ s }}</text>
        <rect x="0" y="20" width="440" height="26" rx="4" fill="#1c2230" />
        <text x="10" y="38" fill="#9aa1ad" font-family="JetBrains Mono" font-size="11">/home/vengadesh/{{ s.toLowerCase().includes('site') ? 'chitra.local' : s.toLowerCase().includes('email') ? 'me@example.com' : s.toLowerCase().includes('name') ? 'Vengadesh M' : 'chitra-bench' }}</text>
      </g>
    </svg>

    <!-- deps -->
    <svg v-else-if="kind === 'deps'" viewBox="0 0 720 280" xmlns="http://www.w3.org/2000/svg">
      <rect width="720" height="280" rx="10" fill="#11151c" />
      <text x="20" y="36" fill="#e7e9ee" font-family="Inter" font-size="14" font-weight="600">Dependencies · 11/13 installed · 2 required missing</text>
      <g v-for="(d, i) in [['Python 3', true], ['Node.js', true], ['Git', true], ['MariaDB', true], ['Redis', true], ['Supervisor', false], ['wkhtmltopdf', true]]" :key="i" :transform="`translate(20, ${56 + i * 28})`">
        <rect width="680" height="22" rx="4" fill="#0c1218" />
        <circle cx="14" cy="11" r="5" :fill="(d[1] as boolean) ? '#4ade80' : '#fb7185'" />
        <text x="30" y="15" fill="#e7e9ee" font-family="Inter" font-size="12">{{ d[0] }}</text>
        <g v-if="!d[1]"><rect x="560" y="2" width="60" height="18" rx="9" fill="#fb718533" /><text x="572" y="14" fill="#fb7185" font-family="Inter" font-size="10" font-weight="700">required</text></g>
        <text x="630" y="15" fill="#9aa1ad" font-family="JetBrains Mono" font-size="11">{{ (d[1] as boolean) ? '✓' : '✗ install' }}</text>
      </g>
    </svg>

    <!-- updates -->
    <svg v-else-if="kind === 'updates'" viewBox="0 0 720 220" xmlns="http://www.w3.org/2000/svg">
      <rect width="720" height="220" rx="10" fill="#11151c" />
      <rect x="180" y="40" width="360" height="140" rx="10" fill="#0c1218" stroke="#7c5cff" />
      <text x="200" y="70" fill="#7c5cff" font-family="Inter" font-size="11" font-weight="700" letter-spacing="0.08em">UPDATE AVAILABLE</text>
      <text x="200" y="98" fill="#e7e9ee" font-family="Inter" font-size="18" font-weight="700">Frappe Code 0.2.0</text>
      <text x="200" y="120" fill="#9aa1ad" font-family="Inter" font-size="12">Released 2 hours ago · 84 MB</text>
      <rect x="200" y="138" width="160" height="32" rx="6" fill="#7c5cff" />
      <text x="246" y="158" fill="#fff" font-family="Inter" font-size="13" font-weight="600">Download</text>
      <rect x="368" y="138" width="80" height="32" rx="6" fill="#1c2230" />
      <text x="386" y="158" fill="#e7e9ee" font-family="Inter" font-size="13">Later</text>
    </svg>
  </figure>
</template>

<style scoped>
.illu {
  margin: 18px 0 22px;
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--bg-card);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-card);
}
.illu svg {
  display: block;
  width: 100%;
  height: auto;
}
</style>
