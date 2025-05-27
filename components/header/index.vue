<script lang="ts" setup></script>

<template>
  <header class="sticky top-0 bg-white shadow-md z-50">
    <nav class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
      <div class="text-xl font-bold text-gray-800">MyApp</div>
      <ul class="flex space-x-6">
        <li>
          <nuxt-link href="/" class="text-gray-600 hover:text-gray-900">
            Home
          </nuxt-link>
        </li>
        <li>
          <nuxt-link href="/quran" class="text-gray-600 hover:text-gray-900"
            >Al Quran
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            href="/matsurat"
            class="text-gray-600 hover:text-gray-900"
            >Al Ma'tsurat
          </nuxt-link>
        </li>
      </ul>
    </nav>
  </header>
</template>
