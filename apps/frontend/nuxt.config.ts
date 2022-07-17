import { defineNuxtConfig } from 'nuxt';

export default defineNuxtConfig({
  modules: ["@nuxtjs/strapi", "@nuxtjs/tailwindcss"],
  head: {
    link: [
      {
        rel: "stylesheet",
        href: "https://rsms.me/inter/inter.css",
      },
    ],
  },
  strapi: {
    url: "http://localhost:1337",
    version: "v4",
  },
  publicRuntimeConfig: {
    APP_NAME: process.env.APP_NAME,
    STRAPI_URL: process.env.STRAPI_URL,
  },
  //FIX: https://github.com/nuxt-community/tailwindcss-module/issues/480
  devServerHandlers: [],
});
