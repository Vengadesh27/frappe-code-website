// Single place to change repo coordinates. The Vue site fetches release
// metadata from the public GitHub Releases API for this repo.
export const GITHUB_OWNER = 'Vengadesh27';
export const GITHUB_REPO = 'frappe-code';

// Separate repo used to host distributable release assets (.deb, .AppImage).
export const DOWNLOAD_OWNER = 'Vengadesh27';
export const DOWNLOAD_REPO = 'FrappeCode-Download';
export const DOWNLOAD_RELEASES_URL = `https://github.com/${DOWNLOAD_OWNER}/${DOWNLOAD_REPO}/releases/latest`;
export const APP_NAME = 'Frappe Code';
export const APP_TAGLINE = 'A desktop IDE for Frappe';
export const APP_SUBTITLE =
  'Edit hooks and print formats, run remote commands over SSH, browse the database, and ship features faster — all in one desktop app.';

// SEO / canonical URLs. Change CANONICAL_URL if you switch domains;
// everything in the site (sitemap, og:url, JSON-LD, robots.txt) flows
// from here.
export const CANONICAL_URL = 'https://frappecode.netlify.app';
export const SITE_DESCRIPTION =
  'Frappe Code is the free, open-source desktop IDE built for Frappe and ERPNext developers. ' +
  'Edit hooks and print formats, run bench commands, manage sites, query databases, and connect to remote benches over SSH — all in one VS Code-style window for Linux and macOS.';
export const SITE_KEYWORDS = [
  'Frappe IDE',
  'Frappe Code',
  'ERPNext IDE',
  'Frappe developer tools',
  'Frappe bench manager',
  'ERPNext developer desktop',
  'Frappe hooks editor',
  'Frappe print format editor',
  'ERPNext desktop app',
  'Frappe SSH client',
  'Frappe site manager',
  'Frappe Linux IDE',
  'Frappe macOS IDE',
];
