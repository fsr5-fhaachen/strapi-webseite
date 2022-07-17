<template>
  <AppNavbar :items="navbarItems" :currentRoute="route.path" />
  <div class="relative pt-6 pb-20 px-4 sm:px-6 lg:pt-16 lg:pb-28 lg:px-8">
    <div class="relative max-w-7xl mx-auto">
      <slot />
    </div>
  </div>
  <AppFooter :items="footerItems" />
</template>

<script setup lang="ts">
import { FooterResponse } from "~~/types/Footer";
import { NavbarResponse } from "~~/types/Navbar";

const config = useRuntimeConfig();
const route = useRoute();
const { find } = useStrapi4();

useMeta({
  htmlAttrs: {
    class: "h-full bg-gray-50",
  },
  bodyAttrs: {
    class: "h-full",
  },
  title: computed(() => {
    return config.APP_NAME + (route.meta.title ? ` - ${route.meta.title}` : "");
  }),
});

const navbar = await useAsyncData("navbar", () =>
  find("navbar", {
    populate: ["items"],
  })
);
const footer = await useAsyncData("footer", () =>
  find("footer", {
    populate: ["items"],
  })
);

const navbarItems = computed(() => {
  if (!navbar.data) {
    return [];
  }
  return (navbar.data.value as NavbarResponse).data.attributes.items;
});

const footerItems = computed(() => {
  if (!footer.data) {
    return [];
  }
  return (footer.data.value as FooterResponse).data.attributes.items;
});
</script>
