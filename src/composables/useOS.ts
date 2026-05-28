import { ref } from 'vue';
import type { OS } from './useRelease';

// Windows is intentionally not supported by the website — Windows users
// fall through to Linux (AppImage is the closest cross-platform binary).
export function detectOS(): OS {
  const ua = navigator.userAgent.toLowerCase();
  const platform = (navigator.platform || '').toLowerCase();
  if (platform.includes('mac') || ua.includes('mac os x')) return 'mac';
  return 'linux';
}

export function useOS() {
  const os = ref<OS>(detectOS());
  return { os };
}

export function osLabel(os: OS): string {
  return os === 'mac' ? 'macOS' : 'Linux';
}
