<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <Disclosure as="nav" class="bg-white shadow" v-slot="{ open, close }">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button -->
          <DisclosureButton
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
          >
            <span class="sr-only">Open main menu</span>
            <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div
          class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start"
        >
          <div class="flex-shrink-0 flex items-center">
            <NuxtLink to="/">
              <img
                class="block lg:hidden h-8 w-auto"
                src="/images/logo.png"
                alt=""
              />
              <img
                class="hidden lg:block h-8 w-auto"
                src="/images/brand.png"
                alt=""
              />
            </NuxtLink>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <NuxtLink
              v-for="item in items"
              :key="item.id"
              :to="item.to"
              class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              :class="{
                'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700':
                  item.to != currentRoute,
                'border-teal-500 text-gray-900': item.to === currentRoute,
              }"
            >
              {{ item.title }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="pt-2 pb-4 space-y-1">
        <NuxtLink
          v-for="item in items"
          :key="item.id"
          :to="item.to"
          class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          :class="{
            'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700':
              item.to != currentRoute,
            'bg-teal-50 border-teal-500 text-teal-700':
              item.to === currentRoute,
          }"
          @click="close"
        >
          {{ item.title }}
        </NuxtLink>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup lang="ts">
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/vue/outline";
import { NavbarItem } from "~~/types/Navbar";

const { currentRoute } = defineProps({
  currentRoute: {
    type: String,
    default: "/",
  },
  items: {
    type: Array as () => NavbarItem[],
  },
});
</script>
