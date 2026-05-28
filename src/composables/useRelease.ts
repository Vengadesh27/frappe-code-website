import { ref, onMounted } from 'vue';
import { GITHUB_OWNER, GITHUB_REPO } from '../config';

export type OS = 'linux' | 'mac' | 'windows';

export interface Asset {
  name: string;
  size: number;
  browser_download_url: string;
  download_count: number;
}

export interface Release {
  tag_name: string;
  name: string;
  html_url: string;
  published_at: string;
  body: string;
  assets: Asset[];
}

const RELEASES_API = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/releases/latest`;
const RELEASES_PAGE = `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/releases`;

// Map an asset filename to the OS it targets. Returns null for things like
// blockmaps, latest-*.yml, or signature files that aren't user-facing.
export function assetOS(name: string): OS | null {
  const n = name.toLowerCase();
  if (n.endsWith('.appimage') || n.endsWith('.deb') || n.endsWith('.rpm') || n.endsWith('.tar.gz')) return 'linux';
  if (n.endsWith('.dmg') || n.includes('-mac.zip') || n.includes('-mac-')) return 'mac';
  if (n.endsWith('.exe') || n.endsWith('.msi')) return 'windows';
  return null;
}

export function bestAssetForOS(release: Release | null, os: OS): Asset | null {
  if (!release) return null;
  const matches = release.assets.filter((a) => assetOS(a.name) === os);
  if (matches.length === 0) return null;
  // Prefer AppImage on Linux (works everywhere), dmg on mac, exe (nsis) on windows
  const prefer = (a: Asset) => {
    const n = a.name.toLowerCase();
    if (os === 'linux' && n.endsWith('.appimage')) return 3;
    if (os === 'mac' && n.endsWith('.dmg')) return 3;
    if (os === 'windows' && n.endsWith('.exe')) return 3;
    return 1;
  };
  return [...matches].sort((a, b) => prefer(b) - prefer(a))[0];
}

export function formatBytes(bytes: number): string {
  if (!bytes) return '';
  const units = ['B', 'KB', 'MB', 'GB'];
  let v = bytes;
  let i = 0;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i++;
  }
  return `${v.toFixed(v >= 100 ? 0 : 1)} ${units[i]}`;
}

export function useRelease() {
  const release = ref<Release | null>(null);
  const loading = ref(true);
  const error = ref<string | null>(null);

  onMounted(async () => {
    try {
      const r = await fetch(RELEASES_API, {
        headers: { Accept: 'application/vnd.github+json' },
      });
      if (r.status === 404) {
        error.value = 'No releases published yet.';
        return;
      }
      if (!r.ok) throw new Error(`GitHub API returned ${r.status}`);
      release.value = (await r.json()) as Release;
    } catch (err: any) {
      error.value = err.message || 'Failed to load release information.';
    } finally {
      loading.value = false;
    }
  });

  return { release, loading, error, releasesPageUrl: RELEASES_PAGE };
}
