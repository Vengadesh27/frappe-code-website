<script setup lang="ts">
import Nav from './components/Nav.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <div class="app-shell">
    <Nav />
    <main>
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </main>
    <Footer />
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg);
  position: relative;
  overflow-x: hidden;
}
main {
  flex: 1;
}
</style>
