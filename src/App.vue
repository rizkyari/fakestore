<template>
  <div class="min-h-screen flex flex-col">
    <Header v-if="!hideLayout" />
    
    <main class="flex-1 container mx-auto px-4 py-6">
      <router-view/>
    </main>

    <Footer v-if="!hideLayout" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from 'vue-router';
import Header from './components/layouts/Header.vue';
import Footer from './components/layouts/Footer.vue';

const route = useRoute();
const hideLayout = computed(() => route.path === "/login");
</script>

<style scoped>
</style>
