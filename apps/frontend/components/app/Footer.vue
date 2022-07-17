<template>
  <footer class="bg-white">
    <div class="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
      <nav
        class="-mx-5 -my-2 flex flex-wrap justify-center"
        aria-label="Footer"
      >
        <div v-for="item in items" :key="item.id" class="px-5 py-2">
          <NuxtLink
            :to="item.to"
            class="text-base text-gray-500 hover:text-gray-900"
          >
            {{ item.title }}
          </NuxtLink>
        </div>
      </nav>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { FooterItem } from "~~/types/Footer";

defineProps({
  items: {
    type: Array as () => FooterItem[],
  },
});
</script>
