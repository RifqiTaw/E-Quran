<script lang="ts" setup>
import type { socialLinks } from "~/types/types";

const socialLinks: socialLinks[] = [
  {
    name: "Instagram",
    url: "https://instagram.com/yourprofile",
    icon: "mdi:instagram",
  },
  {
    name: "Facebook",
    url: "https://facebook.com/yourprofile",
    icon: "mdi:facebook",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/yourprofile",
    icon: "mdi:linkedin",
  },
];
</script>

<template>
  <footer class="bg-gray-100 py-6 mt-12">
    <div class="max-w-7xl mx-auto px-4 flex justify-center space-x-8">
      <a
        v-for="social in socialLinks"
        :key="social.name"
        :href="social.url"
        target="_blank"
        rel="noopener noreferrer"
        class="text-gray-600 hover:text-gray-900 transition-colors"
        aria-label="social.name"
      >
        <span class="sr-only">{{ social.name }}</span>
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          v-if="social.name === 'Instagram'"
          viewBox="0 0 24 24"
        >
          <!-- Instagram SVG path -->
          <path
            d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm0 2h10c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3zm8.5 2a1.5 1.5 0 11-.001 3.001A1.5 1.5 0 0115.5 6zM12 8a4 4 0 100 8 4 4 0 000-8zm0 2a2 2 0 110 4 2 2 0 010-4z"
          />
        </svg>

        <svg
          class="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          v-else-if="social.name === 'Facebook'"
          viewBox="0 0 24 24"
        >
          <!-- Facebook SVG path -->
          <path
            d="M22 12c0-5.514-4.486-10-10-10S2 6.486 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54v-2.89h2.54v-2.203c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.462h-1.26c-1.243 0-1.63.771-1.63 1.562v1.874h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z"
          />
        </svg>

        <svg
          class="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          v-else-if="social.name === 'LinkedIn'"
          viewBox="0 0 24 24"
        >
          <!-- LinkedIn SVG path -->
          <path
            d="M4.98 3.5c0 1.381-1.114 2.5-2.49 2.5S0 4.881 0 3.5 1.114 1 2.49 1s2.49 1.119 2.49 2.5zM.2 6h4.6v14H.2V6zM7.8 6h4.414v1.867h.061c.615-1.165 2.116-2.395 4.355-2.395 4.656 0 5.516 3.067 5.516 7.053V20h-4.6v-6.961c0-1.66-.031-3.8-2.316-3.8-2.318 0-2.674 1.814-2.674 3.692V20h-4.6V6z"
          />
        </svg>
      </a>
    </div>
  </footer>
</template>
