<script setup lang="ts">
import { useHead } from '@vueuse/head';
import Hero from '../components/Hero.vue';
import Features from '../components/Features.vue';
import Download from '../components/Download.vue';
import { CANONICAL_URL, SITE_DESCRIPTION } from '../config';

useHead({
  title: 'Frappe Code — The desktop IDE built for Frappe & ERPNext developers',
  meta: [
    { name: 'description', content: SITE_DESCRIPTION },
    { property: 'og:title', content: 'Frappe Code — Desktop IDE for Frappe & ERPNext' },
    { property: 'og:description', content: SITE_DESCRIPTION },
    { property: 'og:url', content: `${CANONICAL_URL}/` },
    { name: 'twitter:title', content: 'Frappe Code — Desktop IDE for Frappe & ERPNext' },
    { name: 'twitter:description', content: SITE_DESCRIPTION },
  ],
  link: [{ rel: 'canonical', href: `${CANONICAL_URL}/` }],
});
</script>

<template>
  <Hero />
  <Features />
  <Download />
</template>
