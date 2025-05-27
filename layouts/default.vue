<script setup lang="ts">
import Header from "~/components/header/index.vue";
import Footer from "~/components/footer/index.vue";
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <main class="flex-grow">
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>
