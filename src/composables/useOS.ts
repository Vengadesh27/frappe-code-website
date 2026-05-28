import { ref } from 'vue';
import type { OS } from './useRelease';

export function detectOS(): OS {
  const ua = navigator.userAgent.toLowerCase();
  const platform = (navigator.platform || '').toLowerCase();
  if (platform.includes('mac') || ua.includes('mac os x')) return 'mac';
  if (platform.includes('win') || ua.includes('windows')) return 'windows';
  return 'linux';
}

export function useOS() {
  const os = ref<OS>(detectOS());
  return { os };
}

export function osLabel(os: OS): string {
  return os === 'linux' ? 'Linux' : os === 'mac' ? 'macOS' : 'Windows';
}
