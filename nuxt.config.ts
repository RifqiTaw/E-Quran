// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  app: {
    head: {
      title: "E-QURAN",
      link: [{ rel: "icon", type: "image/x-icon", href: "/ts-only.png" }],
    },
  },
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },

  runtimeConfig: {
    public: {
      equran: process.env.NUXT_BASE_API_URL_EQURAN || "",
      tafsir: process.env.NUXT_BASE_API_URL_TAFSIR || "",
      openCageAPIKey: process.env.NUXT_BASE_API_KEY || "",
    },
  },
});
